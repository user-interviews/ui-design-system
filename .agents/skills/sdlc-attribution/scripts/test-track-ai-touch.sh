#!/usr/bin/env bash
# Deterministic, offline test suite for ai/hooks/track-ai-touch.sh and the
# .githooks/ attribution chain (prepare-commit-msg, post-commit). No tool
# installs, no auth, no network — only bash/git/jq. Every test runs in a
# disposable `mktemp -d` sandbox repo and cleans up after itself, so this is
# safe to run in CI on every PR that touches ai/hooks/ or .githooks/.
#
# For live-tool verification against real Claude Code/Codex/Copilot
# sessions, see ai/hooks/test-live.sh instead — that one is NOT for CI.
#
# Usage: ai/hooks/test-track-ai-touch.sh
# Exit code: 0 if every test passed, 1 otherwise.
set -u

# The tests make throwaway repositories and commit in them, so nothing of the developer's own git setup may reach them: a global
# commit.gpgsign or core.hooksPath would fail tests on a healthy install, and so would the GIT_DIR, GIT_INDEX_FILE and similar
# variables that git sets while it runs a hook. The config override needs git 2.32 or newer; an older git ignores it and reads the
# global file as before.
export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1
unset GIT_DIR GIT_WORK_TREE GIT_INDEX_FILE GIT_OBJECT_DIRECTORY GIT_COMMON_DIR GIT_NAMESPACE GIT_CEILING_DIRECTORIES GIT_CONFIG_PARAMETERS GIT_CONFIG_COUNT

# One file runs in two homes. In the sdlc-flows repository it sits in ai/hooks/
# beside track-ai-touch.sh, with the git hooks in .githooks/. Installed as the
# sdlc-attribution skill it sits in scripts/ beside track-ai-touch.sh, with the
# git hooks in scripts/git-hooks/.
SELF_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$SELF_DIR/git-hooks/prepare-commit-msg" ]; then
  REPO_ROOT="$SELF_DIR"
  TRACK="$SELF_DIR/track-ai-touch.sh"
  GIT_HOOKS_DIR="$SELF_DIR/git-hooks"
else
  REPO_ROOT="$(cd "$SELF_DIR/../.." && pwd)"
  TRACK="$REPO_ROOT/ai/hooks/track-ai-touch.sh"
  GIT_HOOKS_DIR="$REPO_ROOT/.githooks"
fi

pass_count=0
fail_count=0

pass() { echo "PASS: $1"; pass_count=$((pass_count + 1)); }
fail() { echo "FAIL: $1"; fail_count=$((fail_count + 1)); }

new_sandbox() {
  local dir
  dir="$(mktemp -d)"
  git -C "$dir" init -q
  git -C "$dir" config user.email test@example.com
  git -C "$dir" config user.name "Test"
  printf '%s' "$dir"
}

