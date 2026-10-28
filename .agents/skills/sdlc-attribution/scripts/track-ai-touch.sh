#!/usr/bin/env bash
# Cross-tool post-edit hook: records files an AI tool just edited/wrote so
# .githooks/prepare-commit-msg can tell whether a commit includes AI-touched
# files, and from which tool. One canonical copy (this file); each tool's own
# hooks dir holds a symlink to it (.claude/hooks, .codex/hooks, .cursor/hooks)
# and that tool's own config passes a distinguishing first argument — see
# ai/hooks/README.md for the full per-tool wiring and verification status.
#
# Usage: track-ai-touch.sh <tool-name>
#   <tool-name> names this run's records (ai-touch/<tool-name>.hashes.d/) and
#   must have a matching entry in .githooks/prepare-commit-msg's trailer table.
#   It also selects which payload shape this run parses — Codex's PostToolUse
#   config has no matcher and fires on every tool call, so without this
#   gating a Codex call that merely reads a file could be mistaken for an
#   edit if its payload happens to carry the same field name Claude/Cursor
#   use.
#
# Reads the tool's event payload as JSON on stdin. The edited path is
# reported differently per tool, so this checks all known shapes:
#   - Claude Code (Edit/Write)   : .tool_input.file_path
#   - Claude Code (NotebookEdit) : .tool_input.notebook_path
#   - Cursor (afterFileEdit)     : .file_path
#   - Codex (apply_patch)        : the patch body inside .tool_input, on
#                                  "*** Add File:" / "*** Update File:" /
#                                  "*** Move to:" marker lines
#   - Copilot (create/edit)      : .toolArgs — a JSON-encoded STRING, not a
#                                  nested object (confirmed live, 2026-08-20)
#                                  — .path once re-parsed. Copilot's "view"
#                                  tool is read-only (ignored). Some simple
#                                  edits route through a generic "bash" tool
#                                  instead of create/edit (e.g. `echo >>`) —
#                                  not parsed; a known, documented gap, see
#                                  ai/hooks/README.md.
#
# Usage: track-ai-touch.sh claude --bash-pre | --bash-post
#   A second, git-diff-based detection path for tools whose shell/exec tool
#   has no fixed "file path" field to parse (Claude Code's Bash, and — not
#   yet wired — Codex/Cursor/Copilot's own shell-equivalents). Rather than
#   trying to parse arbitrary shell commands for the files they touch (cp,
#   mv, sed -i, redirects, heredocs — the same problem noted as an
#   intentionally-unparsed gap for Copilot's "bash" tool above), this
#   snapshots `git status --porcelain` immediately before the shell call
#   (--bash-pre, wired to PreToolUse) to find candidate paths, records each
#   candidate's working-tree CONTENT hash (`git hash-object`, not the status
#   line itself), then re-hashes the same candidates immediately after
#   (--bash-post, wired to PostToolUse). Only a path whose content hash
#   actually changed gets recorded. Diffing status lines alone was tried
#   first and found live to false-positive on `git add`/`git commit`/`git mv`
#   run as the Bash command itself: those change a file's status line (e.g.
#   " M" -> committed/clean) without changing a single byte of its content,
#   which wrongly credited a commit that only contained a human's own
#   hand-edit (see ai/hooks/README.md's dated entry for the real incident).
#   Content hashing closes that gap without needing to parse or special-case
#   which git subcommands are "safe" — the same principle as the earlier
#   decision not to parse arbitrary shell syntax. This attributes by causal
#   effect of *that specific tool call*, not by
#   whether a session merely happened to be open — a file a human edits by
#   hand outside of any tool call never triggers either phase, so it's never
#   recorded. See ai/hooks/README.md for the fuller rationale and the known
#   limitations (renames, quoted/special-character paths, and a same-file
#   race if a human edits the exact file the shell call also touches in the
#   same window).
set -eu

