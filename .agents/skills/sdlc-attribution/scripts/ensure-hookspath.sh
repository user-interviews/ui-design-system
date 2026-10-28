#!/usr/bin/env bash
# SessionStart hook: keeps core.hooksPath pointing at this skill's git-hooks folder, so commit trailers do not depend on someone
# running setup again after a fresh clone. Always exits 0, so it can never block a session.
set -uo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)" || exit 0
top="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0
top="$(cd "$top" && pwd -P)" || exit 0

expected="${here#"$top"/}/git-hooks"
[ "$expected" != "$here/git-hooks" ] || exit 0

ours() {
  case "${1%/}" in
    .claude/skills/sdlc-attribution/scripts/git-hooks | .agents/skills/sdlc-attribution/scripts/git-hooks) return 0 ;;
    *) return 1 ;;
  esac
}

# The value git would use, so a global or system setting counts. Only a local value is ever written.
current="$(git -C "$top" config --get core.hooksPath 2>/dev/null || true)"

# True when the folder `$1` holds both of the package's hooks, each calling the package's script on a line that is not a comment.
# Both must be in the same folder, because git runs the hooks of one folder.
wired_in() {
  local folder="$1" name text
  for name in prepare-commit-msg post-commit; do
    text="$(grep -v '^[[:space:]]*#' "$folder/$name" 2>/dev/null || true)"
    case "$text" in *"sdlc-attribution/scripts/git-hooks/$name"*) ;; *) return 1 ;; esac
  done
  return 0
}

# True when the tool that owns core.hooksPath calls both of the package's hooks. Only the folder git runs is read. Husky 9 sets
# core.hooksPath to `.husky/_`, a folder of shims, and keeps the hooks it runs in `.husky/`, so a path that ends in `_` also reads its parent.
wired() {
  local path
  case "$current" in /*) path="${current%/}" ;; *) path="$top/${current%/}" ;; esac
  wired_in "$path" && return 0
  [ "${path##*/}" = "_" ] && wired_in "${path%/*}" && return 0
  return 1
}

if [ -n "$current" ]; then
  if ! ours "$current" && ! wired; then
    echo "sdlc-attribution: core.hooksPath is '$current', set by another tool. Commit trailers are off until that tool's hook calls ${expected}/prepare-commit-msg and post-commit." >&2
  fi
  exit 0
fi

hooks_dir="$(git -C "$top" rev-parse --git-path hooks 2>/dev/null || true)"
case "$hooks_dir" in /*) ;; *) hooks_dir="$top/$hooks_dir" ;; esac
# The same rule as hooks_conflict() in sdlc_attribution_setup.py, and the tests run both on the same cases. With core.hooksPath unset,
# git runs the hooks in its own hooks folder, and setting the path would switch them all off. So any executable file there that is
# not a .sample blocks the path, and so does a file named like one of ours, however it is permissioned.
shopt -s dotglob nullglob
# A folder that can be entered but not listed gives a glob that finds nothing, so it counts as a conflict, as it does in setup.
if [ -d "$hooks_dir" ] && [ ! -r "$hooks_dir" ]; then
  echo "sdlc-attribution: leaving core.hooksPath unset because $hooks_dir cannot be read, so it is not known which hooks would be silenced. Commit trailers are off until the hooks prepare-commit-msg and post-commit in that folder call ${expected}/prepare-commit-msg and ${expected}/post-commit." >&2
  exit 0
fi
for hook in "$hooks_dir"/*; do
  [ -f "$hook" ] || continue
  name="${hook##*/}"
  case "$name" in
    prepare-commit-msg | post-commit) ;;
    *.sample) continue ;;
    *) [ -x "$hook" ] || continue ;;
  esac
  echo "sdlc-attribution: leaving core.hooksPath unset because $hook exists and would be silenced. Commit trailers are off until the hooks prepare-commit-msg and post-commit in that folder call ${expected}/prepare-commit-msg and ${expected}/post-commit." >&2
  exit 0
done

# Husky sets core.hooksPath itself when it installs, which would replace ours, so a .husky folder blocks the path too. So do the other tools that own
# git's hooks. The same list as HOOK_OWNERS in sdlc_attribution_setup.py.
if [ -d "$top/.husky" ]; then
  echo "sdlc-attribution: leaving core.hooksPath unset because $top/.husky exists, and husky sets core.hooksPath itself when it installs. Commit trailers are off until .husky/prepare-commit-msg and .husky/post-commit call ${expected}/prepare-commit-msg and ${expected}/post-commit." >&2
  exit 0
fi
for marker in lefthook.yml lefthook.yaml .lefthook.yml .lefthook.yaml .pre-commit-config.yaml .git-hooks; do
  if [ -e "$top/$marker" ]; then
    echo "sdlc-attribution: leaving core.hooksPath unset because $top/$marker exists, so another tool manages git's hooks. Commit trailers are off until that tool's prepare-commit-msg and post-commit hooks call ${expected}/prepare-commit-msg and ${expected}/post-commit." >&2
    exit 0
  fi
done
if grep -qs 'core.hooksPath' "$top/package.json"; then
  echo "sdlc-attribution: leaving core.hooksPath unset because $top/package.json sets core.hooksPath, so another tool manages git's hooks. Commit trailers are off until that tool's prepare-commit-msg and post-commit hooks call ${expected}/prepare-commit-msg and ${expected}/post-commit." >&2
  exit 0
fi

# git stores core.hooksPath once for every worktree. Writing it from one worktree also sets it in the others, and a worktree on a branch
# without the package would then point at a folder that does not exist, so git would run none of its hooks. So any linked worktree whose
# folder still exists blocks the write. The same rule as worktree_conflict() in sdlc_attribution_setup.py. The main checkout is not listed
# under worktrees/, so this holds from the main checkout and from a linked worktree alike.
common="$(git -C "$top" rev-parse --git-common-dir 2>/dev/null || true)"
case "$common" in /*) ;; *) common="$top/$common" ;; esac
for entry in "$common"/worktrees/*; do
  gitdir="$(cat "$entry/gitdir" 2>/dev/null || true)"
  [ -n "$gitdir" ] && [ -e "$gitdir" ] || continue
  echo "sdlc-attribution: leaving core.hooksPath unset because this repository has linked worktrees (for example $(dirname "$gitdir")), and core.hooksPath is stored once for all of them. Setting it here would switch off git's hooks in worktrees whose branch has no ${expected} folder. Commit trailers are off until the hooks prepare-commit-msg and post-commit call ${expected}/prepare-commit-msg and ${expected}/post-commit." >&2
  exit 0
done

git -C "$top" config --local core.hooksPath "$expected" || true
exit 0