# The paths the edit hook has recorded for a tool, one per line, in a file the caller can cat, grep or test with -s.
paths_file() {
  # Ask git where the records live. In a linked worktree ".git" is a pointer file, not a folder, so the path cannot be built by hand.
  local dir view
  dir="$(git -C "$1" rev-parse --git-path "ai-touch/$2.hashes.d")"
  view="$(git -C "$1" rev-parse --git-path "paths-view.$2")"
  case "$dir" in /*) ;; *) dir="$1/$dir" ;; esac
  case "$view" in /*) ;; *) view="$1/$view" ;; esac
  cat "$dir"/e.* 2>/dev/null | cut -f2- > "$view"
  printf '%s' "$view"
}

# Writes one record by hand, as the edit hook would: "hash<TAB>path" in a file of its own.
write_record() {
  mkdir -p "$1/.git/ai-touch/$2.hashes.d"
  printf '%s\t%s\n' "$4" "$3" > "$1/.git/ai-touch/$2.hashes.d/e.$5"
}

# --- track-ai-touch.sh: payload-shape tests -------------------------------

test_claude_edit() {
  local sandbox marker
  sandbox="$(new_sandbox)"
  printf '{"tool_name":"Edit","tool_input":{"file_path":"%s/foo.txt"}}' "$sandbox" \
    | (cd "$sandbox" && "$TRACK" claude)
  marker="$(paths_file "$sandbox" claude)"
  if [ "$(cat "$marker" 2>/dev/null)" = "foo.txt" ]; then
    pass "Claude Edit payload records the edited path"
  else
    fail "Claude Edit payload did not record 'foo.txt' (got: $(cat "$marker" 2>/dev/null || echo '<missing>'))"
  fi
  rm -rf "$sandbox"
}

test_cursor_after_file_edit() {
  local sandbox marker
  sandbox="$(new_sandbox)"
  printf '{"file_path":"bar.txt"}' \
    | (cd "$sandbox" && "$TRACK" cursor)
  marker="$(paths_file "$sandbox" cursor)"
  if [ "$(cat "$marker" 2>/dev/null)" = "bar.txt" ]; then
    pass "Cursor afterFileEdit payload records the edited path"
  else
    fail "Cursor afterFileEdit payload did not record 'bar.txt' (got: $(cat "$marker" 2>/dev/null || echo '<missing>'))"
  fi
  rm -rf "$sandbox"
}

test_codex_apply_patch() {
  local sandbox marker payload
  sandbox="$(new_sandbox)"
  payload=$(jq -n --arg patch $'*** Begin Patch\n*** Add File: baz.txt\n+hello\n*** End Patch' \
    '{tool_name: "apply_patch", tool_input: {input: $patch}}')
  printf '%s' "$payload" | (cd "$sandbox" && "$TRACK" codex)
  marker="$(paths_file "$sandbox" codex)"
  if [ "$(cat "$marker" 2>/dev/null)" = "baz.txt" ]; then
    pass "Codex apply_patch payload records the patched path"
  else
    fail "Codex apply_patch payload did not record 'baz.txt' (got: $(cat "$marker" 2>/dev/null || echo '<missing>'))"
  fi
  rm -rf "$sandbox"
}

test_codex_false_attribution() {
  local sandbox payload
  sandbox="$(new_sandbox)"
  payload='{"tool_name":"read_file","tool_input":{"file_path":"readonly.txt"}}'
  printf '%s' "$payload" | (cd "$sandbox" && "$TRACK" codex)
  if [ ! -s "$(paths_file "$sandbox" codex)" ]; then
    pass "Codex non-apply_patch payload records nothing (no false attribution)"
  else
    fail "Codex non-apply_patch payload wrongly recorded a path"
  fi
  rm -rf "$sandbox"
}

test_irrelevant_claude_payload() {
  local sandbox
  sandbox="$(new_sandbox)"
  printf '{"tool_name":"Bash","tool_input":{"command":"ls"}}' \
    | (cd "$sandbox" && "$TRACK" claude)
  if [ ! -s "$(paths_file "$sandbox" claude)" ]; then
    pass "Claude Bash-tool payload records nothing"
  else
    fail "Claude Bash-tool payload wrongly recorded a path"
  fi
  rm -rf "$sandbox"
}

test_claude_bash_pre_post_detects_writes() {
  local sandbox marker
  sandbox="$(new_sandbox)"
  echo "original" > "$sandbox/tracked.txt"
  git -C "$sandbox" add tracked.txt
  git -C "$sandbox" -c user.email=test@example.com -c user.name=Test commit -q -m init

  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-pre)
  # Simulate a Bash tool call: modifies a tracked file, creates an untracked one.
  echo "changed" >> "$sandbox/tracked.txt"
  echo "new" > "$sandbox/untracked.txt"
  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-post)

  marker="$(paths_file "$sandbox" claude)"
  if grep -qxF "tracked.txt" "$marker" 2>/dev/null && grep -qxF "untracked.txt" "$marker" 2>/dev/null; then
    pass "Bash-pre/post detects both a modified tracked file and a new untracked file"
  else
    fail "Bash-pre/post did not record both paths (got: $(cat "$marker" 2>/dev/null || echo '<missing>'))"
  fi
  rm -rf "$sandbox"
}

test_claude_bash_pre_post_ignores_preexisting_dirt() {
  local sandbox
  sandbox="$(new_sandbox)"
  echo "original" > "$sandbox/tracked.txt"
  git -C "$sandbox" add tracked.txt
  git -C "$sandbox" -c user.email=test@example.com -c user.name=Test commit -q -m init

  # Dirty the file BEFORE the simulated tool call even starts.
  echo "human edit, pre-existing" >> "$sandbox/tracked.txt"

  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-pre)
  # The tool call itself changes nothing.
  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-post)

  if [ ! -s "$(paths_file "$sandbox" claude)" ]; then
    pass "Bash-pre/post does not attribute dirt that predates the tool call"
  else
    fail "Bash-pre/post wrongly attributed a pre-existing human change"
  fi
  rm -rf "$sandbox"
}

test_bash_pre_post_ignores_git_add_of_human_edit() {
  # Regression test for a real live incident: a Bash call whose command is
  # `git add <file> && git commit` changes that file's status line (staged,
  # then clean) without changing its content. A status-line-only diff wrongly
  # attributed a commit that contained only a human's own hand-edit.
  local sandbox
  sandbox="$(new_sandbox)"
  echo "original" > "$sandbox/human.txt"
  git -C "$sandbox" add human.txt
  git -C "$sandbox" -c user.email=test@example.com -c user.name=Test commit -q -m init

  # A human hand-edits the file BEFORE any simulated tool call.
  echo "human's own edit" >> "$sandbox/human.txt"

  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-pre)
  # The simulated Bash call only stages and commits — it writes no content.
  git -C "$sandbox" add human.txt
  git -C "$sandbox" commit -q -m "commit the human edit via a Bash tool call"
  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-post)

  if [ ! -s "$(paths_file "$sandbox" claude)" ]; then
    pass "Bash-pre/post does not attribute a git add/commit that carries only a human's own edit"
  else
    fail "Bash-pre/post wrongly attributed content it never wrote, just because git add/commit changed the status line"
  fi
  rm -rf "$sandbox"
}

test_bash_caused_commit_gets_trailer() {
  local sandbox body
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"

  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-pre)
  echo "via cp, not Edit/Write" > "$sandbox/copied.txt"
  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-post)

  git -C "$sandbox" add copied.txt
  git -C "$sandbox" commit -q -m "file created via a Bash tool call"
  body="$(git -C "$sandbox" log -1 --format=%B)"

  if echo "$body" | grep -qi "Co-Authored-By: Claude"; then
    pass "A commit whose only change came from a Bash tool call still gets the Claude trailer"
  else
    fail "Bash-caused commit is missing the Claude trailer (body: $body)"
  fi
  rm -rf "$sandbox"
}

test_bash_pre_post_detects_deletion_of_clean_file() {
  # Regression test for a real finding (Cursor Bugbot, PR #6): a clean,
  # tracked file deleted via Bash never had a pre-hash recorded, so both
  # sides of the diff collapsed to the same MISSING sentinel and the
  # deletion went unattributed.
  local sandbox
  sandbox="$(new_sandbox)"
  echo "original" > "$sandbox/doomed.txt"
  git -C "$sandbox" add doomed.txt
  git -C "$sandbox" -c user.email=test@example.com -c user.name=Test commit -q -m init

  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-pre)
  # The simulated Bash call deletes a file that was clean before it ran.
  rm "$sandbox/doomed.txt"
  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-post)

  if grep -qxF "doomed.txt" "$(paths_file "$sandbox" claude)" 2>/dev/null; then
    pass "Bash-pre/post detects deletion of a previously-clean tracked file"
  else
    fail "Bash-pre/post missed a Bash-driven deletion of a clean tracked file (got: $(cat "$(paths_file "$sandbox" claude)" 2>/dev/null || echo '<missing>'))"
  fi
  rm -rf "$sandbox"
}

test_bash_pre_post_concurrent_calls_dont_collide() {
  # Regression test for a real finding (Cursor Bugbot, PR #6): --bash-pre/
  # --bash-post shared one fixed snapshot filename with no per-call id, so
  # two Bash tool calls in flight at once could clobber each other's
  # snapshot. Simulated by interleaving two calls' pre/post phases using
  # each call's own tool_use_id, instead of nesting one inside the other.
  local sandbox marker
  sandbox="$(new_sandbox)"
  echo "original" > "$sandbox/shared.txt"
  git -C "$sandbox" add shared.txt
  git -C "$sandbox" -c user.email=test@example.com -c user.name=Test commit -q -m init

  printf '{"tool_use_id":"call-A"}' | (cd "$sandbox" && "$TRACK" claude --bash-pre)
  printf '{"tool_use_id":"call-B"}' | (cd "$sandbox" && "$TRACK" claude --bash-pre)
  # Call B finishes first, writing its own file.
  echo "from call B" > "$sandbox/b.txt"
  printf '{"tool_use_id":"call-B"}' | (cd "$sandbox" && "$TRACK" claude --bash-post)
  # Call A finishes second, writing a different file.
  echo "from call A" > "$sandbox/a.txt"
  printf '{"tool_use_id":"call-A"}' | (cd "$sandbox" && "$TRACK" claude --bash-post)

  marker="$(paths_file "$sandbox" claude)"
  if grep -qxF "a.txt" "$marker" 2>/dev/null && grep -qxF "b.txt" "$marker" 2>/dev/null; then
    pass "Concurrent Bash calls with distinct tool_use_ids don't clobber each other's snapshot"
  else
    fail "Interleaved concurrent Bash calls lost attribution (got: $(cat "$marker" 2>/dev/null || echo '<missing>'))"
  fi
  rm -rf "$sandbox"
}

test_copilot_create() {
  local sandbox marker payload
  sandbox="$(new_sandbox)"
  payload=$(jq -n --arg args '{"path":"new.txt","file_text":"hi"}' \
    '{toolName: "create", toolArgs: $args}')
  printf '%s' "$payload" | (cd "$sandbox" && "$TRACK" copilot)
  marker="$(paths_file "$sandbox" copilot)"
  if [ "$(cat "$marker" 2>/dev/null)" = "new.txt" ]; then
    pass "Copilot create payload records the new path"
  else
    fail "Copilot create payload did not record 'new.txt' (got: $(cat "$marker" 2>/dev/null || echo '<missing>'))"
  fi
  rm -rf "$sandbox"
}

test_copilot_edit() {
  local sandbox marker payload
  sandbox="$(new_sandbox)"
  payload=$(jq -n --arg args '{"path":"existing.txt","old_str":"a","new_str":"b"}' \
    '{toolName: "edit", toolArgs: $args}')
  printf '%s' "$payload" | (cd "$sandbox" && "$TRACK" copilot)
  marker="$(paths_file "$sandbox" copilot)"
  if [ "$(cat "$marker" 2>/dev/null)" = "existing.txt" ]; then
    pass "Copilot edit payload records the edited path"
  else
    fail "Copilot edit payload did not record 'existing.txt' (got: $(cat "$marker" 2>/dev/null || echo '<missing>'))"
  fi
  rm -rf "$sandbox"
}

test_copilot_view_readonly() {
  local sandbox payload
  sandbox="$(new_sandbox)"
  payload=$(jq -n --arg args '{"path":"readme.txt"}' '{toolName: "view", toolArgs: $args}')
  printf '%s' "$payload" | (cd "$sandbox" && "$TRACK" copilot)
  if [ ! -s "$(paths_file "$sandbox" copilot)" ]; then
    pass "Copilot view (read-only) payload records nothing"
  else
    fail "Copilot view payload wrongly recorded a path"
  fi
  rm -rf "$sandbox"
}

test_copilot_bash_known_gap() {
  local sandbox payload
  sandbox="$(new_sandbox)"
  payload=$(jq -n --arg args '{"command":"echo hi >> some.txt","description":"append"}' \
    '{toolName: "bash", toolArgs: $args}')
  printf '%s' "$payload" | (cd "$sandbox" && "$TRACK" copilot)
  if [ ! -s "$(paths_file "$sandbox" copilot)" ]; then
    pass "Copilot bash-tool payload records nothing (documented gap, not a false positive)"
  else
    fail "Copilot bash-tool payload unexpectedly recorded something"
  fi
  rm -rf "$sandbox"
}

# --- .githooks/: trailer + record-clearing tests ---------------------------

test_single_tool_trailer_and_clear() {
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"

  echo "hello" > "$sandbox/foo.txt"
  git -C "$sandbox" add foo.txt
  printf '{"tool_name":"Edit","tool_input":{"file_path":"%s/foo.txt"}}' "$sandbox" \
    | (cd "$sandbox" && "$TRACK" claude)
  git -C "$sandbox" commit -q -m "add foo"

  local body
  body="$(git -C "$sandbox" log -1 --format=%B)"
  if echo "$body" | grep -qi "Co-Authored-By: Claude"; then
    pass "Single-tool commit gets the Claude trailer"
  else
    fail "Single-tool commit is missing the Claude trailer"
  fi
  if [ ! -s "$(paths_file "$sandbox" claude)" ]; then
    pass "The record is removed after the commit"
  else
    fail "The record was not removed after the commit"
  fi
  rm -rf "$sandbox"
}

test_no_ai_touch_no_trailer() {
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"

  echo "hello" > "$sandbox/manual.txt"
  git -C "$sandbox" add manual.txt
  git -C "$sandbox" commit -q -m "manual edit, no AI involved"

  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By"; then
    fail "Commit with no AI-touched files wrongly got a trailer"
  else
    pass "Commit with no AI-touched files gets no trailer"
  fi
  rm -rf "$sandbox"
}

test_two_tool_commit_two_trailers() {
  local sandbox body
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"

  echo "a" > "$sandbox/a.txt"
  echo "b" > "$sandbox/b.txt"
  git -C "$sandbox" add a.txt b.txt

  printf '{"tool_name":"Edit","tool_input":{"file_path":"%s/a.txt"}}' "$sandbox" \
    | (cd "$sandbox" && "$TRACK" claude)
  printf '{"file_path":"b.txt"}' \
    | (cd "$sandbox" && "$TRACK" cursor)

  git -C "$sandbox" commit -q -m "two-tool commit"
  body="$(git -C "$sandbox" log -1 --format=%B)"

  if echo "$body" | grep -qi "Co-Authored-By: Claude" && echo "$body" | grep -qi "Co-Authored-By: Cursor"; then
    pass "Two-tool commit gets both trailers"
  else
    fail "Two-tool commit is missing at least one trailer (body: $body)"
  fi
  rm -rf "$sandbox"
}

test_root_commit_trim() {
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"

  echo "root" > "$sandbox/root.txt"
  git -C "$sandbox" add root.txt
  printf '{"tool_name":"Edit","tool_input":{"file_path":"%s/root.txt"}}' "$sandbox" \
    | (cd "$sandbox" && "$TRACK" claude)
  if [ "$(cat "$(paths_file "$sandbox" claude)")" != "root.txt" ]; then
    fail "No record existed before the root commit, so the check below would prove nothing"
    rm -rf "$sandbox"
    return
  fi
  git -C "$sandbox" commit -q -m "root commit, first ever"

  if [ ! -s "$(paths_file "$sandbox" claude)" ] && git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Claude"; then
    pass "A root commit (no parent) is credited and has its record removed"
  else
    fail "A root commit was not credited, or did not have its record removed"
  fi
  rm -rf "$sandbox"
}

test_jq_missing_degrades_gracefully() {
  # Build a scratch PATH with everything track-ai-touch.sh calls except jq,
  # rather than assuming a fixed system PATH has no jq in it (it may well —
  # e.g. macOS 26 ships /usr/bin/jq).
  local sandbox out no_jq_bin real_bash cmd
  sandbox="$(new_sandbox)"
  no_jq_bin="$(mktemp -d)"
  for cmd in git mkdir touch grep sed basename dirname; do
    ln -s "$(command -v "$cmd")" "$no_jq_bin/$cmd"
  done
  real_bash="$(command -v bash)"
  out="$(printf '{"tool_name":"Edit","tool_input":{"file_path":"%s/foo.txt"}}' "$sandbox" \
    | (cd "$sandbox" && PATH="$no_jq_bin" "$real_bash" "$TRACK" claude) 2>&1)"
  if echo "$out" | grep -q "jq' not found"; then
    pass "Missing jq prints a visible warning instead of failing silently"
  else
    fail "Missing jq did not print the expected warning (got: $out)"
  fi
  rm -rf "$sandbox" "$no_jq_bin"
}

test_reverted_ai_edit_does_not_credit_a_later_human_edit() {
  # A tool edits a file and the edit is thrown away (git checkout). The record still names the file. A person then edits the same
  # file by hand and commits it, and the commit must not carry the tool's trailer.
  local sandbox body
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "original" > "$sandbox/foo.txt"
  git -C "$sandbox" add foo.txt
  git -C "$sandbox" commit -q -m init

  echo "written by the tool" > "$sandbox/foo.txt"
  printf '{"tool_name":"Edit","tool_input":{"file_path":"%s/foo.txt"}}' "$sandbox" \
    | (cd "$sandbox" && "$TRACK" claude)
  git -C "$sandbox" checkout -q -- foo.txt
  echo "written by a person" > "$sandbox/foo.txt"
  git -C "$sandbox" add foo.txt
  git -C "$sandbox" commit -q -m "human edit of a file the tool once touched"
  body="$(git -C "$sandbox" log -1 --format=%B)"

  if echo "$body" | grep -qi "Co-Authored-By"; then
    fail "A reverted tool edit credited the tool for a person's later edit (body: $body)"
  else
    pass "A reverted tool edit does not credit the tool for a person's later edit"
  fi
  rm -rf "$sandbox"
}

test_second_tool_edit_replaces_the_recorded_content() {
  # The tool edits a file twice before the commit. The second edit's content is what gets committed, so the commit is credited.
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"

  echo "first" > "$sandbox/foo.txt"
  printf '{"tool_name":"Edit","tool_input":{"file_path":"%s/foo.txt"}}' "$sandbox" \
    | (cd "$sandbox" && "$TRACK" claude)
  echo "second" > "$sandbox/foo.txt"
  printf '{"tool_name":"Edit","tool_input":{"file_path":"%s/foo.txt"}}' "$sandbox" \
    | (cd "$sandbox" && "$TRACK" claude)
  git -C "$sandbox" add foo.txt
  git -C "$sandbox" commit -q -m "two edits"

  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Claude"; then
    pass "A file the tool edited twice is credited with its latest content"
  else
    fail "A file the tool edited twice got no trailer"
  fi
  rm -rf "$sandbox"
}

test_deletion_by_a_tool_is_credited() {
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "doomed" > "$sandbox/doomed.txt"
  git -C "$sandbox" add doomed.txt
  git -C "$sandbox" commit -q -m init

  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-pre)
  rm "$sandbox/doomed.txt"
  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-post)
  git -C "$sandbox" add -A
  git -C "$sandbox" commit -q -m "delete via Bash"

  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Claude"; then
    pass "A deletion made by a Bash tool call gets the Claude trailer"
  else
    fail "A deletion made by a Bash tool call got no trailer"
  fi
  rm -rf "$sandbox"
}

test_non_ascii_path_gets_trailer_and_is_cleared() {
  # git quotes a path with non-ASCII bytes in its default name lists, so it never matched the raw path in the record.
  local sandbox body name
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  name="überschrift été.txt"
  echo "hallo" > "$sandbox/$name"
  git -C "$sandbox" add -- "$name"
  printf '{"file_path":"%s"}' "$name" | (cd "$sandbox" && "$TRACK" cursor)
  git -C "$sandbox" commit -q -m "translated file name"
  body="$(git -C "$sandbox" log -1 --format=%B)"

  if echo "$body" | grep -qi "Co-Authored-By: Cursor"; then
    pass "A non-ASCII path gets the trailer"
  else
    fail "A non-ASCII path got no trailer (body: $body)"
  fi
  if [ ! -s "$(paths_file "$sandbox" cursor)" ]; then
    pass "A non-ASCII path has its record removed after the commit"
  else
    fail "A non-ASCII path kept its record after the commit"
  fi
  rm -rf "$sandbox"
}

test_human_co_author_named_like_the_tool_does_not_block_the_trailer() {
  local sandbox body
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "hello" > "$sandbox/foo.txt"
  git -C "$sandbox" add foo.txt
  printf '{"tool_name":"Edit","tool_input":{"file_path":"%s/foo.txt"}}' "$sandbox" \
    | (cd "$sandbox" && "$TRACK" claude)
  git -C "$sandbox" commit -q -m "pairing" -m "Co-Authored-By: Claude Smith <claude.smith@example.com>"
  body="$(git -C "$sandbox" log -1 --format=%B)"

  if echo "$body" | grep -q "^Co-Authored-By: Claude <noreply@anthropic.com>$"; then
    pass "A human co-author whose name contains the tool name does not block the trailer"
  else
    fail "A human co-author named Claude Smith blocked the real trailer (body: $body)"
  fi
  rm -rf "$sandbox"
}

test_existing_tool_trailer_is_not_duplicated() {
  local sandbox count
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "hello" > "$sandbox/foo.txt"
  git -C "$sandbox" add foo.txt
  printf '{"tool_name":"Edit","tool_input":{"file_path":"%s/foo.txt"}}' "$sandbox" \
    | (cd "$sandbox" && "$TRACK" claude)
  git -C "$sandbox" commit -q -m "already credited" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
  count="$(git -C "$sandbox" log -1 --format=%B | grep -ci "^Co-Authored-By:.*<noreply@anthropic.com>")"

  if [ "$count" = "1" ]; then
    pass "A trailer the commit already carries for the tool is not added a second time"
  else
    fail "The tool's trailer appears $count times"
  fi
  rm -rf "$sandbox"
}

test_commit_with_thousands_of_staged_files_still_succeeds_and_gets_the_trailer() {
  # prepare-commit-msg stops reading as soon as it finds a credited file. With enough staged files the writers feeding it get
  # SIGPIPE, which under pipefail must not abort the commit.
  local sandbox body i
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "tool" > "$sandbox/a-first.txt"
  for i in $(seq 1 3000); do
    echo "$i" > "$sandbox/a-long-file-name-so-the-staged-list-fills-the-pipe-buffer-$i.txt"
  done
  git -C "$sandbox" add -A
  printf '{"file_path":"a-first.txt"}' | (cd "$sandbox" && "$TRACK" cursor)

  if git -C "$sandbox" commit -q -m "big commit" 2>/dev/null; then
    body="$(git -C "$sandbox" log -1 --format=%B)"
    if echo "$body" | grep -qi "Co-Authored-By: Cursor"; then
      pass "A commit with thousands of staged files still succeeds and gets the trailer"
    else
      fail "A commit with thousands of staged files succeeded without the trailer"
    fi
  else
    fail "A commit with thousands of staged files was aborted by the hook"
  fi
  rm -rf "$sandbox"
}

test_second_tool_on_the_same_file_takes_the_credit_alone() {
  # Pins a documented limit: each tool's hash is of the file as that tool left it, so only the tool that edited last matches.
  local sandbox body
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "from claude" > "$sandbox/foo.txt"
  printf '{"tool_name":"Edit","tool_input":{"file_path":"%s/foo.txt"}}' "$sandbox" | (cd "$sandbox" && "$TRACK" claude)
  echo "then cursor" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  git -C "$sandbox" add foo.txt
  git -C "$sandbox" commit -q -m "two tools, one file"
  body="$(git -C "$sandbox" log -1 --format=%B)"

  if echo "$body" | grep -qi "Co-Authored-By: Cursor" && ! echo "$body" | grep -qi "Co-Authored-By: Claude"; then
    pass "When two tools edit one file, only the tool that edited last is credited"
  else
    fail "Two tools on one file gave an unexpected result (body: $body)"
  fi
  rm -rf "$sandbox"
}

test_symlink_made_by_a_bash_call_is_credited() {
  # The index holds a symlink's target text, not the target's content, so the recorded hash must be of the link text.
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "target" > "$sandbox/target.txt"
  git -C "$sandbox" add target.txt
  git -C "$sandbox" commit -q -m init

  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-pre)
  ln -s target.txt "$sandbox/link.txt"
  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-post)
  git -C "$sandbox" add link.txt
  git -C "$sandbox" commit -q -m "symlink via Bash"

  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Claude"; then
    pass "A symlink made by a Bash tool call gets the Claude trailer"
  else
    fail "A symlink made by a Bash tool call got no trailer"
  fi
  rm -rf "$sandbox"
}

test_clean_filters_do_not_hide_a_tool_edit_from_the_hash_check() {
  # `git hash-object <path>` applies the same clean filters as `git add` (core.autocrlf, eol attributes), so the recorded hash
  # equals the staged blob even when git rewrites line endings on the way in.
  local sandbox mode
  for mode in autocrlf eol-attribute; do
    sandbox="$(new_sandbox)"
    git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
    if [ "$mode" = autocrlf ]; then
      git -C "$sandbox" config core.autocrlf true
    else
      printf '*.txt text eol=lf\n' > "$sandbox/.gitattributes"
      git -C "$sandbox" add .gitattributes
      git -C "$sandbox" commit -q -m attrs
    fi
    printf 'line one\r\nline two\r\n' > "$sandbox/crlf.txt"
    printf '{"file_path":"crlf.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
    git -C "$sandbox" add crlf.txt
    git -C "$sandbox" commit -q -m "crlf file"

    if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Cursor"; then
      pass "A CRLF file still gets the trailer with $mode"
    else
      fail "A CRLF file lost the trailer with $mode, so the recorded hash and the staged blob differ"
    fi
    rm -rf "$sandbox"
  done
}

test_parallel_edit_hooks_each_keep_their_hash() {
  # Eight edit hooks of one tool running at once each make a file of their own, so none can overwrite another.
  local sandbox i entries
  sandbox="$(new_sandbox)"
  for i in 1 2 3 4 5 6 7 8; do
    echo "$i" > "$sandbox/f$i.txt"
    printf '{"file_path":"f%s.txt"}' "$i" | (cd "$sandbox" && "$TRACK" cursor) &
  done
  wait
  entries="$(ls "$sandbox/.git/ai-touch/cursor.hashes.d" | wc -l | tr -d ' ')"
  if [ "$entries" = "8" ]; then
    pass "Eight parallel edit hooks each leave their hash"
  else
    fail "Parallel edit hooks left $entries of 8 hash files"
  fi
  rm -rf "$sandbox"
}

test_a_file_edited_twice_is_credited_with_either_content() {
  # Every hash recorded for a path counts. A file the tool wrote twice, then restored to its first content, is credited.
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "first" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  echo "second" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  echo "first" > "$sandbox/foo.txt"
  git -C "$sandbox" add foo.txt
  git -C "$sandbox" commit -q -m "back to the first content"

  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Cursor"; then
    pass "A file edited twice is credited with either recorded content"
  else
    fail "A file edited twice lost the trailer for its first recorded content"
  fi
  rm -rf "$sandbox"
}

test_record_for_another_path_does_not_credit_a_commit() {
  local sandbox blob
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "hello" > "$sandbox/foo.txt"
  blob="$(git -C "$sandbox" hash-object foo.txt)"
  write_record "$sandbox" claude other.txt "$blob" a
  git -C "$sandbox" add foo.txt
  git -C "$sandbox" commit -q -m "record for another path"
  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By"; then
    fail "A record for another path earned a trailer"
  else
    pass "A record for another path earns no trailer"
  fi

  write_record "$sandbox" claude foo.txt "$blob" b
  echo "again" > "$sandbox/bar.txt"
  git -C "$sandbox" add bar.txt
  git -C "$sandbox" commit -q -m "record for a path that is not staged"
  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By"; then
    fail "A record for a path that is not staged earned a trailer"
  else
    pass "A record for a path that is not staged earns no trailer"
  fi
  rm -rf "$sandbox"
}

test_edit_hook_leaves_one_whole_record_and_no_temporary_file() {
  local sandbox record expected
  sandbox="$(new_sandbox)"
  echo "hello" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  expected="$(printf '%s\tfoo.txt' "$(git -C "$sandbox" hash-object foo.txt)")"
  record="$(cat "$sandbox"/.git/ai-touch/cursor.hashes.d/e.* 2>/dev/null)"
  if [ "$record" = "$expected" ] && [ -z "$(find "$sandbox/.git/ai-touch/cursor.hashes.d" -maxdepth 1 -name '.w.*' -print)" ]; then
    pass "The edit hook leaves one whole record and no temporary file"
  else
    fail "The edit hook left an unexpected record (got: $record)"
  fi
  rm -rf "$sandbox"
}

test_post_commit_keeps_the_record_of_an_edit_that_is_still_pending() {
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "a" > "$sandbox/a.txt"
  echo "b" > "$sandbox/b.txt"
  printf '{"file_path":"a.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  printf '{"file_path":"b.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  git -C "$sandbox" add a.txt
  git -C "$sandbox" commit -q -m "only a"

  if [ "$(cat "$(paths_file "$sandbox" cursor)")" = "b.txt" ]; then
    pass "post-commit deletes the committed path's record and keeps the pending one"
  else
    fail "post-commit left the wrong records (got: $(cat "$(paths_file "$sandbox" cursor)"))"
  fi
  rm -rf "$sandbox"
}

test_the_rest_of_a_partly_staged_edit_is_still_credited() {
  # The index takes the first line only. The tool's full content is still in the working tree, so its record stays and the commit
  # that finishes the file gets the trailer.
  local sandbox part
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  printf 'one\ntwo\n' > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  part="$(printf 'one\n' | git -C "$sandbox" hash-object -w --stdin)"
  git -C "$sandbox" update-index --add --cacheinfo "100644,$part,foo.txt"
  git -C "$sandbox" commit -q -m "first line"
  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By"; then
    fail "A partly staged edit was credited for content the tool did not leave"
    rm -rf "$sandbox"
    return
  fi
  git -C "$sandbox" add foo.txt
  git -C "$sandbox" commit -q -m "second line"
  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Cursor"; then
    pass "The commit that finishes a partly staged edit gets the trailer"
  else
    fail "The rest of a partly staged edit lost its record"
  fi
  rm -rf "$sandbox"
}

test_post_commit_drops_the_record_of_an_edit_that_was_thrown_away() {
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "original" > "$sandbox/foo.txt"
  git -C "$sandbox" add foo.txt
  git -C "$sandbox" commit -q -m init
  echo "from the tool" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  git -C "$sandbox" checkout -q -- foo.txt
  echo "unrelated" > "$sandbox/other.txt"
  git -C "$sandbox" add other.txt
  git -C "$sandbox" commit -q -m "an unrelated commit"

  if [ ! -s "$(paths_file "$sandbox" cursor)" ]; then
    pass "post-commit drops the record of an edit that was thrown away"
  else
    fail "A thrown-away edit's record survived (got: $(cat "$(paths_file "$sandbox" cursor)"))"
  fi
  rm -rf "$sandbox"
}

test_post_commit_keeps_a_new_edit_of_a_path_that_was_just_committed() {
  # Two records for one path: one for the content HEAD holds, one for newer content still in the working tree.
  local sandbox old new
  sandbox="$(new_sandbox)"
  echo "committed" > "$sandbox/foo.txt"
  git -C "$sandbox" add foo.txt
  git -C "$sandbox" commit -q -m "committed content"
  old="$(git -C "$sandbox" hash-object foo.txt)"
  echo "newer" > "$sandbox/foo.txt"
  new="$(git -C "$sandbox" hash-object foo.txt)"
  write_record "$sandbox" cursor foo.txt "$old" old
  write_record "$sandbox" cursor foo.txt "$new" new
  (cd "$sandbox" && "$GIT_HOOKS_DIR/post-commit")

  if [ ! -e "$sandbox/.git/ai-touch/cursor.hashes.d/e.old" ] && [ -e "$sandbox/.git/ai-touch/cursor.hashes.d/e.new" ]; then
    pass "post-commit deletes the record HEAD holds and keeps the newer edit's record"
  else
    fail "post-commit judged the two records wrongly"
  fi
  rm -rf "$sandbox"
}

test_post_commit_keeps_a_pending_symlink_and_a_pending_deletion() {
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "gone soon" > "$sandbox/doomed.txt"
  echo "target" > "$sandbox/target.txt"
  git -C "$sandbox" add doomed.txt target.txt
  git -C "$sandbox" commit -q -m init

  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-pre)
  ln -s target.txt "$sandbox/link.txt"
  rm "$sandbox/doomed.txt"
  printf '{}' | (cd "$sandbox" && "$TRACK" claude --bash-post)
  echo "unrelated" > "$sandbox/other.txt"
  git -C "$sandbox" add other.txt
  git -C "$sandbox" commit -q -m "an unrelated commit"

  if grep -qxF "link.txt" "$(paths_file "$sandbox" claude)" && grep -qxF "doomed.txt" "$(paths_file "$sandbox" claude)"; then
    pass "post-commit keeps the records of a pending symlink and a pending deletion"
  else
    fail "post-commit dropped a pending record (got: $(cat "$(paths_file "$sandbox" claude)"))"
  fi
  git -C "$sandbox" add -A
  git -C "$sandbox" commit -q -m "the symlink and the deletion"
  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Claude" && [ ! -s "$(paths_file "$sandbox" claude)" ]; then
    pass "The commit of a symlink and a deletion gets the trailer and clears both records"
  else
    fail "The symlink and deletion commit gave an unexpected result"
  fi
  rm -rf "$sandbox"
}

test_post_commit_removes_only_old_temporary_files() {
  local sandbox dir
  sandbox="$(new_sandbox)"
  echo "a" > "$sandbox/a.txt"
  git -C "$sandbox" add a.txt
  git -C "$sandbox" commit -q -m "a"
  dir="$sandbox/.git/ai-touch/cursor.hashes.d"
  mkdir -p "$dir"
  : > "$dir/.w.stale"
  touch -t 202001010000 "$dir/.w.stale"
  : > "$dir/.w.fresh"
  (cd "$sandbox" && "$GIT_HOOKS_DIR/post-commit")

  if [ ! -e "$dir/.w.stale" ] && [ -e "$dir/.w.fresh" ]; then
    pass "post-commit removes a temporary file an hour old and leaves a fresh one"
  else
    fail "post-commit handled temporary files wrongly"
  fi
  rm -rf "$sandbox"
}

test_post_commit_keeps_a_record_that_only_the_index_still_holds() {
  # `git commit <path>` commits that path alone and leaves the index for every other path as it was. The tool's content for foo.txt is
  # staged, the working tree has moved on, and the record must stay so the later commit of the index is credited.
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  echo "base" > "$sandbox/foo.txt"
  echo "base" > "$sandbox/other.txt"
  git -C "$sandbox" add foo.txt other.txt
  git -C "$sandbox" commit -q -m init

  echo "from the tool" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  git -C "$sandbox" add foo.txt
  echo "a person typed over it" > "$sandbox/foo.txt"
  echo "changed" > "$sandbox/other.txt"
  git -C "$sandbox" commit -q -m "only other.txt" other.txt

  if [ "$(cat "$(paths_file "$sandbox" cursor)")" = "foo.txt" ]; then
    pass "post-commit keeps a record that only the index still holds"
  else
    fail "post-commit dropped a record whose content is still staged (got: $(cat "$(paths_file "$sandbox" cursor)"))"
  fi
  git -C "$sandbox" commit -q -m "the staged foo.txt"
  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Cursor"; then
    pass "The commit of the staged content is credited"
  else
    fail "The commit of the staged content got no trailer"
  fi
  rm -rf "$sandbox"
}

test_a_path_that_looks_like_revision_syntax_is_read_as_a_path() {
  # Git reads ":0:x.txt" as stage 0 of "x.txt". The hook must read "0:x.txt" as a path, so it keeps the record of a staged edit.
  local sandbox name
  sandbox="$(new_sandbox)"
  name="0:x.txt"
  echo "base" > "$sandbox/other.txt"
  echo "base" > "$sandbox/$name"
  git -C "$sandbox" add other.txt -- "$name"
  git -C "$sandbox" commit -q -m init
  echo "from the tool" > "$sandbox/$name"
  printf '{"file_path":"%s"}' "$name" | (cd "$sandbox" && "$TRACK" cursor)
  git -C "$sandbox" add -- "$name"
  echo "a person typed over it" > "$sandbox/$name"
  echo "changed" > "$sandbox/other.txt"
  git -C "$sandbox" commit -q -m "only other.txt" other.txt
  (cd "$sandbox" && "$GIT_HOOKS_DIR/post-commit")

  if [ "$(cat "$(paths_file "$sandbox" cursor)")" = "$name" ]; then
    pass "A path that looks like revision syntax is read as a path"
  else
    fail "A path that looks like revision syntax lost its record (got: $(cat "$(paths_file "$sandbox" cursor)"))"
  fi
  rm -rf "$sandbox"
}

test_edit_hook_says_so_when_it_cannot_write_a_record() {
  local sandbox err
  sandbox="$(new_sandbox)"
  if [ "$(id -u)" = "0" ]; then
    echo "SKIP: a folder that cannot be written is not testable as root"
    rm -rf "$sandbox"
    return
  fi
  mkdir -p "$sandbox/.git/ai-touch/cursor.hashes.d"
  chmod 0555 "$sandbox/.git/ai-touch/cursor.hashes.d"
  err="$(printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor) 2>&1 >/dev/null)"
  chmod 0755 "$sandbox/.git/ai-touch/cursor.hashes.d"
  if echo "$err" | grep -q "could not record foo.txt"; then
    pass "The edit hook says so when it cannot write a record"
  else
    fail "The edit hook was silent when it could not write a record (got: $err)"
  fi
  rm -rf "$sandbox"
}

test_edit_hooks_and_post_commit_running_together_lose_no_pending_record() {
  # Twenty edit hooks run while post-commit runs ten times. Each file is untracked and still holds the recorded content, so every
  # record is pending and none may disappear.
  local sandbox i n
  sandbox="$(new_sandbox)"
  git -C "$sandbox" commit -q --allow-empty -m init
  for i in $(seq 1 20); do
    echo "$i" > "$sandbox/f$i.txt"
    printf '{"file_path":"f%s.txt"}' "$i" | (cd "$sandbox" && "$TRACK" cursor) &
  done
  for i in $(seq 1 10); do
    (cd "$sandbox" && "$GIT_HOOKS_DIR/post-commit") &
  done
  wait
  n="$(find "$sandbox/.git/ai-touch/cursor.hashes.d" -maxdepth 1 -type f -name 'e.*' | wc -l | tr -d ' ')"
  if [ "$n" = "20" ]; then
    pass "Edit hooks running with post-commit lose no pending record"
  else
    fail "Edit hooks running with post-commit left $n of 20 records"
  fi
  rm -rf "$sandbox"
}

test_records_belong_to_one_linked_worktree() {
  # Git keeps ai-touch inside each worktree's own folder, so a commit in one worktree cannot judge or delete another's records.
  local sandbox other
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  git -C "$sandbox" commit -q --allow-empty -m init
  other="$(mktemp -d)/linked"
  git -C "$sandbox" worktree add -q "$other" -b linked
  echo "pending" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  echo "elsewhere" > "$other/bar.txt"
  git -C "$other" add bar.txt
  git -C "$other" commit -q -m "a commit in the other worktree"

  if [ "$(cat "$(paths_file "$sandbox" cursor)")" = "foo.txt" ]; then
    pass "A commit in a linked worktree leaves the main worktree's records alone"
  else
    fail "A commit in a linked worktree changed the main worktree's records"
  fi
  rm -rf "$sandbox" "$(dirname "$other")"
}

test_doctor_reads_what_the_edit_hook_records() {
  # ai/hooks/doctor.py is the live check for each tool's wiring. It reads the records the edit hook writes, so this runs the real hook
  # and then the doctor's own readers over the same repository. The package copy of this suite has no doctor.py and skips it.
  local sandbox out expected
  if [ ! -f "$SELF_DIR/doctor.py" ]; then
    echo "SKIP: doctor.py is not beside this suite"
    return
  fi
  sandbox="$(new_sandbox)"
  printf '{"file_path":"a b/foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  out="$(python3 -c '
import sys
from pathlib import Path
sys.path.insert(0, sys.argv[1])
import doctor
records = doctor.resolve_records_dir("cursor", Path(sys.argv[2]))
print("\n".join(doctor.recorded_paths(records)))
doctor.remove_records_for(records, "a b/foo.txt")
print("after:" + ",".join(doctor.recorded_paths(records)))
' "$SELF_DIR" "$sandbox" 2>&1)"
  expected="$(printf 'a b/foo.txt\nafter:')"
  if [ "$out" = "$expected" ]; then
    pass "doctor.py reads and removes the records the edit hook writes"
  else
    fail "doctor.py does not agree with the edit hook about the records (got: $out)"
  fi
  rm -rf "$sandbox"
}

test_post_commit_keeps_the_record_of_a_pending_crlf_file() {
  # post-commit hashes the working-tree file the same way the edit hook did, filters included. A CRLF file that is still pending
  # under core.autocrlf keeps its record through an unrelated commit and is credited when it is finally committed.
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  git -C "$sandbox" config core.autocrlf true
  printf 'line one\r\nline two\r\n' > "$sandbox/crlf.txt"
  printf '{"file_path":"crlf.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  echo "unrelated" > "$sandbox/other.txt"
  git -C "$sandbox" add other.txt
  git -C "$sandbox" commit -q -m "an unrelated commit" 2>/dev/null

  if [ "$(cat "$(paths_file "$sandbox" cursor)")" = "crlf.txt" ]; then
    pass "post-commit keeps the record of a pending CRLF file"
  else
    fail "post-commit dropped the record of a pending CRLF file"
  fi
  git -C "$sandbox" add crlf.txt 2>/dev/null
  git -C "$sandbox" commit -q -m "the CRLF file"
  if git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Cursor" && [ ! -s "$(paths_file "$sandbox" cursor)" ]; then
    pass "The commit of the CRLF file gets the trailer and clears its record"
  else
    fail "The commit of the CRLF file gave an unexpected result"
  fi
  rm -rf "$sandbox"
}

test_a_commit_in_a_linked_worktree_is_credited_and_cleans_up_there() {
  local sandbox other
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  git -C "$sandbox" commit -q --allow-empty -m init
  other="$(mktemp -d)/linked"
  git -C "$sandbox" worktree add -q "$other" -b linked
  echo "from the tool" > "$other/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$other" && "$TRACK" cursor)
  if [ "$(cat "$(paths_file "$other" cursor)")" != "foo.txt" ]; then
    fail "No record existed in the linked worktree before the commit, so the check below would prove nothing"
    rm -rf "$sandbox" "$(dirname "$other")"
    return
  fi
  git -C "$other" add foo.txt
  git -C "$other" commit -q -m "in the linked worktree"

  if git -C "$other" log -1 --format=%B | grep -qi "Co-Authored-By: Cursor" && [ ! -s "$(paths_file "$other" cursor)" ]; then
    pass "A commit in a linked worktree gets the trailer and clears the record there"
  else
    fail "A commit in a linked worktree was not credited, or its record stayed"
  fi
  rm -rf "$sandbox" "$(dirname "$other")"
}

test_a_path_with_a_newline_is_refused_and_never_credited() {
  # A record holds one line, so a path with a newline cannot be recorded. The edit hook says so, and the commit gets no trailer.
  local sandbox err name
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  name="$(printf 'a\nb.txt')"
  echo "tool" > "$sandbox/$name"
  err="$(printf '%s' '{"file_path":"a\nb.txt"}' | (cd "$sandbox" && "$TRACK" cursor) 2>&1 >/dev/null)"
  git -C "$sandbox" add -- "$name"
  git -C "$sandbox" commit -q -m "newline in the name"

  if echo "$err" | grep -q "newline" && [ ! -s "$(paths_file "$sandbox" cursor)" ] \
     && ! git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By"; then
    pass "A path with a newline is refused with a warning and never credited"
  else
    fail "A path with a newline was recorded or credited (stderr: $err)"
  fi
  rm -rf "$sandbox"
}

test_doctor_reads_records_with_bytes_that_are_not_utf8() {
  local sandbox out
  if [ ! -f "$SELF_DIR/doctor.py" ]; then
    echo "SKIP: doctor.py is not beside this suite"
    return
  fi
  sandbox="$(new_sandbox)"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  printf 'abc\t\377\376.txt\n' > "$sandbox/.git/ai-touch/cursor.hashes.d/e.bad"
  out="$(python3 -c '
import sys
from pathlib import Path
sys.path.insert(0, sys.argv[1])
import doctor
records = doctor.resolve_records_dir("cursor", Path(sys.argv[2]))
print(len(doctor.recorded_paths(records)))
doctor.remove_records_for(records, "foo.txt")
print(len(doctor.recorded_paths(records)))
' "$SELF_DIR" "$sandbox" 2>&1)"
  if [ "$out" = "$(printf '2\n1')" ]; then
    pass "doctor.py reads records that hold bytes that are not UTF-8"
  else
    fail "doctor.py failed on a record with bytes that are not UTF-8 (got: $out)"
  fi
  rm -rf "$sandbox"
}

test_edit_hook_records_on_a_filesystem_that_refuses_hard_links() {
  # Some filesystems refuse hard links. A stand-in `ln` that always fails must not stop the hook from recording the edit.
  local sandbox fake record expected err
  sandbox="$(new_sandbox)"
  fake="$(mktemp -d)"
  printf '#!/bin/sh\nexit 1\n' > "$fake/ln"
  chmod +x "$fake/ln"
  echo "hello" > "$sandbox/foo.txt"
  err="$(printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && PATH="$fake:$PATH" "$TRACK" cursor) 2>&1 >/dev/null)"
  expected="$(printf '%s\tfoo.txt' "$(git -C "$sandbox" hash-object foo.txt)")"
  record="$(cat "$sandbox"/.git/ai-touch/cursor.hashes.d/e.* 2>/dev/null)"
  if [ "$record" = "$expected" ] && [ -z "$err" ]; then
    pass "The edit hook records an edit when hard links are refused"
  else
    fail "The edit hook did not record without hard links (stderr: $err, record: $record)"
  fi
  rm -rf "$sandbox" "$fake"
}

test_post_commit_sweeps_only_old_empty_reserved_names() {
  # The edit hook reserves a record's name before it writes the record. A killed hook can leave the empty name behind. An hour
  # later post-commit removes it, and it never removes a record that has content, however old.
  local sandbox dir
  sandbox="$(new_sandbox)"
  echo "pending" > "$sandbox/foo.txt"
  git -C "$sandbox" commit -q --allow-empty -m init
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  dir="$sandbox/.git/ai-touch/cursor.hashes.d"
  touch -t 202001010000 "$dir"/e.*
  : > "$dir/e.oldempty"
  touch -t 202001010000 "$dir/e.oldempty"
  : > "$dir/e.freshempty"
  (cd "$sandbox" && "$GIT_HOOKS_DIR/post-commit")

  if [ ! -e "$dir/e.oldempty" ] && [ -e "$dir/e.freshempty" ] && [ "$(cat "$(paths_file "$sandbox" cursor)")" = "foo.txt" ]; then
    pass "post-commit removes an old empty reserved name and keeps a fresh one and an old record"
  else
    fail "post-commit swept the wrong files in the records folder"
  fi
  rm -rf "$sandbox"
}

# --- the opt-in trace (ai-touch-debug.log) ---------------------------------

# The one shared log, as an absolute path: a sibling of the ai-touch-debug switch file in the common git folder. It may not exist.
common_dir() {
  local p
  p="$(git -C "$1" rev-parse --git-common-dir)"
  case "$p" in /*) ;; *) p="$1/$p" ;; esac
  printf '%s' "$p"
}
debug_log() { printf '%s/ai-touch-debug.log' "$(common_dir "$1")"; }

# A sandbox with the package's git hooks on and one empty commit. $1 picks the switch: off, env or file.
trace_sandbox() {
  local sandbox
  sandbox="$(new_sandbox)"
  git -C "$sandbox" config core.hooksPath "$GIT_HOOKS_DIR"
  git -C "$sandbox" commit -q --allow-empty -m init
  [ "$1" = file ] && : > "$(common_dir "$sandbox")/ai-touch-debug"
  printf '%s' "$sandbox"
}

# One tool edit of $3 (default foo.txt), then a commit of $4 (default the same file), with the switch $1 on or off.
trace_edit_and_commit() {
  local sandbox="$2" mode="$1" edited="${3:-foo.txt}" committed="${4:-foo.txt}" on=""
  [ "$mode" = env ] && on="1"
  echo "from the tool" > "$sandbox/$edited"
  [ "$committed" = "$edited" ] || echo "by hand" > "$sandbox/$committed"
  printf '{"file_path":"%s"}' "$edited" | (cd "$sandbox" && AI_TOUCH_DEBUG="$on" "$TRACK" cursor)
  git -C "$sandbox" add "$committed"
  AI_TOUCH_DEBUG="$on" git -C "$sandbox" commit -q -m "traced commit"
}

# A log of about 700 kB, past the 512 KiB limit, so the next line written must cut it back.
seed_big_log() {
  mkdir -p "$(dirname "$1")"
  head -c 700000 /dev/zero | tr '\0' 'x' | fold -w 100 > "$1"
}

# Each line: a UTC time, the hook name, the worktree's folder name in brackets, then the decision.
trace_credit_lines_present() {
  local log="$1" name="$2"
  grep -Eq " track-ai-touch \[$name\] edit tool=cursor recorded 1 path" "$log" \
    && grep -Eq " prepare-commit-msg \[$name\] credited cursor: matched 1 of 1 staged path" "$log" \
    && grep -Eq " post-commit \[$name\] tool=cursor removed 1 spent record, 0 discarded, kept 0 pending" "$log" \
    && grep -Eq '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9:]{8}Z ' "$log"
}

test_trace_off_leaves_no_log_and_prints_nothing_more() {
  local sandbox err
  sandbox="$(trace_sandbox off)"
  err="$(trace_edit_and_commit off "$sandbox" 2>&1)"
  if [ ! -e "$(debug_log "$sandbox")" ] && [ -z "$err" ] && git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Cursor"; then
    pass "With the trace switch off, no log exists and nothing extra is printed"
  else
    fail "With the trace switch off, a log exists or output appeared (output: $err)"
  fi
  rm -rf "$sandbox"
}

test_trace_env_switch_logs_the_record_the_credit_and_the_spent_record() {
  local sandbox err
  sandbox="$(trace_sandbox env)"
  err="$(trace_edit_and_commit env "$sandbox" 2>&1)"
  if trace_credit_lines_present "$(debug_log "$sandbox")" "${sandbox##*/}" && [ -z "$err" ]; then
    pass "AI_TOUCH_DEBUG logs the recorded edit, the credit and the spent record, and prints nothing"
  else
    fail "AI_TOUCH_DEBUG did not log the expected lines (output: $err; log: $(cat "$(debug_log "$sandbox")" 2>/dev/null))"
  fi
  rm -rf "$sandbox"
}