# Opt-in trace. It is on when AI_TOUCH_DEBUG is set to anything non-empty, or when the file ai-touch-debug exists in the repository's
# common git folder, which every worktree sees and which a bmad-loop run does not remove. When on, each decision adds one line to the
# one shared log, ai-touch-debug.log, in that same folder. A line holds a UTC time, the hook name, the worktree's folder name in
# brackets and the decision. The log is shared because a loop deletes a story worktree's own git folder when it cleans up. When off,
# a normal run does a few shell tests and starts no process for the trace, and an early exit starts none at all. A trace failure is
# swallowed and never changes what the hook does.
trace_on=0
trace_log=""
trace_for() {
  # $1: this worktree's git folder, the parent of ai-touch.
  local gd="$1" common
  common="$gd"
  if [ -f "$gd/commondir" ] && read -r common < "$gd/commondir" 2>/dev/null; then
    case "$common" in /*) ;; *) common="$gd/$common" ;; esac
  fi
  trace_log="$common/ai-touch-debug.log"
  if [ -n "${AI_TOUCH_DEBUG:-}" ] || [ -f "$common/ai-touch-debug" ]; then trace_on=1; fi
  return 0
}
trace_locate() {
  # For an exit that comes before the hook has asked git where its folder is: walk up to the git folder with shell builtins only.
  # A .git file holds "gitdir: <path>"; one that does not is skipped without a trace.
  local d="$PWD" g line
  while :; do
    if [ -d "$d/.git" ]; then g="$d/.git"; break; fi
    if [ -f "$d/.git" ]; then
      line=""
      read -r line < "$d/.git" 2>/dev/null || true
      case "$line" in "gitdir: "*) g="${line#gitdir: }" ;; *) return 0 ;; esac
      case "$g" in /*) ;; *) g="$d/$g" ;; esac
      break
    fi
    [ -n "$d" ] || return 0
    d="${d%/*}"
  done
  trace_for "$g"
}
trace() {
  [ "$trace_on" = 1 ] || return 0
  local wt="${toplevel:-$PWD}"
  {
    printf '%s %s [%s] %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "track-ai-touch" "${wt##*/}" "$*" >> "$trace_log" &&
    if [ "$(( $(wc -c < "$trace_log") ))" -gt 524288 ]; then
      tail -c 262144 "$trace_log" | sed 1d > "$trace_log.$$" && mv -f "$trace_log.$$" "$trace_log"
    fi
  } >/dev/null 2>&1 || true
}

if ! command -v jq >/dev/null 2>&1; then
  trace_locate
  trace "edit tool=${1:-?} skipped: jq is not on PATH"
  echo "track-ai-touch: 'jq' not found on PATH; AI-attribution tracking disabled for this call (see ai/hooks/README.md)." >&2
  exit 0
fi

tool="${1:?usage: track-ai-touch.sh <tool-name> [--bash-pre|--bash-post]}"
phase="${2:-}"

content_hash() {
  # $1: path relative to $toplevel. Echoes its blob hash, or MISSING if the
  # file doesn't exist. `git hash-object` reflects working-tree CONTENT
  # only — unaffected by `git add`/`git commit`/`git mv` moving that same
  # content between the working tree and the index, which is the whole
  # point: those commands change status lines without changing a byte of
  # content, and content (not status-line presence) is what should decide
  # attribution. A symlink is hashed by its link text, which is what the
  # index holds for it, and not by the content of what it points at.
  if [ -L "$toplevel/$1" ]; then
    readlink "$toplevel/$1" | tr -d '\n' | git -C "$toplevel" hash-object --stdin 2>/dev/null || echo MISSING
  elif [ -f "$toplevel/$1" ]; then
    git -C "$toplevel" hash-object -- "$1" 2>/dev/null || echo MISSING
  else
    echo MISSING
  fi
}