test_trace_file_switch_logs_the_same_lines() {
  local sandbox
  sandbox="$(trace_sandbox file)"
  trace_edit_and_commit file "$sandbox"
  if trace_credit_lines_present "$(debug_log "$sandbox")" "${sandbox##*/}"; then
    pass "The ai-touch-debug file in the common git folder turns the trace on without the environment"
  else
    fail "The ai-touch-debug file did not turn the trace on (log: $(cat "$(debug_log "$sandbox")" 2>/dev/null))"
  fi
  rm -rf "$sandbox"
}

test_trace_says_when_no_record_matches_the_staged_content() {
  local sandbox
  sandbox="$(trace_sandbox env)"
  trace_edit_and_commit env "$sandbox" foo.txt bar.txt
  if grep -Eq ' prepare-commit-msg \[[^]]*\] no record matches for cursor: records=1 staged=1 same-path-other-content=0' "$(debug_log "$sandbox")" \
     && ! git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By"; then
    pass "The trace names the record and staged counts when no record matches"
  else
    fail "The trace did not explain a commit with no match (log: $(cat "$(debug_log "$sandbox")" 2>/dev/null))"
  fi
  rm -rf "$sandbox"
}

test_trace_counts_a_staged_path_whose_content_changed_after_the_edit() {
  local sandbox
  sandbox="$(trace_sandbox env)"
  echo "from the tool" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && AI_TOUCH_DEBUG=1 "$TRACK" cursor)
  echo "then changed by hand" > "$sandbox/foo.txt"
  git -C "$sandbox" add foo.txt
  AI_TOUCH_DEBUG=1 git -C "$sandbox" commit -q -m "changed by hand"
  if grep -Eq ' no record matches for cursor: records=1 staged=1 same-path-other-content=1' "$(debug_log "$sandbox")"; then
    pass "The trace counts a staged path that has a record with other content"
  else
    fail "The trace did not count the path with other content (log: $(cat "$(debug_log "$sandbox")" 2>/dev/null))"
  fi
  rm -rf "$sandbox"
}

test_trace_names_the_merge_and_squash_sources() {
  local sandbox log
  sandbox="$(trace_sandbox env)"
  log="$(debug_log "$sandbox")"
  git -C "$sandbox" switch -q -c feature
  echo "x" > "$sandbox/feature.txt"
  git -C "$sandbox" add feature.txt
  git -C "$sandbox" commit -q -m "feature work"
  git -C "$sandbox" switch -q -
  echo "y" > "$sandbox/main.txt"
  git -C "$sandbox" add main.txt
  git -C "$sandbox" commit -q -m "main work"
  AI_TOUCH_DEBUG=1 git -C "$sandbox" merge -q --no-ff -m "merge feature" feature >/dev/null 2>&1
  git -C "$sandbox" switch -q -c second
  echo "z" > "$sandbox/second.txt"
  git -C "$sandbox" add second.txt
  git -C "$sandbox" commit -q -m "second work"
  git -C "$sandbox" switch -q -
  AI_TOUCH_DEBUG=1 git -C "$sandbox" merge -q --squash second >/dev/null 2>&1
  AI_TOUCH_DEBUG=1 GIT_EDITOR=true git -C "$sandbox" commit -q >/dev/null 2>&1
  if grep -Eq ' prepare-commit-msg \[[^]]*\] source=merge: nothing credited' "$log" && grep -Eq ' prepare-commit-msg \[[^]]*\] source=squash: nothing credited' "$log"; then
    pass "The trace says a merge or squash commit was not credited, and why"
  else
    fail "The trace did not name the merge and squash sources (log: $(cat "$log" 2>/dev/null))"
  fi
  rm -rf "$sandbox"
}