record_edit() {
  # $1: path relative to $toplevel. Records one edit as a file of its own that
  # holds one "hash<TAB>path" line, in the tool's records folder
  # (ai-touch/<tool>.hashes.d/). The hash is of the content the file has right
  # now. .githooks/prepare-commit-msg credits a commit only when it stages
  # content recorded here for a path, so an edit that was later thrown away
  # (git checkout, git stash) and replaced by a person's own edit earns no
  # trailer.
  # The final name is reserved first with mktemp, which creates the file
  # exclusively, so no other record can ever take the name. The record is
  # written under a dotted temporary name and renamed over the reserved name,
  # so a reader sees an empty file (no record) or the whole record. Nothing
  # here needs hard links, which some filesystems refuse. Nothing rewrites a record,
  # and .githooks/post-commit only deletes them, so parallel edit hooks and
  # post-commit cannot overwrite each other and nothing needs a lock. The path
  # and its hash are in the same file, so neither can exist without the other.
  # $marker_dir and $toplevel are set by the caller.
  # A failure is reported on stderr and never stops the tool: the edit then has
  # no record and earns no trailer. A killed hook can leave an empty reserved
  # name, and .githooks/post-commit removes it once it is an hour old.
  local rel="$1" dir tmp final
  dir="$marker_dir/$tool.hashes.d"
  if ! mkdir -p "$dir" || ! final="$(mktemp "$dir/e.XXXXXXXX" 2>/dev/null)"; then
    echo "track-ai-touch: could not record $rel (cannot write in $dir)" >&2
    trace "edit tool=$tool not recorded: cannot write in the records folder"
    return 0
  fi
  if ! tmp="$(mktemp "$dir/.w.XXXXXXXX" 2>/dev/null)"; then
    rm -f "$final"
    echo "track-ai-touch: could not record $rel (cannot write in $dir)" >&2
    trace "edit tool=$tool not recorded: cannot write in the records folder"
    return 0
  fi
  if ! printf '%s\t%s\n' "$(content_hash "$rel")" "$rel" > "$tmp" || ! mv -f "$tmp" "$final"; then
    rm -f "$tmp" "$final"
    echo "track-ai-touch: could not record $rel" >&2
    trace "edit tool=$tool not recorded: the record could not be written"
    return 0
  fi
  trace "edit tool=$tool recorded 1 path"
}

if [ "$tool" = "claude" ] && { [ "$phase" = "--bash-pre" ] || [ "$phase" = "--bash-post" ]; }; then
  payload="$(cat)"
  # Namespace this call's snapshot files by its tool_use_id (falling back to
  # session_id, then to a shared name if neither parses) so concurrent Bash
  # tool calls -- two parallel calls in one turn, or two sessions open on
  # this repo at once -- each get their own pre/post pair instead of
  # clobbering one another's snapshot. Confirmed live (2026-08-23): Claude
  # Code's PreToolUse and PostToolUse payloads for the same Bash call carry
  # an identical tool_use_id.
  call_id="$(printf '%s' "$payload" | jq -r '.tool_use_id // .session_id // empty' 2>/dev/null | tr -cd 'A-Za-z0-9_-')"
  toplevel="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0
  marker_dir="$(git rev-parse --git-path ai-touch)"
  mkdir -p "$marker_dir"
  trace_for "${marker_dir%/*}"
  snapshot="$marker_dir/.bash-snapshot${call_id:+.$call_id}"
  hashes="$snapshot.hashes"

  if [ "$phase" = "--bash-pre" ]; then
    git -C "$toplevel" status --porcelain=v1 --untracked-files=all 2>/dev/null | sort > "$snapshot" || true
    : > "$hashes"
    cut -c4- "$snapshot" | while IFS= read -r rel_path; do
      [ -n "$rel_path" ] || continue
      printf '%s\t%s\n' "$rel_path" "$(content_hash "$rel_path")" >> "$hashes"
    done
    exit 0
  fi

  # --bash-post
  [ -f "$snapshot" ] || exit 0  # no matching --bash-pre snapshot; nothing to diff against
  after="$snapshot.after"
  git -C "$toplevel" status --porcelain=v1 --untracked-files=all 2>/dev/null | sort > "$after" || true
  { cut -c4- "$snapshot"; cut -c4- "$after"; } | sort -u | while IFS= read -r rel_path; do
    [ -n "$rel_path" ] || continue
    pre_hash="$(awk -F'\t' -v p="$rel_path" '$1 == p { print $2; exit }' "$hashes")"
    if [ -z "$pre_hash" ]; then
      # Not dirty at pre-snapshot time, so no hash was recorded for it there.
      # Fall back to its last-committed blob hash (directly comparable to
      # `git hash-object`'s output) so a clean, tracked file that Bash
      # deletes still shows a real hash on one side of the diff, instead of
      # both sides collapsing to the same MISSING sentinel.
      pre_hash="$(git -C "$toplevel" rev-parse "HEAD:$rel_path" 2>/dev/null)" || pre_hash="MISSING"
    fi
    post_hash="$(content_hash "$rel_path")"
    if [ "$pre_hash" != "$post_hash" ]; then
      record_edit "$rel_path"
    fi
  done
  rm -f "$snapshot" "$hashes" "$after"
  exit 0