test_trace_names_why_an_edit_was_skipped() {
  local sandbox log no_jq_bin cmd real_bash
  sandbox="$(trace_sandbox env)"
  log="$(debug_log "$sandbox")"
  printf '{"tool_name":"Bash","tool_input":{"command":"ls"}}' | (cd "$sandbox" && AI_TOUCH_DEBUG=1 "$TRACK" claude)
  no_jq_bin="$(mktemp -d)"
  for cmd in git mkdir touch grep sed basename dirname date wc tail mv cat; do
    ln -s "$(command -v "$cmd")" "$no_jq_bin/$cmd"
  done
  real_bash="$(command -v bash)"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && AI_TOUCH_DEBUG=1 PATH="$no_jq_bin" "$real_bash" "$TRACK" claude) >/dev/null 2>&1
  if grep -Eq ' track-ai-touch \[[^]]*\] edit tool=claude skipped: the payload holds no path' "$log" \
     && grep -Eq ' track-ai-touch \[[^]]*\] edit tool=claude skipped: jq is not on PATH' "$log"; then
    pass "The trace names a skipped edit: no path in the payload, or jq missing"
  else
    fail "The trace did not name the skipped edits (log: $(cat "$log" 2>/dev/null))"
  fi
  rm -rf "$sandbox" "$no_jq_bin"
}

test_trace_of_a_linked_worktree_goes_to_the_shared_log_and_outlives_the_worktree() {
  local sandbox other log
  sandbox="$(trace_sandbox file)"
  other="$(mktemp -d)/linked"
  git -C "$sandbox" worktree add -q "$other" -b linked
  trace_edit_and_commit file "$other"
  log="$(debug_log "$sandbox")"
  if ! trace_credit_lines_present "$log" "linked" || ! [ "$(debug_log "$other")" -ef "$log" ]; then
    fail "The linked worktree's trace did not reach the shared log, tagged with its folder name (log: $(cat "$log" 2>/dev/null))"
  elif [ -e "$(git -C "$other" rev-parse --git-path ai-touch/debug.log)" ]; then
    fail "The linked worktree also wrote a log of its own"
  else
    git -C "$sandbox" worktree remove --force "$other"
    if grep -q '\[linked\]' "$log"; then
      pass "A linked worktree writes to the one shared log, tagged with its folder name, and the log outlives the worktree"
    else
      fail "Removing the linked worktree took its trace lines with it"
    fi
  fi
  rm -rf "$sandbox" "$(dirname "$other")"
}

test_trace_that_cannot_write_changes_nothing() {
  local sandbox err
  sandbox="$(trace_sandbox env)"
  mkdir -p "$(debug_log "$sandbox")"
  err="$(trace_edit_and_commit env "$sandbox" 2>&1)"
  if [ -z "$err" ] && git -C "$sandbox" log -1 --format=%B | grep -qi "Co-Authored-By: Cursor" \
     && [ ! -s "$(paths_file "$sandbox" cursor)" ]; then
    pass "A log that cannot be written leaves the hooks behaving as with the switch off"
  else
    fail "An unwritable log changed a hook's behaviour (output: $err)"
  fi
  rm -rf "$sandbox"
}