fi

payload="$(cat)"

toplevel="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0

direct_paths=""
patch_paths=""
newline_paths=0

case "$tool" in
  claude|cursor)
    # Direct single-path shapes: Claude Code and Cursor.
    direct_paths="$(printf '%s' "$payload" | jq -r '
      [ .tool_input.file_path?, .tool_input.notebook_path?, .file_path? ]
      | map(select(type == "string" and . != "" and (contains("\n") | not))) | unique | .[]' 2>/dev/null || true)"
    newline_paths="$(printf '%s' "$payload" | jq -r '
      [ .tool_input.file_path?, .tool_input.notebook_path?, .file_path? ]
      | map(select(type == "string" and contains("\n"))) | length' 2>/dev/null || echo 0)"
    ;;
  codex)
    # Codex apply_patch: paths live inside the patch body carried by
    # .tool_input (either the raw string, or under a .command/.input/.patch key).
    tool_input_str="$(printf '%s' "$payload" | jq -r '
      .tool_input
      | if type == "string" then .
        elif type == "object" then (.command? // .input? // .patch? // "")
        else "" end' 2>/dev/null || true)"
    patch_paths="$(printf '%s' "$tool_input_str" \
      | grep -E '^\*\*\* (Add File|Update File|Move to): ' 2>/dev/null \
      | sed -E 's/^\*\*\* (Add File|Update File|Move to): //' || true)"
    ;;
  copilot)
    # Copilot CLI: .toolName selects the shape. "create"/"edit" carry a
    # JSON-encoded-STRING .toolArgs (not a nested object) with a .path field.
    # "view" is read-only. Anything else (notably "bash") is not parsed.
    copilot_tool_name="$(printf '%s' "$payload" | jq -r '.toolName? // empty' 2>/dev/null || true)"
    case "$copilot_tool_name" in
      create|edit)
        direct_paths="$(printf '%s' "$payload" | jq -r '
          (.toolArgs | fromjson? // {}) | .path? // empty | select(contains("\n") | not)' 2>/dev/null || true)"
        newline_paths="$(printf '%s' "$payload" | jq -r '
          (.toolArgs | fromjson? // {}) | [.path? // empty | select(contains("\n"))] | length' 2>/dev/null || echo 0)"
        ;;
    esac
    ;;
esac

# A record is one line, and the paths below are read one line at a time, so a path with a newline would be split into two paths that
# were never edited. It is dropped above and reported here, and its edit earns no trailer.
if [ "${newline_paths:-0}" -gt 0 ] 2>/dev/null; then
  echo "track-ai-touch: could not record an edit, because its path contains a newline (see ai/hooks/README.md)." >&2
fi

marker_dir="$(git rev-parse --git-path ai-touch)"
mkdir -p "$marker_dir"
trace_for "${marker_dir%/*}"

record_one() {
  f="$1"
  [ -n "$f" ] || return 0
  case "$f" in
    /*) : ;;
    *) f="$toplevel/$f" ;;
  esac
  # Canonicalize symlinks in the directory portion the same way
  # `git rev-parse --show-toplevel` does, so a repo living under a symlinked
  # path (e.g. macOS's /var -> /private/var, /tmp -> /private/tmp) doesn't
  # make every reported path look like it's "outside the repo".
  if resolved_dir="$(cd -P "$(dirname "$f")" 2>/dev/null && pwd)"; then
    f="$resolved_dir/$(basename "$f")"
  fi
  case "$f" in
    "$toplevel"/*) rel_path="${f#"$toplevel"/}" ;;
    *) trace "edit tool=$tool skipped: a path is outside the repository"; return 0 ;;  # outside the repo
  esac
  record_edit "$rel_path"
}

if [ -z "$direct_paths$patch_paths" ]; then
  trace "edit tool=$tool skipped: the payload holds no path"
fi
printf '%s\n%s\n' "$direct_paths" "$patch_paths" | while IFS= read -r p; do
  record_one "$p"
done

exit 0