# The log is cut back by whichever hook writes to it, so each hook is run on its own against an oversized log.
test_the_edit_hook_cuts_the_log_back_by_itself() {
  local sandbox log size
  sandbox="$(new_sandbox)"
  log="$(debug_log "$sandbox")"
  seed_big_log "$log"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && AI_TOUCH_DEBUG=1 "$TRACK" cursor)
  size="$(wc -c < "$log" | tr -d ' ')"
  if [ "$size" -lt 524288 ] && grep -q ' track-ai-touch ' "$log"; then
    pass "The edit hook cuts an oversized log back and keeps its own line"
  else
    fail "The edit hook did not cut the log back (size: $size)"
  fi
  rm -rf "$sandbox"
}

test_prepare_commit_msg_cuts_the_log_back_by_itself() {
  local sandbox log size msg
  sandbox="$(new_sandbox)"
  log="$(debug_log "$sandbox")"
  echo "from the tool" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  git -C "$sandbox" add foo.txt
  seed_big_log "$log"
  msg="$sandbox/.git/MSG"
  echo "a commit" > "$msg"
  (cd "$sandbox" && AI_TOUCH_DEBUG=1 "$GIT_HOOKS_DIR/prepare-commit-msg" "$msg")
  size="$(wc -c < "$log" | tr -d ' ')"
  if [ "$size" -lt 524288 ] && grep -q ' prepare-commit-msg ' "$log"; then
    pass "prepare-commit-msg cuts an oversized log back and keeps its own line"
  else
    fail "prepare-commit-msg did not cut the log back (size: $size)"
  fi
  rm -rf "$sandbox"
}

test_post_commit_cuts_the_log_back_by_itself() {
  local sandbox log size
  sandbox="$(new_sandbox)"
  log="$(debug_log "$sandbox")"
  echo "from the tool" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && "$TRACK" cursor)
  git -C "$sandbox" add foo.txt
  git -C "$sandbox" commit -q -m "no hooks run here"
  seed_big_log "$log"
  (cd "$sandbox" && AI_TOUCH_DEBUG=1 "$GIT_HOOKS_DIR/post-commit")
  size="$(wc -c < "$log" | tr -d ' ')"
  if [ "$size" -lt 524288 ] && grep -q ' post-commit ' "$log"; then
    pass "post-commit cuts an oversized log back and keeps its own line"
  else
    fail "post-commit did not cut the log back (size: $size)"
  fi
  rm -rf "$sandbox"
}

test_post_commit_trace_counts_a_discarded_and_a_pending_record() {
  local sandbox log
  sandbox="$(trace_sandbox env)"
  log="$(debug_log "$sandbox")"
  echo "original" > "$sandbox/foo.txt"
  git -C "$sandbox" add foo.txt
  git -C "$sandbox" commit -q -m "foo"
  echo "from the tool" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && AI_TOUCH_DEBUG=1 "$TRACK" cursor)
  git -C "$sandbox" checkout -q -- foo.txt
  echo "by hand" > "$sandbox/bar.txt"
  git -C "$sandbox" add bar.txt
  AI_TOUCH_DEBUG=1 git -C "$sandbox" commit -q -m "bar"
  echo "from the tool" > "$sandbox/baz.txt"
  printf '{"file_path":"baz.txt"}' | (cd "$sandbox" && AI_TOUCH_DEBUG=1 "$TRACK" cursor)
  echo "by hand" > "$sandbox/qux.txt"
  git -C "$sandbox" add qux.txt
  AI_TOUCH_DEBUG=1 git -C "$sandbox" commit -q -m "qux"
  if grep -Eq ' post-commit \[[^]]*\] tool=cursor removed 0 spent record, 1 discarded, kept 0 pending' "$log" \
     && grep -Eq ' post-commit \[[^]]*\] tool=cursor removed 0 spent record, 0 discarded, kept 1 pending' "$log"; then
    pass "The post-commit trace counts a discarded record and a pending record"
  else
    fail "The post-commit trace did not count the discarded and pending records (log: $(cat "$log" 2>/dev/null))"
  fi
  rm -rf "$sandbox"
}

test_trace_names_an_already_credited_tool_and_an_empty_commit() {
  local sandbox log
  sandbox="$(trace_sandbox env)"
  log="$(debug_log "$sandbox")"
  echo "from the tool" > "$sandbox/foo.txt"
  printf '{"file_path":"foo.txt"}' | (cd "$sandbox" && AI_TOUCH_DEBUG=1 "$TRACK" cursor)
  git -C "$sandbox" add foo.txt
  AI_TOUCH_DEBUG=1 git -C "$sandbox" commit -q -m "by hand" -m "Co-Authored-By: Cursor <noreply@cursor.com>"
  AI_TOUCH_DEBUG=1 git -C "$sandbox" commit -q --allow-empty -m "nothing staged"
  if grep -Eq ' prepare-commit-msg \[[^]]*\] cursor already credited in the message' "$log" \
     && grep -Eq ' prepare-commit-msg \[[^]]*\] nothing staged: nothing credited' "$log"; then
    pass "The trace names a tool that is already credited, and a commit with nothing staged"
  else
    fail "The trace did not name the already-credited and empty commits (log: $(cat "$log" 2>/dev/null))"
  fi
  rm -rf "$sandbox"
}

test_trace_names_a_missing_ai_touch_folder_and_an_empty_one() {
  local sandbox log
  sandbox="$(trace_sandbox env)"
  log="$(debug_log "$sandbox")"
  echo "a" > "$sandbox/a.txt"
  git -C "$sandbox" add a.txt
  AI_TOUCH_DEBUG=1 git -C "$sandbox" commit -q -m "no ai-touch folder yet"
  mkdir -p "$sandbox/.git/ai-touch"
  echo "b" > "$sandbox/b.txt"
  git -C "$sandbox" add b.txt
  AI_TOUCH_DEBUG=1 git -C "$sandbox" commit -q -m "an empty ai-touch folder"
  if grep -Eq ' prepare-commit-msg \[[^]]*\] no ai-touch folder: nothing credited' "$log" \
     && grep -Eq ' post-commit \[[^]]*\] no ai-touch folder: nothing to clean' "$log" \
     && grep -Eq ' prepare-commit-msg \[[^]]*\] ai-touch holds no records folder: nothing credited' "$log" \
     && grep -Eq ' post-commit \[[^]]*\] no records folder: nothing to clean' "$log"; then
    pass "The trace names a missing ai-touch folder and one with no records folder, in both hooks"
  else
    fail "The trace did not name the missing and empty ai-touch folders (log: $(cat "$log" 2>/dev/null))"
  fi
  rm -rf "$sandbox"
}

# With the switch off, a hook that exits early must start no process. An empty PATH makes any external command fail loudly.
test_trace_off_starts_no_process_on_an_early_exit() {
  local sandbox real_bash out msg other
  sandbox="$(new_sandbox)"
  real_bash="$(command -v bash)"
  msg="$sandbox/.git/MSG"
  echo "m" > "$msg"
  out="$(cd "$sandbox" && PATH="" "$real_bash" "$GIT_HOOKS_DIR/prepare-commit-msg" "$msg" merge 2>&1)"
  if [ -n "$out" ]; then
    fail "A merge-source exit with the trace off ran something or printed (output: $out)"
    rm -rf "$sandbox"
    return
  fi
  out="$(printf '{}' | (cd "$sandbox" && PATH="" "$real_bash" "$TRACK" claude 2>&1))"
  case "$out" in
    "track-ai-touch: 'jq' not found on PATH;"*) ;;
    *) fail "A missing-jq exit with the trace off ran something else (output: $out)"; rm -rf "$sandbox"; return ;;
  esac
  # The walk up from a subfolder uses no dirname.
  mkdir -p "$sandbox/a/b"
  out="$(printf '{}' | (cd "$sandbox/a/b" && PATH="" "$real_bash" "$TRACK" claude 2>&1))"
  case "$out" in
    "track-ai-touch: 'jq' not found on PATH;"*) ;;
    *) fail "The walk up from a subfolder with the trace off ran something else (output: $out)"; rm -rf "$sandbox"; return ;;
  esac
  # A linked worktree's .git is a file. One with no gitdir line is walked past without a trace and without a failure.
  other="$(mktemp -d)"
  echo "not a pointer" > "$other/.git"
  out="$(printf '{}' | (cd "$other" && PATH="" "$real_bash" "$TRACK" claude 2>&1))"
  case "$out" in
    "track-ai-touch: 'jq' not found on PATH;"*) pass "With the trace off, an early exit starts no process, and a .git file with no gitdir line is skipped" ;;
    *) fail "A .git file with no gitdir line broke the early exit (output: $out)" ;;
  esac
  rm -rf "$sandbox" "$other"
}

test_trace_stops_at_a_git_file_with_no_gitdir_line_and_does_not_borrow_a_parent_repository() {
  local sandbox log no_jq_bin cmd real_bash
  sandbox="$(trace_sandbox file)"
  log="$(debug_log "$sandbox")"
  mkdir -p "$sandbox/sub"
  echo "not a pointer" > "$sandbox/sub/.git"
  no_jq_bin="$(mktemp -d)"
  for cmd in git mkdir touch grep sed basename dirname date wc tail mv cat; do
    ln -s "$(command -v "$cmd")" "$no_jq_bin/$cmd"
  done
  real_bash="$(command -v bash)"
  printf '{}' | (cd "$sandbox/sub" && PATH="$no_jq_bin" "$real_bash" "$TRACK" claude) >/dev/null 2>&1
  if [ ! -e "$log" ]; then
    pass "A .git file with no gitdir line ends the walk without a trace, and no parent repository's log is used"
  else
    fail "A .git file with no gitdir line was traced into another log ($(cat "$log"))"
  fi
  rm -rf "$sandbox" "$no_jq_bin"
}

test_trace_of_an_early_exit_in_a_linked_worktree_reaches_the_shared_log() {
  local sandbox other log no_jq_bin cmd real_bash
  sandbox="$(trace_sandbox file)"
  other="$(mktemp -d)/linked"
  git -C "$sandbox" worktree add -q "$other" -b linked
  log="$(debug_log "$sandbox")"
  no_jq_bin="$(mktemp -d)"
  for cmd in git mkdir touch grep sed basename dirname date wc tail mv cat; do
    ln -s "$(command -v "$cmd")" "$no_jq_bin/$cmd"
  done
  real_bash="$(command -v bash)"
  printf '{"file_path":"foo.txt"}' | (cd "$other" && PATH="$no_jq_bin" "$real_bash" "$TRACK" claude) >/dev/null 2>&1
  if grep -Eq ' track-ai-touch \[linked\] edit tool=claude skipped: jq is not on PATH' "$log"; then
    pass "An early exit in a linked worktree finds the shared log without running git"
  else
    fail "An early exit in a linked worktree did not reach the shared log (log: $(cat "$log" 2>/dev/null))"
  fi
  rm -rf "$sandbox" "$(dirname "$other")" "$no_jq_bin"
}

# --- run everything --------------------------------------------------------

test_claude_edit
test_cursor_after_file_edit
test_codex_apply_patch
test_codex_false_attribution
test_irrelevant_claude_payload
test_claude_bash_pre_post_detects_writes
test_claude_bash_pre_post_ignores_preexisting_dirt
test_bash_pre_post_ignores_git_add_of_human_edit
test_bash_caused_commit_gets_trailer
test_bash_pre_post_detects_deletion_of_clean_file
test_bash_pre_post_concurrent_calls_dont_collide
test_copilot_create
test_copilot_edit
test_copilot_view_readonly
test_copilot_bash_known_gap
test_single_tool_trailer_and_clear
test_no_ai_touch_no_trailer
test_two_tool_commit_two_trailers
test_root_commit_trim
test_jq_missing_degrades_gracefully
test_reverted_ai_edit_does_not_credit_a_later_human_edit
test_second_tool_edit_replaces_the_recorded_content
test_deletion_by_a_tool_is_credited
test_non_ascii_path_gets_trailer_and_is_cleared
test_human_co_author_named_like_the_tool_does_not_block_the_trailer
test_existing_tool_trailer_is_not_duplicated
test_commit_with_thousands_of_staged_files_still_succeeds_and_gets_the_trailer
test_second_tool_on_the_same_file_takes_the_credit_alone
test_symlink_made_by_a_bash_call_is_credited
test_clean_filters_do_not_hide_a_tool_edit_from_the_hash_check

test_parallel_edit_hooks_each_keep_their_hash
test_a_file_edited_twice_is_credited_with_either_content
test_record_for_another_path_does_not_credit_a_commit
test_edit_hook_leaves_one_whole_record_and_no_temporary_file
test_post_commit_keeps_the_record_of_an_edit_that_is_still_pending
test_the_rest_of_a_partly_staged_edit_is_still_credited
test_post_commit_drops_the_record_of_an_edit_that_was_thrown_away
test_post_commit_keeps_a_new_edit_of_a_path_that_was_just_committed
test_post_commit_keeps_a_pending_symlink_and_a_pending_deletion
test_post_commit_removes_only_old_temporary_files
test_post_commit_keeps_a_record_that_only_the_index_still_holds
test_a_path_that_looks_like_revision_syntax_is_read_as_a_path
test_edit_hook_says_so_when_it_cannot_write_a_record
test_edit_hooks_and_post_commit_running_together_lose_no_pending_record
test_records_belong_to_one_linked_worktree
test_doctor_reads_what_the_edit_hook_records
test_post_commit_keeps_the_record_of_a_pending_crlf_file
test_a_commit_in_a_linked_worktree_is_credited_and_cleans_up_there
test_a_path_with_a_newline_is_refused_and_never_credited
test_doctor_reads_records_with_bytes_that_are_not_utf8
test_edit_hook_records_on_a_filesystem_that_refuses_hard_links
test_post_commit_sweeps_only_old_empty_reserved_names
test_trace_off_leaves_no_log_and_prints_nothing_more
test_trace_env_switch_logs_the_record_the_credit_and_the_spent_record
test_trace_file_switch_logs_the_same_lines
test_trace_says_when_no_record_matches_the_staged_content
test_trace_counts_a_staged_path_whose_content_changed_after_the_edit
test_trace_names_the_merge_and_squash_sources
test_trace_names_why_an_edit_was_skipped
test_trace_of_a_linked_worktree_goes_to_the_shared_log_and_outlives_the_worktree
test_trace_that_cannot_write_changes_nothing
test_the_edit_hook_cuts_the_log_back_by_itself
test_prepare_commit_msg_cuts_the_log_back_by_itself
test_post_commit_cuts_the_log_back_by_itself
test_post_commit_trace_counts_a_discarded_and_a_pending_record
test_trace_names_an_already_credited_tool_and_an_empty_commit
test_trace_names_a_missing_ai_touch_folder_and_an_empty_one
test_trace_off_starts_no_process_on_an_early_exit
test_trace_stops_at_a_git_file_with_no_gitdir_line_and_does_not_borrow_a_parent_repository
test_trace_of_an_early_exit_in_a_linked_worktree_reaches_the_shared_log
echo ""
echo "$pass_count passed, $fail_count failed"
[ "$fail_count" -eq 0 ]
