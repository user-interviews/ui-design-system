#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Set up bmad-loop in this repository without putting a personal path in a shared file.

`bmad-loop init` writes hook commands that contain the absolute path of the
local bmad-loop binary. By default it writes them into `.claude/settings.json`
(and `.codex/hooks.json` for Codex), which are tracked files every teammate
shares. A committed relay command makes every teammate's sessions try to run a
binary that is not on their machine. (The relay is the hook command that forwards
a coding session's events to the bmad-loop engine.)

This script wraps `bmad-loop init` the way scripts/bmad-update.py wraps BMAD's
installer: it chooses the parameters, runs the tool, then verifies the result.

  1. Add .claude/settings.local.json to .gitignore when git does not ignore it yet,
     then regenerate .bmad-loop/profiles/claude.toml from the installed packaged
     Claude profile, changing only the hook file to .claude/settings.local.json
     (gitignored, read by Claude Code natively). bmad-loop lets a project profile
     replace a packaged one by name, so `init` then writes the hooks there.
  2. Run `bmad-loop init` for the allowed coding CLIs only.
  3. Remove any relay command that an earlier run left in a tracked hook file.
     This step runs even when `init` fails, because `init` may have written one first.
  4. Apply the policy choices given on the command line (--stories, --model, --effort) to
     .bmad-loop/policy.toml. `init` writes a policy that reads sprint-status.yaml and uses the
     CLI's default model, so a run on a stories.yaml needs these.
  5. Report whether Claude Code trusts this directory. A run in an untrusted directory crashes
     at launch on Claude Code's trust dialog, which nothing in the run can answer. With
     --trust-claude the script records the trust itself. Pass that flag only after the user has
     said yes to trusting this directory.
  6. Run `bmad-loop validate` and print it.

Only `claude`, `copilot` and `codex` are allowed. Copilot's hook file is gitignored.
Codex has no gitignored hook file that both Codex and `bmad-loop` read:
`.codex/hooks.json` is tracked and holds this repo's attribution hook, and bmad-loop
only checks that file. So for `--cli codex` the relay stays in the working copy of
`.codex/hooks.json` and the script hides that file from git with `skip-worktree`.
`--release-codex` removes the relay and the flag, which is required before pulling
a change to that file. See "bmad-loop hook registration" in packages/sdlc-loop/README.md.

Run via `sdlc-bmad-loop-init.sh` beside this file (it checks for uv), or `uv run sdlc_bmad_loop_init.py`.
The module is also imported by scripts/bmad-update.py for its drift and leak checks.
"""
import argparse
import ast
import json
import os
import re
import shlex
import shutil
import subprocess
import sys
import tempfile
import time
import tomllib
from pathlib import Path

sys.dont_write_bytecode = True  # importing the patch script must not leave a __pycache__ in a skill folder that a package placed
sys.path.insert(0, str(Path(__file__).resolve().parent))  # bmad-update.py loads this file by path
import sdlc_bmad_loop_patches as tool_patches  # noqa: E402

def _repo_root() -> Path:
    """The repository that holds this script, wherever in it the script sits.

    It is git's top level for the script's own folder. Without git it is the nearest parent that holds `.git`.
    A skill folder outside any repository stops the run, because a root guessed from it would send the setup's writes to the wrong place.
    """
    here = Path(__file__).resolve().parent
    env = {k: v for k, v in os.environ.items() if k not in ("GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_COMMON_DIR", "GIT_PREFIX")}
    try:
        top = subprocess.run(["git", "-C", str(here), "rev-parse", "--show-toplevel"], capture_output=True, text=True, check=True, env=env).stdout.strip()
        if top:
            return Path(top).resolve()
    except (OSError, subprocess.CalledProcessError):
        pass
    for parent in (here, *here.parents):
        if (parent / ".git").exists():
            return parent
    print(f"error: {here} is not inside a git repository, so this script cannot find the repository it works on. Put this skill folder inside the repository.", file=sys.stderr)
    raise SystemExit(2)


REPO_ROOT = _repo_root()
# The wrapper and the patch script as a person types them from the repository root.
INIT_SH = Path(os.path.relpath(Path(__file__).resolve().with_name("sdlc-bmad-loop-init.sh"), REPO_ROOT)).as_posix()
PATCHES_PY = Path(os.path.relpath(Path(__file__).resolve().with_name("sdlc_bmad_loop_patches.py"), REPO_ROOT)).as_posix()

PROJECT_PROFILE = ".bmad-loop/profiles/claude.toml"
PACKAGED_HOOK_PATH = ".claude/settings.json"
LOCAL_HOOK_PATH = ".claude/settings.local.json"
COPILOT_HOOK_PATH = ".github/copilot/settings.json"
SHARED_HOOK_FILES = (".claude/settings.json", ".codex/hooks.json")
CODEX_HOOK_FILE = ".codex/hooks.json"
ALLOWED_CLIS = ("claude", "copilot", "codex")
ANSWERS_FILE = "_bmad/config.user.toml"  # one person's BMAD answers: name, language, skill level. Git must never hold it.
TEAM_CONFIG = "_bmad/config.toml"  # BMAD's shared config, committed; the three personal keys do not belong in it either
CUSTOM_DIR = "_bmad/custom"  # the team's BMAD overrides; a `*.user.toml` file here is personal
PERSONAL_KEYS = ("user_name", "communication_language", "user_skill_level")
PERSONAL_KEY_RE = re.compile(r"^\s*[\"']?(user_name|communication_language|user_skill_level)[\"']?\s*=", re.MULTILINE)
DEFAULT_LANGUAGE = "English"  # what BMAD's own installer uses when nobody answers
DEFAULT_SKILL_LEVEL = "intermediate"
# BMAD 6.12.1 and later write these placeholder answers into the committed team config so a skill renders on a fresh clone.
# They name nobody, so the check allows a key holding exactly its placeholder value, wherever the key sits in that file.
# Any other value is a personal answer.
SHIPPED_TEAM_DEFAULTS = {"user_name": "BMad", "communication_language": DEFAULT_LANGUAGE, "user_skill_level": DEFAULT_SKILL_LEVEL}
TOOL_URL = "bmad-loop[tui] @ git+https://github.com/bmad-code-org/bmad-loop.git"
UPDATE_SCRIPT = REPO_ROOT / "scripts" / "bmad-update.py"
# The repository's own tag table; scripts/bmad-update.py reads its `PINS` from it. It decides when it exists.
PINS_FILE = REPO_ROOT / "bmad-pins.json"
# A repository that has no scripts/bmad-update.py (one that received this wrapper from
# the sdlc-loop package) records the tag in this file instead: {"bmad-loop": "v0.12.0"}.
PIN_FILE = Path(__file__).with_name("bmad-loop-pin.json")
TAG_RE = re.compile(r"v?\d+\.\d+\.\d+")  # a release tag such as v0.12.0; matched with fullmatch, and no pre-release forms
COMMIT_RE = re.compile(r"[0-9a-f]{40}")  # a full git commit id in lower case; matched with fullmatch
NO_DAEMON_FLAG = "--no-daemon"

# A relay command is `<path>/bmad-loop relay <Event>`, with the path possibly quoted.
# bmad-loop registers its hook in one of two shapes. Builds before the v0.12.0 tag wrote `<path>/bmad-loop relay <Event>`, an
# absolute path to the developer's own binary. The v0.12.0 tag writes `python3 <path>/.bmad-loop/bmad_loop_hook.py <Event>`:
# `$CLAUDE_PROJECT_DIR/...` in Claude's file, which is portable, and the absolute path of the checkout in Codex's, which is not.
# RELAY_RE says the file has a bmad-loop hook of either shape (used for status). RELAY_LEAK_RE and RELAY_GREP say it has one that carries a
# personal path, which is the old `bmad-loop relay` form or an absolute script path; the portable `$CLAUDE_PROJECT_DIR` form is not a leak.
RELAY_RE = re.compile(r"""bmad-loop['"]?\s+relay\b|\.bmad-loop/bmad_loop_hook\.py(?![\w.])""")
# A path may hold spaces when it is quoted (`python3 '/Volumes/External Drive/repo/.bmad-loop/bmad_loop_hook.py' Stop`), so a quoted
# absolute path is matched up to the script name, and an unquoted one stops at the first space.
RELAY_LEAK_RE = re.compile(r"""bmad-loop['"]?\s+relay\b|(?:['"]/[^'"$]*|\s/[^\s'"$]+)/\.bmad-loop/bmad_loop_hook\.py(?![\w.])""")
# `git grep -E` patterns for the same relay command and for any personal home directory.
RELAY_GREP = r"""bmad-loop['"]? +relay|(["']/[^"'$]*| /[^ "'$]+)/\.bmad-loop/bmad_loop_hook\.py"""
HOOK_SCRIPT = ".bmad-loop/bmad_loop_hook.py"  # written by `bmad-loop init` from v0.12.0 on; it is per-checkout, so it stays out of git
HOME_PATH_GREP = r"(/Users|/home)/[A-Za-z0-9._-]+/"
# The portable form runs a script that is not tracked (see HOOK_SCRIPT), so a tracked hook that runs it is broken for everyone else.
PORTABLE_GREP = r"""CLAUDE_PROJECT_DIR\}?[\\"']*/\.bmad-loop/bmad_loop_hook\.py"""

# This text is fixed on purpose. `sync_profile` writes the file again whenever its text differs, so a header that named the running copy would make
# a run from the other copy rewrite the committed profile when a repository holds both a .claude and an .agents copy. It names no path for that reason.
PROFILE_HEADER = f"""\
# LOCAL OVERRIDE of bmad-loop's packaged claude profile (bmad_loop/data/profiles/claude.toml).
# The one difference is [hooks] config_path below. The packaged value is
# {PACKAGED_HOOK_PATH}, a tracked file shared by everyone. `bmad-loop init` writes
# an absolute path to the local binary into it, which breaks every teammate's
# sessions. {LOCAL_HOOK_PATH} is gitignored and read by Claude Code natively.
# A project profile replaces the packaged one by name and does not merge, so this
# file is a full copy. Do not edit it by hand. The sdlc-loop setup (sdlc-bmad-loop-init.sh) regenerates
# it from the installed packaged profile and changes only that one line.
# The packaged comments below still call {PACKAGED_HOOK_PATH} the hook file. In this override it is
# {LOCAL_HOOK_PATH}.
"""

# Variables that point git at a repository other than the one in the working directory. A tool run
# from inside a git hook inherits them, and every git command here would then act on the wrong repo.
GIT_CONTEXT_VARS = ("GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_COMMON_DIR", "GIT_PREFIX",
                    "GIT_OBJECT_DIRECTORY", "GIT_NAMESPACE")


class GitError(RuntimeError):
    """A git command failed, timed out or could not start."""


class HookFileError(ValueError):
    """A hook file that is not a JSON object."""


# ---------------------------------------------------------------- git

def git(root: Path, *args: str, check: bool = False, timeout: int = 30) -> subprocess.CompletedProcess:
    """Run git in `root` with the repository-selecting variables removed and a timeout."""
    env = {k: v for k, v in os.environ.items() if k not in GIT_CONTEXT_VARS}
    # A user's own `color.grep = always` beats `color.ui = never`, and would put escape codes in file names.
    no_color = [a for key in ("ui", "grep", "diff", "status", "branch") for a in ("-c", f"color.{key}=never")]
    try:
        result = subprocess.run(
            ["git", "--no-pager", *no_color, *args],
            cwd=root, capture_output=True, text=True, errors="replace", timeout=timeout, env=env,
        )
    except (OSError, subprocess.TimeoutExpired) as e:
        raise GitError(f"git {' '.join(args)} could not run in {root}: {e}") from e
    if check and result.returncode != 0:
        raise GitError(f"git {' '.join(args)} failed in {root}: {result.stderr.strip() or f'exit {result.returncode}'}")
    return result


def is_ignored(root: Path, rel: str) -> bool:
    result = git(root, "check-ignore", "-q", rel)
    if result.returncode > 1:
        raise GitError(f"git check-ignore failed for {rel}: {result.stderr.strip()}")
    return result.returncode == 0


def is_ignored_by_repo(root: Path, rel: str) -> bool:
    """True when a .gitignore file in the repository ignores `rel`.

    A developer's global excludes file and .git/info/exclude protect one machine, not the people who clone the repo.
    """
    result = git(root, "-c", "core.excludesFile=", "check-ignore", "-v", "--", rel)
    if result.returncode > 1:
        raise GitError(f"git check-ignore failed for {rel}: {result.stderr.strip()}")
    if result.returncode == 1:
        return False
    source, _, rest = result.stdout.partition("\t")[0].partition(":")
    pattern = rest.partition(":")[2]
    return Path(source).name == ".gitignore" and not pattern.startswith("!")


def is_tracked(root: Path, rel: str) -> bool:
    result = git(root, "ls-files", "--error-unmatch", "--", rel)
    if result.returncode > 1:
        raise GitError(f"git ls-files failed for {rel}: {result.stderr.strip()}")
    return result.returncode == 0


def tracked_relay_files(root: Path = REPO_ROOT) -> list[str]:
    """Shared hook files whose git index content holds a relay command or a personal home path.

    `git grep --cached` reads the index, so a file hidden with skip-worktree is still checked
    against what would be committed. A git failure raises GitError, because a guard that cannot
    run must not look like a guard that found nothing.
    """
    patterns = [RELAY_GREP, HOME_PATH_GREP] + ([] if _hook_script_is_shared(root) else [PORTABLE_GREP])
    found = git(root, "grep", "--cached", "-l", "-z", "-E", *[a for p in patterns for a in ("-e", p)], "--", *SHARED_HOOK_FILES)
    if found.returncode > 1:
        raise GitError(f"git grep failed in {root}: {found.stderr.strip() or f'exit {found.returncode}'}")
    return [f for f in found.stdout.split("\0") if f]


def skip_worktree_files(root: Path = REPO_ROOT) -> list[str]:
    """Shared hook files currently hidden from git with skip-worktree."""
    out = git(root, "ls-files", "-v", "--", *SHARED_HOOK_FILES, check=True).stdout
    return [line[2:] for line in out.splitlines() if line.startswith("S ")]


def _tracks_codex_hooks(root: Path) -> bool:
    """True if `root`'s index has .codex/hooks.json (older branches may not)."""
    return git(root, "ls-files", "--error-unmatch", CODEX_HOOK_FILE).returncode == 0


def _worktree_blocks(root: Path) -> list[tuple[Path, set[str]]]:
    out = git(root, "worktree", "list", "--porcelain", check=True).stdout
    blocks = []
    for block in out.split("\n\n"):
        lines = block.splitlines()
        if lines and lines[0].startswith("worktree "):
            blocks.append((Path(lines[0][len("worktree "):]), {l.split(" ")[0] for l in lines[1:]}))
    return blocks


def main_checkout(root: Path = REPO_ROOT) -> Path:
    """The main checkout of the repository that `root` belongs to (`root` itself if it is the main one).

    Codex resolves a linked git worktree's project layer to the main checkout, so
    it reads the main checkout's .codex/hooks.json and ignores the worktree's own.
    `git worktree list` names the main checkout first, whatever the layout of its git directory.
    """
    git_dir = git(root, "rev-parse", "--path-format=absolute", "--git-dir")
    common_dir = git(root, "rev-parse", "--path-format=absolute", "--git-common-dir")
    toplevel = git(root, "rev-parse", "--show-toplevel")
    if git_dir.returncode == 0 and git_dir.stdout == common_dir.stdout and toplevel.returncode == 0:
        return Path(toplevel.stdout.strip())  # `root` is the main checkout; the list below names a separate git dir instead
    blocks = _worktree_blocks(root)
    if not blocks:
        raise GitError(f"git lists no worktrees for {root}")
    path, flags = blocks[0]
    if "bare" in flags:
        raise GitError("this repository is bare, so it has no main checkout")
    return path


def list_worktrees(root: Path = REPO_ROOT) -> list[Path]:
    """Every usable checkout of the repository, main checkout first. Locked worktrees are included."""
    return [p for p, flags in _worktree_blocks(root) if "bare" not in flags and "prunable" not in flags and p.is_dir()]


def skipped_worktrees(root: Path = REPO_ROOT) -> list[str]:
    """Worktrees git lists that this tool cannot use, with the reason, so a leftover relay is not a surprise."""
    return [f"{p}: {'prunable' if 'prunable' in flags else 'directory missing'}"
            for p, flags in _worktree_blocks(root) if "bare" not in flags and ("prunable" in flags or not p.is_dir())]


def has_loop_setup(root: Path) -> bool:
    """True if this checkout's branch already contains the project profile (so setup leaves the tree clean)."""
    return git(root, "ls-files", "--error-unmatch", PROJECT_PROFILE).returncode == 0


# ---------------------------------------------------------------- the packaged profile

def find_packaged_profile() -> Path | None:
    """The claude profile shipped inside the installed bmad-loop tool, or None.

    It asks the tool's own interpreter where the package lives, which holds for any install layout.
    A glob over the usual virtualenv layouts is the fallback.
    """
    tool = shutil.which("bmad-loop")
    if tool is None:
        return None
    resolved = Path(tool).resolve()
    python = resolved.parent / "python"
    if python.exists():
        try:
            out = subprocess.run(
                [str(python), "-c", "import bmad_loop, pathlib; print(pathlib.Path(bmad_loop.__file__).parent / 'data' / 'profiles' / 'claude.toml')"],
                capture_output=True, text=True, timeout=20,
            )
        except (OSError, subprocess.TimeoutExpired):
            out = None
        if out is not None and out.returncode == 0 and Path(out.stdout.strip()).is_file():
            return Path(out.stdout.strip())
    for pattern in ("lib/python*/site-packages/bmad_loop/data/profiles/claude.toml",
                    "lib64/python*/site-packages/bmad_loop/data/profiles/claude.toml",
                    "Lib/site-packages/bmad_loop/data/profiles/claude.toml"):
        hits = sorted(resolved.parent.parent.glob(pattern))
        if hits:
            return hits[-1]
    return None


def expected_profile(packaged_text: str) -> str:
    """The project profile: a header plus the packaged profile with one line changed."""
    anchor = f'config_path = "{PACKAGED_HOOK_PATH}"'
    if anchor not in packaged_text:
        raise ValueError(
            f"the packaged claude profile has no `{anchor}` line; bmad-loop changed its "
            "profile layout and this script needs updating"
        )
    return PROFILE_HEADER + packaged_text.replace(anchor, f'config_path = "{LOCAL_HOOK_PATH}"')


def profile_drift(root: Path = REPO_ROOT) -> str | None:
    """A message when the project profile is missing, stale or could not be checked, else None.

    The comparison parses both files as TOML, so a comment-only change in a bmad-loop release does
    not count as drift. Returns None when bmad-loop is not installed, since there is nothing to compare with.
    """
    override = root / PROJECT_PROFILE
    if not override.is_file():
        return (
            f"{PROJECT_PROFILE} is missing, so `bmad-loop init` would write a personal path "
            f"into the tracked .claude/settings.json. Run {INIT_SH}."
        )
    if shutil.which("bmad-loop") is None:
        return None
    packaged = find_packaged_profile()
    if packaged is None:
        return "the installed bmad-loop's packaged claude profile could not be found, so the committed profile was not checked for staleness"
    try:
        expected = tomllib.loads(expected_profile(packaged.read_text()))
        actual = tomllib.loads(override.read_text())
    except (ValueError, OSError) as e:
        return f"{PROJECT_PROFILE} could not be compared with the packaged profile: {e}"
    if expected == actual:
        return None
    return (
        f"{PROJECT_PROFILE} differs from the installed bmad-loop's packaged claude profile, "
        f"so it is stale or hand-edited. Run {INIT_SH} to regenerate it."
    )


def sync_profile(root: Path = REPO_ROOT) -> str:
    """Write the project profile. Returns "created", "updated" or "unchanged"."""
    packaged = find_packaged_profile()
    if packaged is None:
        raise RuntimeError("cannot find the installed bmad-loop's packaged claude profile")
    wanted = expected_profile(packaged.read_text())
    target = root / PROJECT_PROFILE
    if target.is_file():
        if target.read_text() == wanted:
            return "unchanged"
        outcome = "updated"
    else:
        outcome = "created"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(wanted)
    return outcome


# ---------------------------------------------------------------- hook files

def _basename(token: str) -> str:
    """The last segment of a command token, found by splitting the string. Nothing on disk is read or opened.

    Empty and `.` segments are dropped, and a backslash is an ordinary character, the way `PurePosixPath(token).name` treats them.
    """
    parts = [s for s in token.split("/") if s not in ("", ".")]
    return parts[-1] if parts else ""


def _checkout_folder(script: str) -> str:
    """The folder above `.bmad-loop/` in an absolute hook script path, found by splitting the string. Nothing on disk is read.

    Empty and `.` segments are dropped and a leading `//` is kept, the way `pathlib` normalizes a POSIX path.
    """
    parts = [s for s in script[: -len("/" + HOOK_SCRIPT)].split("/") if s not in ("", ".")]
    lead = "//" if script.startswith("//") and not script.startswith("///") else "/"
    return lead + "/".join(parts)


def is_relay_command(command: object) -> bool:
    """True for a hook command that carries a personal path: `<path>/bmad-loop relay <Event>`, or the hook script run by its absolute path.

    The portable `python3 "$CLAUDE_PROJECT_DIR"/.bmad-loop/bmad_loop_hook.py <Event>` is not one, and neither is a command that only
    mentions the script (`cat`, `py_compile`) or a similarly named file.
    """
    if not isinstance(command, str):
        return False
    try:
        tokens = shlex.split(command)
    except ValueError:
        return bool(RELAY_LEAK_RE.search(command))
    if any(_basename(t) == "bmad-loop" and i + 1 < len(tokens) and tokens[i + 1] == "relay" for i, t in enumerate(tokens)):
        return True
    start = 1 if tokens and _basename(tokens[0]).startswith("python") else 0
    script = tokens[start] if len(tokens) > start else ""
    return script.startswith("/") and script.replace("\\", "/").endswith("/.bmad-loop/bmad_loop_hook.py")


def _is_relay(handler: object) -> bool:
    return isinstance(handler, dict) and is_relay_command(handler.get("command"))


def is_portable_hook_command(command: object) -> bool:
    """True for `python3 "$CLAUDE_PROJECT_DIR"/.bmad-loop/bmad_loop_hook.py <Event>`, the form that carries no personal path.

    It is safe in a shared file only when the script it runs is shared too. `bmad-loop init` writes the script per checkout,
    and this wrapper keeps it out of git, so a tracked hook that runs it fails on a fresh clone.
    """
    if not isinstance(command, str):
        return False
    try:
        tokens = shlex.split(command)
    except ValueError:
        return False
    start = 1 if tokens and _basename(tokens[0]).startswith("python") else 0
    script = tokens[start] if len(tokens) > start else ""
    return script.startswith(("$CLAUDE_PROJECT_DIR/", "${CLAUDE_PROJECT_DIR}/")) and script.endswith("/.bmad-loop/bmad_loop_hook.py")


def _hook_script_is_shared(root: Path) -> bool:
    """True when `root` tracks .bmad-loop/bmad_loop_hook.py. A git failure counts as shared, so nothing is removed on a guess."""
    try:
        return is_tracked(root, HOOK_SCRIPT)
    except GitError:
        return True


def read_hook_json(path: Path) -> dict:
    """A hook file's content as a dict. Raises HookFileError when it is not a JSON object."""
    try:
        config = json.loads(path.read_text())
    except (OSError, json.JSONDecodeError) as e:
        raise HookFileError(f"{path} is not readable JSON ({e})") from e
    if not isinstance(config, dict):
        raise HookFileError(f"{path} is JSON but not an object")
    return config


def dump_like(original: str, config: dict) -> str:
    """Serialize `config` with the original file's indent and final newline, and without escaping non-ASCII."""
    match = re.search(r"^(\t+| +)\S", original, re.M)
    text = json.dumps(config, indent=match.group(1) if match else 2, ensure_ascii=False)
    return text + ("\n" if original.endswith("\n") or not original else "")


def write_hook_json(path: Path, config: dict) -> None:
    """Replace a hook file with the edited config, keeping its formatting, its mode and a symlink. The write is atomic."""
    _replace_text(path, dump_like(path.read_text(), config))


def strip_relay(config: dict, portable: bool = False) -> bool:
    """Remove bmad-loop relay hook commands from a parsed Claude or Codex hook config.

    With `portable`, a hook that runs the script through `$CLAUDE_PROJECT_DIR` is removed too: it has no personal path,
    but its script is not shared, so it fails on a fresh clone.
    Handlers that are not relay commands are kept, and so is any event that still
    has one. Returns True if anything was removed.
    """
    hooks = config.get("hooks")
    if not isinstance(hooks, dict):
        return False

    def drop(handler: object) -> bool:
        return _is_relay(handler) or (portable and isinstance(handler, dict) and is_portable_hook_command(handler.get("command")))

    changed = False
    for event in list(hooks):
        entries = hooks[event]
        if not isinstance(entries, list):
            continue
        kept = []
        for entry in entries:
            handlers = entry.get("hooks") if isinstance(entry, dict) else None
            if isinstance(handlers, list) and any(drop(h) for h in handlers):
                changed = True
                remaining = [h for h in handlers if not drop(h)]
                if not remaining:
                    continue
                entry = {**entry, "hooks": remaining}
            kept.append(entry)
        if kept:
            hooks[event] = kept
        else:
            del hooks[event]
    return changed


def merge_relay(source: dict, target: dict) -> bool:
    """Copy the relay hook handlers of `source` into `target`, replacing any relay already there.

    Returns True if `target` changed.
    """
    before = json.dumps(target, sort_keys=True)
    strip_relay(target)
    source_hooks = source.get("hooks")
    for event, entries in (source_hooks.items() if isinstance(source_hooks, dict) else []):
        if not isinstance(entries, list):
            continue
        for entry in entries:
            handlers = entry.get("hooks") if isinstance(entry, dict) else None
            relays = [h for h in handlers if _is_relay(h)] if isinstance(handlers, list) else []
            if relays:
                shell = {k: v for k, v in entry.items() if k != "hooks"}
                if not isinstance(target.get("hooks"), dict):
                    target["hooks"] = {}
                events = target["hooks"].setdefault(event, [])
                if isinstance(events, list):
                    events.append({**shell, "hooks": relays})
    return json.dumps(target, sort_keys=True) != before


def merge_blocker(source: dict, target: dict) -> str:
    """Why `merge_relay` could not put the relay into `target` without dropping it or overwriting something, or "" if it can."""
    hooks = target.get("hooks")
    if hooks is not None and not isinstance(hooks, dict):
        return '"hooks" is not an object'
    source_hooks = source.get("hooks")
    for event, entries in (source_hooks.items() if isinstance(source_hooks, dict) else []):
        has_relay = isinstance(entries, list) and any(
            isinstance(e, dict) and isinstance(e.get("hooks"), list) and any(_is_relay(h) for h in e["hooks"]) for e in entries)
        if has_relay and isinstance(hooks, dict) and event in hooks and not isinstance(hooks[event], list):
            return f'the "{event}" hooks are not a list'
    return ""


def clean_shared_files(root: Path = REPO_ROOT, keep: tuple[str, ...] = ()) -> tuple[list[str], list[str]]:
    """Strip relay commands from the working copies of the shared hook files.

    Files named in `keep` are left alone. Returns the files changed and a list of problems.
    A file that is not valid JSON is left as it is and reported, because it may still hold a relay.
    """
    changed, problems = [], []
    portable = not _hook_script_is_shared(root)  # a portable hook is kept only when the script it runs is tracked
    for rel in SHARED_HOOK_FILES:
        if rel in keep or not (root / rel).is_file():
            continue
        path = root / rel
        try:
            config = read_hook_json(path)
        except HookFileError as e:
            if RELAY_LEAK_RE.search(path.read_text(errors="replace")):
                problems.append(f"{e}, and it appears to hold a relay command; fix it by hand")
            continue
        if strip_relay(config, portable=portable):
            write_hook_json(path, config)
            changed.append(rel)
    return changed, problems


# ---------------------------------------------------------------- Codex: hide and release the relay

def _edits_besides_relay(root: Path, working: dict) -> str:
    """"" when `working` is the committed .codex/hooks.json plus relay commands, otherwise why it differs."""
    committed = git(root, "show", f"HEAD:{CODEX_HOOK_FILE}")
    if committed.returncode != 0:  # a branch with no commit yet, or a file that was only staged
        committed = git(root, "show", f":{CODEX_HOOK_FILE}")
    if committed.returncode != 0:
        return "could not be compared with the committed version"
    try:
        expected = json.loads(committed.stdout)
    except json.JSONDecodeError:
        return "could not be compared with the committed version, which is not valid JSON"
    if not isinstance(expected, dict):
        return "could not be compared with the committed version, which is not a JSON object"
    stripped = json.loads(json.dumps(working))
    for config in (stripped, expected):
        strip_relay(config)  # a relay that was committed by mistake is not an edit of the developer's
        if config.get("hooks") == {}:
            del config["hooks"]  # `init` may add an empty hooks table to a file that had none
    return "" if stripped == expected else "differs from the committed version by more than the relay command"


def _holds_no_hooks(path: Path) -> bool:
    """True for a hook file that is valid JSON with no hooks left in it."""
    try:
        config = read_hook_json(path)
    except HookFileError:
        return False
    return not config.get("hooks") and set(config) <= {"hooks"}


def _relay_script_paths(config: dict) -> list[str]:
    """The checkout folders whose `.bmad-loop/bmad_loop_hook.py` the relay handlers of a hook config run (the v0.12.0 shape)."""
    paths = []
    hooks = config.get("hooks")
    for entries in (hooks.values() if isinstance(hooks, dict) else []):
        for entry in (entries if isinstance(entries, list) else []):
            for handler in (entry.get("hooks") if isinstance(entry, dict) and isinstance(entry.get("hooks"), list) else []):
                if not (isinstance(handler, dict) and isinstance(handler.get("command"), str) and _is_relay(handler)):
                    continue
                try:
                    tokens = shlex.split(handler["command"])
                except ValueError:
                    continue
                paths += [_checkout_folder(t) for t in tokens if t.startswith("/") and t.endswith("/" + HOOK_SCRIPT)]
    return paths


def _hide_one(root: Path) -> str:
    if not _tracks_codex_hooks(root):
        return "not tracked on this branch, nothing to hide"
    if CODEX_HOOK_FILE in skip_worktree_files(root):
        return "already hidden"
    git(root, "update-index", "--skip-worktree", CODEX_HOOK_FILE, check=True)
    return "hidden"


def hide_codex_hooks(root: Path = REPO_ROOT) -> list[str]:
    """The lines of `hide_codex_hooks_checked`, for callers that do not need its outcome."""
    return hide_codex_hooks_checked(root)[0]


def hide_codex_hooks_checked(root: Path = REPO_ROOT) -> tuple[list[str], str]:
    """Keep the Codex relay out of git, in this checkout and in the main checkout Codex reads.

    The relay is in `root`'s .codex/hooks.json (bmad-loop wrote it there and checks it
    there). When `root` is a linked worktree, it is also copied into the main checkout's
    file, because that is the one Codex loads. Both files are hidden with skip-worktree.
    Everything is checked before anything is changed, so a problem leaves both checkouts as they were.
    Returns one line per file touched and an outcome: "none" when `root` has no relay, "ok" when
    every file was hidden or is gitignored, "not-hidden" when a check failed and the relay is still
    visible in the working copy, "untracked" when the file is neither tracked nor ignored, so skip-worktree
    cannot hide it and `git add` would stage the relay, and "partial" when `root` was hidden but the main
    checkout has no file for Codex to load.
    Hiding is refused when the file differs from the committed one by more than the relay command,
    because skip-worktree would hide those edits from `git status` as well.
    """
    path = root / CODEX_HOOK_FILE
    if not path.is_file() or not RELAY_LEAK_RE.search(path.read_text(errors="replace")):
        return [], "none"
    try:
        source = read_hook_json(path)
    except HookFileError as e:
        return [f"{e}; nothing was hidden"], "not-hidden"
    root_ignored_only = False
    if not _tracks_codex_hooks(root):
        if not is_ignored(root, CODEX_HOOK_FILE):
            return [f"{root}: {CODEX_HOOK_FILE} is not tracked on this branch and not gitignored, so it cannot be hidden and `git add` would stage the relay"], "untracked"
        root_ignored_only = True
    else:
        edits = _edits_besides_relay(root, source)
        if edits:
            return [f"{root}: {CODEX_HOOK_FILE} {edits}, so hiding it would hide those edits from `git status`. "
                    "Commit or stash them (if the file is already hidden, run --release-codex first to see them), then run this again. Nothing was hidden."], "not-hidden"
    main = main_checkout(root)
    target_config, target = None, main / CODEX_HOOK_FILE
    lines: list[str] = []
    if main.resolve() != root.resolve():
        if not target.is_file():
            lines.append(f"{main}: has no {CODEX_HOOK_FILE}, so Codex will not load the relay")
        else:
            if not _tracks_codex_hooks(main) and not is_ignored(main, CODEX_HOOK_FILE):
                return [f"{main}: {CODEX_HOOK_FILE} is not tracked and not gitignored, so the relay copied into it would be staged by `git add`. "
                        "Commit it or add it to .gitignore, then run this again. Nothing was hidden."], "untracked"
            if CODEX_HOOK_FILE not in skip_worktree_files(main) and git(main, "diff", "--quiet", "--", CODEX_HOOK_FILE).returncode != 0:
                return [f"{main}: {CODEX_HOOK_FILE} has uncommitted changes. Commit or restore them, then run this again. Nothing was hidden."], "not-hidden"
            try:
                target_config = read_hook_json(target)
            except HookFileError as e:
                return [f"{e}; nothing was hidden"], "not-hidden"
            blocker = merge_blocker(source, target_config)
            if blocker:
                return [f"{target}: {blocker}, so the relay cannot be added to it. Nothing was hidden."], "not-hidden"
    result = [f"{root}: {CODEX_HOOK_FILE} is not tracked and is gitignored, so the relay stays out of git" if root_ignored_only else f"{root}: {_hide_one(root)}"]
    if target_config is not None:
        if merge_relay(source, target_config):
            write_hook_json(target, target_config)
        result.append(f"{main}: {_hide_one(main)} (the file Codex loads for a linked worktree)")
        inside = [p for p in _relay_script_paths(source) if p == str(root.resolve()) or p.startswith(str(root.resolve()) + os.sep)]
        if inside:
            result.append(f"WARNING: the relay now in {main}'s file runs the script in {inside[0]}, inside the worktree, so it stops working "
                          "when that worktree is removed. Run the Codex setup from the main checkout to avoid this.")
    return result + lines, "partial" if lines else "ok"


def _release_one(root: Path) -> str:
    path = root / CODEX_HOOK_FILE
    flagged = _tracks_codex_hooks(root) and CODEX_HOOK_FILE in skip_worktree_files(root)
    removed = False
    if path.is_file():
        try:
            config = read_hook_json(path)
        except HookFileError as e:
            return f"skipped: {e}. The relay and the skip-worktree flag were left as they are."
        if strip_relay(config):
            write_hook_json(path, config)
            removed = True
    if flagged and not removed:
        return "left as it is: skip-worktree is set but no relay command was found, so this tool did not set it"
    if flagged:
        git(root, "update-index", "--no-skip-worktree", CODEX_HOOK_FILE, check=True)
    return ("removed the relay command, " if removed else "no relay command found, ") + ("cleared skip-worktree" if flagged else "skip-worktree was not set")


def release_failed(lines: list[str]) -> bool:
    """True when `release_codex_hooks` reported a checkout it could not release, so the relay is still in place."""
    return any(": error: " in line or ": skipped: " in line or line.endswith("(not released)") for line in lines)


def release_codex_hooks(root: Path = REPO_ROOT) -> list[str]:
    """Undo hide_codex_hooks in every worktree of the repository: remove the relay, clear the flag.

    The main checkout's file is shared by all worktrees, so releasing one releases for all.
    A failure in one worktree is reported and the others are still released.
    """
    lines = []
    for r in list_worktrees(root):
        try:
            lines.append(f"{r}: {_release_one(r)}")
        except (GitError, OSError) as e:
            lines.append(f"{r}: error: {e}")
    return lines + [f"{s} (not released)" for s in skipped_worktrees(root)]


# ---------------------------------------------------------------- runs, policy, daemon

def _pid_is_bmad_loop(pid: int) -> bool:
    """False when the process is gone or is clearly something else (a recycled pid). True when unsure."""
    try:
        out = subprocess.run(["ps", "-p", str(pid), "-o", "command="], capture_output=True, text=True, timeout=10)
    except (OSError, subprocess.TimeoutExpired):
        return True
    command = out.stdout.strip()
    return out.returncode == 0 and bool(command) and ("bmad-loop" in command or "bmad_loop" in command)


def active_runs(root: Path) -> list[str]:
    """Run ids in `root` whose engine process is still alive (from <run>/engine.pid).

    bmad-loop writes `<pid>`, or `<pid> <identity>` when the platform can give a process identity (always on Linux),
    so only the first token is the pid.
    """
    alive = []
    for pidfile in sorted((root / ".bmad-loop/runs").glob("*/engine.pid")):
        try:
            pid = int(pidfile.read_text().split()[0])
            if pid <= 0:
                continue
            os.kill(pid, 0)
        except (ValueError, IndexError, OverflowError, ProcessLookupError, OSError) as e:
            if not isinstance(e, PermissionError):
                continue
        if _pid_is_bmad_loop(pid):
            alive.append(pidfile.parent.name)
    return alive


def _adapter_table(root: Path) -> dict | None:
    """The [adapter] table of `root`'s policy.toml, {} when there is none, None when the file is invalid."""
    path = root / ".bmad-loop/policy.toml"
    if not path.is_file():
        return {}
    try:
        adapter = tomllib.loads(path.read_text()).get("adapter", {})
    except (OSError, tomllib.TOMLDecodeError):
        return None
    return adapter if isinstance(adapter, dict) else {}


def policy_adapters(root: Path) -> str:
    """The CLI names this checkout's policy.toml assigns to each stage, or why it cannot say."""
    if not (root / ".bmad-loop/policy.toml").is_file():
        return "no policy"
    adapter = _adapter_table(root)
    if adapter is None:
        return "invalid policy.toml"
    base = adapter.get("name", "claude")
    return "/".join(f"{role}={adapter.get(role, {}).get('name', base) if isinstance(adapter.get(role), dict) else base}"
                    for role in ("dev", "review", "triage"))


def no_daemon_message(stages: list[str]) -> str:
    return (
        f"policy stage(s) {', '.join(stages)} run Codex without {NO_DAEMON_FLAG} in extra_args. Interactive Codex "
        "then attaches to the shared background daemon, its hooks run without the loop's environment, and the "
        'engine never sees the session end. Set extra_args = ["--dangerously-bypass-approvals-and-sandbox", '
        f'"{NO_DAEMON_FLAG}"] on that stage in .bmad-loop/policy.toml.'
    )


def codex_daemon_running() -> bool:
    """True if Codex's shared background app-server daemon may be running. True when `ps` cannot say."""
    try:
        out = subprocess.run(["ps", "-axo", "command="], capture_output=True, text=True, timeout=10).stdout
    except (OSError, subprocess.TimeoutExpired):
        return True
    return any("app-server" in line and "--managed-daemon" in line for line in out.splitlines())


def codex_stages_without_no_daemon(root: Path) -> list[str]:
    """Stages of `root`'s policy that run Codex without `--no-daemon` in extra_args.

    Interactive Codex attaches to the shared background daemon when one is running. Hooks
    then run in the daemon's environment, which lacks BMAD_LOOP_*, so the relay writes
    nothing and the engine never sees the session end. Tested with Codex 0.159.2.
    """
    adapter = _adapter_table(root)
    if not adapter:
        return []
    base = adapter.get("name", "claude")
    missing = []
    for role in ("dev", "review", "triage"):
        stage = adapter.get(role) if isinstance(adapter.get(role), dict) else {}
        name = stage.get("name", base)
        if name != "codex":
            continue
        extra = stage["extra_args"] if "extra_args" in stage else (adapter.get("extra_args") if name == base else None)
        if not (isinstance(extra, list) and NO_DAEMON_FLAG in extra):
            missing.append(role)
    return missing


def status_lines(root: Path = REPO_ROOT) -> list[str]:
    """One summary line per checkout: branch, setup state, hooks, adapters, active runs."""
    lines = []
    for path in list_worktrees(root):
        try:
            branch = git(path, "branch", "--show-current").stdout.strip() or "(detached)"
            local, codex_file = path / LOCAL_HOOK_PATH, path / CODEX_HOOK_FILE
            claude = local.is_file() and bool(RELAY_RE.search(local.read_text(errors="replace")))
            codex = codex_file.is_file() and bool(RELAY_RE.search(codex_file.read_text(errors="replace")))
            runs, needs = active_runs(path), codex_stages_without_no_daemon(path)
            lines.append(
                f"{path.name} [{branch}] setup={'yes' if has_loop_setup(path) else 'NO (branch lacks the profile)'}"
                f" claude-hooks={'yes' if claude else 'no'} claude-trust={claude_trust(path)} codex-relay={'yes' if codex else 'no'}"
                + (f" bmad-answers={'yes' if os.path.lexists(path / ANSWERS_FILE) and answers_file_problem(path / ANSWERS_FILE) is None else 'NO'}" if (path / "_bmad").is_dir() else "")
                + f" adapters={policy_adapters(path)}"
                + (f" ACTIVE-RUN={','.join(runs)}" if runs else "")
                + (f" NEEDS-NO-DAEMON={','.join(needs)}" if needs else "")
            )
        except (GitError, OSError) as e:
            lines.append(f"{path.name} unreadable: {e}")
    return lines + [f"skipped {s}" for s in skipped_worktrees(root)]


# ---------------------------------------------------------------- the pinned CLI version

# The one non-literal `PINS` the source reader accepts: scripts/bmad-update.py loads the table from bmad-pins.json.
PINS_FROM_FILE_SOURCE = "dict(_PINS_DATA['modules'])"  # ast.unparse prints this with single quotes, whatever quotes the source file uses


class PinError(ValueError):
    """`PINS` names bmad-loop but the entry cannot be read as a release tag."""


def pinned_tool_tag_from_file(pin_file: Path) -> str | None:
    """The bmad-loop tag in a `bmad-loop-pin.json` file, for a repository that has no scripts/bmad-update.py.

    None when the file has no bmad-loop entry. Raises PinError when the file exists but cannot be read as
    `{"bmad-loop": "<release tag>"}`, for the same reason `pinned_tool_tag` does.
    """
    try:
        data = json.loads(pin_file.read_text())
    except (OSError, ValueError) as e:
        raise PinError(f"{pin_file.name} could not be read, so the bmad-loop tag could not be read ({e})") from e
    if not isinstance(data, dict):
        raise PinError(f"{pin_file.name} is not a JSON object")
    if "bmad-loop" not in data:
        return None
    tag = data["bmad-loop"]
    if not isinstance(tag, str) or not TAG_RE.fullmatch(tag):
        raise PinError(f"{pin_file.name} holds {tag!r} for bmad-loop, which is not a release tag such as v0.12.0 (pre-release tags are not supported)")
    return tag


def pinned_tool_tag(script: Path | None = None, pin_file: Path = PIN_FILE, pins_file: Path | None = None) -> str | None:
    """The tag this repository pins for bmad-loop. The first source that exists decides:

    1. `pins_file` (bmad-pins.json at the repository root, or beside `script` when `script` is given), whose `modules` table holds the tag.
    2. The `PINS` literal in `script` (scripts/bmad-update.py), read from the source without running it. None means there is no script.
    3. `pin_file` (bmad-loop-pin.json beside this script), which a repository without scripts/bmad-update.py gets from the package.

    None when none of them names bmad-loop. `pins_file` defaults to the repository's own file when `script` is None,
    and to the one beside `script` otherwise, so a script outside this repository is never overruled by this repository's pins.

    The CLI and the bmad-loop skills must come from the same tag, and `bmad-update` installs the
    skills at that tag, so the CLI is installed at it too. None when there is no such file, no `PINS`,
    or no bmad-loop entry. Raises PinError when `PINS` or its bmad-loop entry exists but cannot be read,
    because treating that as "no pin" would install an unpinned CLI and force its skills over the pinned ones.

    A repository whose scripts/bmad-update.py is missing, or has no `PINS` or no bmad-loop entry, reads the tag
    from `pin_file` (bmad-loop-pin.json) instead.
    """
    def from_pin_file() -> str | None:
        return pinned_tool_tag_from_file(pin_file) if pin_file.exists() else None

    if pins_file is None:
        pins_file = PINS_FILE if script is None else script.resolve().parent.parent / "bmad-pins.json"
    if pins_file.exists():
        return pinned_tool_tag_from_pins_file(pins_file)
    if script is None or not script.exists():
        return from_pin_file()
    try:
        tree = ast.parse(script.read_text())
    except (OSError, SyntaxError, ValueError) as e:
        raise PinError(f"{script.name} could not be read, so its PINS could not be read ({e})") from e
    for node in tree.body:
        if isinstance(node, ast.Assign):
            targets = node.targets
        elif isinstance(node, ast.AnnAssign):
            targets = [node.target]
        else:
            continue
        if any(isinstance(t, ast.Name) and t.id == "PINS" for t in targets):
            if ast.unparse(node.value) == PINS_FROM_FILE_SOURCE:
                return pinned_tool_tag_from_pins_file(script.resolve().parent.parent / "bmad-pins.json")
            try:
                value = ast.literal_eval(node.value)
            except (ValueError, SyntaxError) as e:
                raise PinError(f"PINS in {script.name} is not a plain dict literal, so the bmad-loop tag could not be read") from e
            if not isinstance(value, dict):
                raise PinError(f"PINS in {script.name} is not a dict")
            if "bmad-loop" not in value:
                return from_pin_file()
            tag = value["bmad-loop"]
            if not isinstance(tag, str) or not TAG_RE.fullmatch(tag):
                raise PinError(f"PINS holds {tag!r} for bmad-loop, which is not a release tag such as v0.12.0 (pre-release tags are not supported)")
            return tag
    return from_pin_file()


def pinned_tool_tag_from_pins_file(pins_file: Path) -> str | None:
    """The bmad-loop tag in a bmad-pins.json file. None when the file or the entry is absent; PinError when unreadable."""
    if not pins_file.exists():
        return None
    try:
        modules = json.loads(pins_file.read_text(encoding="utf-8")).get("modules")
    except (OSError, ValueError, AttributeError) as e:
        raise PinError(f"{pins_file.name} could not be read, so the bmad-loop tag could not be read ({e})") from e
    if not isinstance(modules, dict):
        raise PinError(f"modules in {pins_file.name} is not an object")
    if "bmad-loop" not in modules:
        return None
    tag = modules["bmad-loop"]
    if not isinstance(tag, str) or not TAG_RE.fullmatch(tag):
        raise PinError(f"{pins_file.name} holds {tag!r} for bmad-loop, which is not a release tag such as v0.12.0 (pre-release tags are not supported)")
    return tag


def pinned_tool_commit(pin_file: Path = PIN_FILE, pins_file: Path = PINS_FILE) -> str | None:
    """The commit the bmad-loop tag pointed at when it was pinned, or None when nothing records one.

    A tag can be moved to another commit, which would change the CLI and the skills under one version number. The commit cannot move.
    This repository's bmad-pins.json holds it under `commits`. A repository that has no such file (one that received this wrapper from the
    sdlc-loop package) keeps it in bmad-loop-pin.json under `commit`. Raises PinError when an entry exists and is not a full commit id,
    so a typo stops the run and is not read as "no commit pinned".
    """
    if pins_file.exists():
        source, key = pins_file, "commits"
    elif pin_file.exists():
        source, key = pin_file, "commit"
    else:
        return None
    try:
        data = json.loads(source.read_text(encoding="utf-8"))
    except (OSError, ValueError) as e:
        raise PinError(f"{source.name} could not be read, so the bmad-loop commit could not be read ({e})") from e
    if not isinstance(data, dict):
        raise PinError(f"{source.name} is not a JSON object")
    value = data.get(key)
    if key == "commits":
        if value is None:
            return None
        if not isinstance(value, dict):
            raise PinError(f"commits in {source.name} is not an object")
        value = value.get("bmad-loop")
    if value is None:
        return None
    if not isinstance(value, str) or not COMMIT_RE.fullmatch(value):
        raise PinError(f"{source.name} holds {value!r} as the bmad-loop commit, which is not a full 40-character commit id in lower case")
    return value


def tool_spec(tag: str | None, commit: str | None = None) -> str:
    """The `uv tool install` requirement for bmad-loop: at `commit` when one is pinned, else at `tag` when there is one."""
    if commit:
        return f"{TOOL_URL}@{commit}"
    return f"{TOOL_URL}@{tag}" if tag else TOOL_URL


def installed_tool_version() -> str | None:
    """The version `bmad-loop --version` prints, such as "0.12.0", or None when it cannot be read."""
    if shutil.which("bmad-loop") is None:
        return None
    try:
        out = subprocess.run(["bmad-loop", "--version"], capture_output=True, text=True, timeout=20).stdout
    except (OSError, subprocess.TimeoutExpired):
        return None
    match = re.search(r"\d+\.\d+\.\d+\S*", out)
    return match.group(0) if match else None


def tool_version_problem(tag: str | None) -> str | None:
    """A message when the installed CLI is not the pinned `tag`, or its version cannot be read, else None. None when there is no pin or no CLI."""
    if not tag or shutil.which("bmad-loop") is None:
        return None
    installed = installed_tool_version()
    if installed is None:
        return (f"the installed bmad-loop version could not be read, so it cannot be compared with the pinned tag {tag}. "
                f"Run {INIT_SH} --upgrade to reinstall the CLI at the pinned tag.")
    if installed != tag.lstrip("v"):
        return (f"the installed bmad-loop CLI is {installed} but the pinned tag is {tag}. The CLI and the bmad-loop skills "
                f"must come from the same tag. Run {INIT_SH} --upgrade to reinstall the CLI at the pinned tag.")
    return None


def installed_tool_commit() -> str | None:
    """The commit the installed bmad-loop was built from, as uv recorded it in the package's `direct_url.json` (PEP 610), or None.

    None when uv is not installed, the tool has no record, or the record cannot be read. A tool installed from anywhere but Git has no commit.
    """
    if shutil.which("uv") is None:
        return None
    try:
        done = subprocess.run(["uv", "tool", "dir"], capture_output=True, text=True, timeout=20)
    except (OSError, subprocess.TimeoutExpired):
        return None
    out = done.stdout.strip()
    if done.returncode != 0 or not out or not Path(out).is_absolute():
        return None
    for record in sorted(Path(out, "bmad-loop").rglob("bmad_loop-*.dist-info/direct_url.json")):
        try:
            commit = json.loads(record.read_text(encoding="utf-8"))["vcs_info"]["commit_id"]
        except (OSError, ValueError, KeyError, TypeError):
            continue
        if isinstance(commit, str) and COMMIT_RE.fullmatch(commit):
            return commit
    return None


def tool_commit_problem(commit: str | None) -> str | None:
    """A message when the installed CLI was not built from the pinned `commit`, or its commit cannot be read, else None.

    None when no commit is pinned or there is no CLI on the PATH. The version check cannot see a moved tag, because the moved tag
    carries the same version string.
    """
    if not commit or shutil.which("bmad-loop") is None:
        return None
    installed = installed_tool_commit()
    if installed is None:
        why = "uv is not on the PATH" if shutil.which("uv") is None else "uv has no Git record for it, so it was not installed by uv from Git"
        return (f"the commit the installed bmad-loop was built from could not be read ({why}), so it cannot be compared with the pinned commit {commit[:12]}. "
                f"Run {INIT_SH} --upgrade to reinstall the CLI at the pinned commit with uv.")
    if installed != commit:
        return (f"the installed bmad-loop CLI was built from commit {installed[:12]}, but the pin records {commit[:12]}. "
                f"A tag that has been moved gives a different CLI under the same version. Run {INIT_SH} --upgrade to reinstall the CLI at the pinned commit.")
    return None


# ---------------------------------------------------------------- policy choices

POLICY_FILE = ".bmad-loop/policy.toml"
POLICY_MARK = "# set by sdlc-bmad-loop-init"
CHOICE_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._:/-]*$")


def set_policy_value(text: str, section: str, key: str, literal: str) -> str:
    """`text` with `key = literal` set in `[section]`. Raises ValueError when the section is missing.

    An active `key =` line is replaced. Otherwise the new line goes under a commented `# key =` line,
    or directly under the section header. Only the first line of a multi-line value is replaced,
    so the caller parses the result before writing it.
    """
    lines = text.splitlines(keepends=True)
    start = next((i for i, line in enumerate(lines) if re.match(rf"^\[{re.escape(section)}\]\s*(#.*)?$", line.rstrip("\n"))), None)
    if start is None:
        raise ValueError(f"{POLICY_FILE} has no [{section}] section")
    end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("[")), len(lines))
    new = f"{key} = {literal}  {POLICY_MARK}\n"
    for i in range(start + 1, end):
        if re.match(rf"^{re.escape(key)}\s*=", lines[i]):
            lines[i] = new
            return "".join(lines)
    for i in range(start + 1, end):
        if re.match(rf"^#\s*{re.escape(key)}\s*=", lines[i]):
            lines.insert(i + 1, new)
            return "".join(lines)
    lines.insert(start + 1, new)
    return "".join(lines)


def _bypass_args(root: Path) -> list[str]:
    """The permission flags the committed Claude profile runs with, which `extra_args` replaces and so must repeat."""
    try:
        flags = tomllib.loads((root / PROJECT_PROFILE).read_text()).get("bypass_args")
    except (OSError, tomllib.TOMLDecodeError):
        flags = None
    if isinstance(flags, list) and flags and all(isinstance(f, str) for f in flags):
        return flags
    return ["--permission-mode", "bypassPermissions"]


def apply_policy(root: Path, stories: str | None = None, model: str | None = None, effort: str | None = None) -> list[str]:
    """Write the chosen stories folder, Claude model and effort into `root`'s policy.toml.

    The values go into the `[adapter]` table. The review and triage stages inherit that table unless they have
    their own, so a Claude model or effort set here applies to them too.

    The model and effort go into `[adapter]`, so they apply only when both `[adapter]` and the dev stage
    (`[adapter.dev]`, when it names its own adapter) run Claude. A policy whose base adapter is not Claude
    is refused even when `[adapter.dev]` is Claude: the values would land in the wrong table, and that
    stage's own table is edited by hand.

    `bmad-loop init` writes a policy that reads sprint-status.yaml and uses the CLI's default model.
    Effort has no policy key for the tmux CLIs, so it goes into the `--effort` flag of the Claude
    adapter's `extra_args`, with the permission mode the packaged profile would have used repeated,
    because `extra_args` replaces the profile's flags. Raises ValueError before changing anything
    when a choice is invalid or the policy cannot be edited. Returns one line per value set.
    """
    path = root / POLICY_FILE
    if not path.is_file():
        raise ValueError(f"{POLICY_FILE} does not exist; `bmad-loop init` writes it")
    text, expect, lines = path.read_text(), [], []
    if stories:
        folder = Path(stories)
        if folder.is_absolute() or ".." in folder.parts:
            raise ValueError(f"--stories must be a path inside the repository, relative to its root, not {stories!r}")
        for name in ("stories.yaml", "SPEC.md"):
            if not (root / folder / name).is_file():
                raise ValueError(f"--stories {stories}: {root / folder / name} does not exist")
        text = set_policy_value(text, "stories", "source", '"stories"')
        text = set_policy_value(text, "stories", "spec_folder", json.dumps(folder.as_posix()))
        expect += [("stories", "source", "stories"), ("stories", "spec_folder", folder.as_posix())]
        lines.append(f"stories mode, folder {folder.as_posix()}")
    for label, value in (("--model", model), ("--effort", effort)):
        if value is not None and not CHOICE_RE.match(value):
            raise ValueError(f"{label} {value!r} is not a plain model or effort name")
    if model or effort:
        adapter = _adapter_table(root)
        if adapter is None or adapter.get("name", "claude") != "claude":
            raise ValueError("--model and --effort set the Claude dev stage, and this policy's [adapter] is not Claude")
        dev = adapter.get("dev")
        dev_name = dev.get("name") if isinstance(dev, dict) else None
        if dev_name is not None and dev_name != "claude":
            raise ValueError(f"--model and --effort set the Claude dev stage, and this policy's [adapter.dev] runs {dev_name!r}. "
                             "Nothing was changed.")
        overridden = [key for key, wanted in (("model", model), ("extra_args", effort)) if wanted and isinstance(dev, dict) and key in dev]
        if overridden:
            raise ValueError(f"[adapter.dev] sets its own {' and '.join(overridden)}, which overrides the [adapter] value this would write. "
                             "Edit that table by hand. Nothing was changed.")
    if model:
        text = set_policy_value(text, "adapter", "model", json.dumps(model))
        expect.append(("adapter", "model", model))
        lines.append(f"dev model {model}")
    if effort:
        bypass = _bypass_args(root)
        own = adapter.get("extra_args") if isinstance(adapter, dict) else None
        wrote_it = own == bypass or (isinstance(own, list) and own[:-2] == bypass and own[-2:-1] == ["--effort"])
        if own not in (None, []) and not wrote_it:
            raise ValueError(f"[adapter] already sets its own extra_args ({own!r}), and --effort would replace them. "
                             "Add `--effort <level>` to that list by hand. Nothing was changed.")
        flags = [*bypass, "--effort", effort]
        text = set_policy_value(text, "adapter", "extra_args", json.dumps(flags))
        expect.append(("adapter", "extra_args", flags))
        lines.append(f"effort {effort} (adapter extra_args {' '.join(flags)})")
    if not expect:
        return []
    try:
        parsed = tomllib.loads(text)
    except tomllib.TOMLDecodeError as e:
        raise ValueError(f"the edited {POLICY_FILE} would not parse ({e}); nothing was written") from e
    for section, key, value in expect:
        if parsed.get(section, {}).get(key) != value:
            raise ValueError(f"the edit to [{section}] {key} did not take effect; nothing was written")
    tmp = path.with_name(path.name + ".tmp-sdlc-bmad-loop")
    tmp.write_text(text)
    os.replace(tmp, path)
    return lines


# ---------------------------------------------------------------- Claude Code workspace trust

TRUST_WRITE_ATTEMPTS = 5
TRUST_RETRY_PAUSE = 0.1  # seconds, times the attempt number: Claude Code rewrites its file in bursts, so 5 attempts wait up to 1 s in all
TRUST_STALE_TEMP_SECONDS = 60


def claude_config_path() -> Path:
    """Claude Code's per-user state file, which records which directories the user has trusted."""
    base = os.environ.get("CLAUDE_CONFIG_DIR")
    return (Path(base) if base else Path.home()) / ".claude.json"


def claude_trust(root: Path) -> str:
    """"trusted" or "not trusted" for exactly this directory, or "unknown" when the state file cannot be read.

    A directory counts only on its own entry. Whether Claude Code also honours a trusted parent
    directory was not verified, so a parent's entry is ignored; a wrong "not trusted" costs one
    harmless re-grant, while a wrong "trusted" would end in a crashed run.
    """
    path = claude_config_path()
    if not path.is_file():
        return "not trusted"
    try:
        projects = json.loads(path.read_text()).get("projects", {})
    except (OSError, ValueError, AttributeError):
        return "unknown"
    entry = projects.get(str(root.resolve())) if isinstance(projects, dict) else None
    return "trusted" if isinstance(entry, dict) and entry.get("hasTrustDialogAccepted") is True else "not trusted"


def _sweep_stale_state_temp_files(target: Path) -> None:
    """Remove temp copies of the state file that an earlier run left behind when it was killed.

    Each holds a copy of Claude Code's auth state. A file younger than `TRUST_STALE_TEMP_SECONDS` may
    belong to a run that is still going, so it stays.
    """
    cutoff = time.time() - TRUST_STALE_TEMP_SECONDS
    try:
        for leftover in target.parent.glob(target.name + ".tmp-sdlc-bmad-loop*"):
            try:
                if leftover.is_file() and not leftover.is_symlink() and leftover.stat().st_mtime < cutoff:
                    leftover.unlink()
            except OSError:
                continue
    except OSError:
        return


def grant_claude_trust(root: Path) -> str:
    """Mark `root` trusted in Claude Code's state file, as accepting its trust dialog does.

    Call this only after the user has said yes to trusting this directory. Only this directory's
    entry changes; every other key is kept, and the write is atomic. A running Claude Code session
    rewrites the same file and takes no lock, so a write that lands between our final check and our
    replace is still lost. To make that window short, the file is read again just before the replace.
    If it changed, the edit is redone on the new content after a short pause, up to
    `TRUST_WRITE_ATTEMPTS` times.

    A file that cannot be read, is empty, or is not valid JSON is refused on the first read, and
    nothing is written. An existing empty file is refused and not treated as `{}`, because replacing
    a file that another process has just truncated would discard its contents. On a later attempt such
    a file may have been caught mid-write, so it is read again, and refused only on the last attempt.
    The temp file has a unique name, so two runs do not delete each other's, and a copy left by a killed
    run is removed by the next one. The caller checks the result with `claude_trust`.
    Raises ValueError when the file is refused, and OSError when it keeps changing or cannot be re-read.
    """
    path = claude_config_path()
    key = str(root.resolve())
    _sweep_stale_state_temp_files(path.resolve() if path.is_symlink() else path)
    cause = ""
    for attempt in range(TRUST_WRITE_ATTEMPTS):
        if attempt:
            time.sleep(TRUST_RETRY_PAUSE * attempt)
        exists = path.is_file()
        try:
            original = path.read_text() if exists else ""
            problem = f"{path} exists but is empty" if exists and not original.strip() else None
        except (OSError, ValueError) as e:  # gone since the check, unreadable, or not UTF-8
            original, problem = "", f"{path} could not be read ({e})"
        config: object = {}
        if problem is None and original.strip():
            try:
                config = json.loads(original)
            except ValueError as e:
                problem = f"{path} is not valid JSON ({e})"
        if problem is not None:
            if attempt and attempt < TRUST_WRITE_ATTEMPTS - 1:
                continue
            tail = ", or another process was writing it" if attempt else ""
            raise ValueError(f"{problem}{tail}; it was not changed")
        projects = config.setdefault("projects", {}) if isinstance(config, dict) else None
        if not isinstance(projects, dict):
            raise ValueError(f"{path} does not have the expected shape (an object with a \"projects\" object); it was not changed")
        entry = projects.get(key)
        if entry is None:
            entry = projects[key] = {"allowedTools": [], "enabledMcpjsonServers": []}
        if not isinstance(entry, dict):
            raise ValueError(f"{path}: the entry for {key} is not an object; it was not changed")
        if entry.get("hasTrustDialogAccepted") is True:
            return "already trusted"
        entry["hasTrustDialogAccepted"] = True
        target = path.resolve() if path.is_symlink() else path
        # mkstemp gives a unique name and mode 0600: the file holds auth state, so a new file is private, and an existing one keeps its own mode
        fd, tmp_name = tempfile.mkstemp(dir=target.parent, prefix=target.name + ".tmp-sdlc-bmad-loop-")
        tmp = Path(tmp_name)
        try:
            try:
                handle = os.fdopen(fd, "w", encoding="utf-8")
            except BaseException:
                os.close(fd)
                raise
            with handle:
                handle.write(dump_like(original, config))
            try:
                if target.is_file():
                    shutil.copymode(target, tmp)
            except FileNotFoundError:
                cause = f"changed {TRUST_WRITE_ATTEMPTS} times while the trust entry was being added"
                continue  # the file was removed since the check: read it again
            try:
                current = target.read_text() if target.is_file() else ""
            except (OSError, ValueError) as e:
                cause = f"could not be re-read before the replace ({e})"
                continue  # unreadable now: read it again
            if current != original:
                cause = f"changed {TRUST_WRITE_ATTEMPTS} times while the trust entry was being added"
                continue  # another process wrote the file while this edit was prepared; redo it on the new content
            os.replace(tmp, target)
            return f"trusted {key}"
        finally:
            tmp.unlink(missing_ok=True)
    raise OSError(f"{path} {cause}, so it was not changed. Run this again.")


# ---------------------------------------------------------------- command line

def cli_name(value: str) -> str:
    """argparse type: accept only the CLIs whose hook file this script knows how to keep out of git."""
    if value not in ALLOWED_CLIS:
        raise argparse.ArgumentTypeError(
            f"{value!r} is not supported. Allowed: {', '.join(ALLOWED_CLIS)}. No safe hook-file "
            "handling is confirmed for Gemini or Antigravity; see the setup mode (setup.md) of the sdlc-loop skill"
        )
    return value


def run(cmd: list[str], root: Path) -> int:
    print(f"  $ {' '.join(cmd)}")
    # The call passes an argument list with no shell. COMMIT_RE, TAG_RE and ALLOWED_CLIS validate the inputs.
    # nosemgrep
    return subprocess.run(cmd, cwd=root).returncode


def patch_tool() -> bool:
    """Apply sdlc_bmad_loop_patches.py to the installed tool and print the result. True when a patch needs a person."""
    found = tool_patches.installed_package()
    if found is None:
        print("WARNING: could not locate the installed bmad_loop package, so the local patches were not applied.")
        return False
    results = tool_patches.apply(*found)
    for r in results:
        print(f"  bmad-loop patch {r.id}: {r.state}" + ("" if r.state == "already" else f" ({r.detail})"))
    bad = [r for r in results if r.state in ("manual", "fixed")]
    if bad:
        print("error: " + "; ".join(f"{r.id} is {r.state}" for r in bad) + f". See {PATCHES_PY}.", file=sys.stderr)
    return bool(bad)


def unpatched_tool_message() -> str | None:
    """A sentence when the installed tool lacks a local patch, else None. Changes nothing."""
    found = tool_patches.installed_package()
    if found is None:
        return None
    bad = [r for r in tool_patches.apply(*found, write=False) if r.state != "already"]
    if not bad:
        return None
    return ("the installed bmad-loop is missing local patches (" + "; ".join(f"{r.id}: {r.state}" for r in bad)
            + f"). Run {INIT_SH}, or `uv run {PATCHES_PY}`.")


def leak_message(files: list[str]) -> str:
    return (f"a bmad-loop relay command, a personal home-directory path, or a hook that runs the untracked {HOOK_SCRIPT} "
            f"is in the git index of {', '.join(files)}. "
            f"Unstage it with `git restore --staged {' '.join(files)}`, then remove it from the working copy.")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument(
        "--cli", action="append", type=cli_name, metavar="CLI",
        help=f"coding CLI to register hooks for; repeatable (allowed: {', '.join(ALLOWED_CLIS)}; default: claude)",
    )
    parser.add_argument("--install-tool", action="store_true",
                        help="install the bmad-loop tool with `uv tool install` if it is not on PATH (machine-global)")
    parser.add_argument("--upgrade", action="store_true",
                        help="reinstall the bmad-loop CLI at the pinned tag (`uv tool install --force`), or upgrade it when there "
                             "is no pin, and then refresh its bundled skills only when there is no pin (a pinned repo "
                             "gets its skills from bmad-update); refuses while a run is active in any worktree unless --force")
    parser.add_argument("--no-skills", action="store_true", help="pass --no-skills to `bmad-loop init`")
    parser.add_argument("--check", action="store_true",
                        help="report a missing or stale profile, a relay command or home path in a tracked hook file, "
                             "and (while the Codex daemon runs) a Codex stage without --no-daemon; change nothing; exit 1 on a problem")
    parser.add_argument("--release-codex", action="store_true",
                        help="remove the relay from .codex/hooks.json and clear its skip-worktree flag in every "
                             "worktree of the repository, then exit; refuses while a run is active unless --force")
    parser.add_argument("--force", action="store_true", help="let --release-codex and --upgrade proceed while a run is active")
    parser.add_argument("--worktrees", action="store_true",
                        help="set up every worktree whose branch already contains the bmad-loop setup, not just this one")
    parser.add_argument("--status", action="store_true",
                        help="print one line per worktree (branch, setup, hooks, adapters, active runs), then exit")
    parser.add_argument("--stories", metavar="FOLDER",
                        help="point the policy at this stories folder (relative to the repo root; needs stories.yaml and SPEC.md in it)")
    parser.add_argument("--model", metavar="NAME", help="set the Claude dev model in the policy, for example claude-sonnet-5-5")
    parser.add_argument("--effort", metavar="LEVEL", help="set the Claude effort (low, medium, high, ...) through the adapter's extra_args")
    parser.add_argument("--trust-claude", action="store_true",
                        help="record Claude Code's workspace trust for each directory set up. Pass this only after the user "
                             "has agreed to trust that directory: it grants the project permission to run its hooks")
    args = parser.parse_args()
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(line_buffering=True)  # keep our lines in order with the child's output
    clis = args.cli or ["claude"]

    try:
        return _dispatch(args, clis)
    except GitError as e:
        print(f"error: {e}", file=sys.stderr)
        return 1


def _choices(args: argparse.Namespace) -> dict:
    return {"stories": args.stories, "model": args.model, "effort": args.effort}


def _busy_worktrees() -> dict[str, list[str]]:
    return {p.name: runs for p in list_worktrees() if (runs := active_runs(p))}


def _dispatch(args: argparse.Namespace, clis: list[str]) -> int:
    repo_pin, pin_error = None, None
    try:
        repo_pin = pinned_tool_tag(UPDATE_SCRIPT)
    except PinError as e:
        pin_error = e
    commit = None
    if repo_pin:
        try:
            commit = pinned_tool_commit()
        except PinError as e:
            pin_error = pin_error or e
    if pin_error is not None and not args.release_codex and not args.status and not args.check:
        # Releasing the Codex relay never needs the tag, and --status and --check report the problem instead of stopping.
        print(f"error: {pin_error}", file=sys.stderr)
        return 1
    tag = repo_pin  # the CLI is installed and checked at the tag PINS holds, the same tag bmad-update installs the skills at
    pinned_at = f"{tag} (commit {commit[:12]})" if tag and commit else tag  # what the install messages name
    if args.status:
        installed = installed_tool_version()
        problem = tool_version_problem(tag)
        print(f"bmad-loop CLI: installed {installed or 'none'}, pinned {tag or 'none'}"
              + (" MISMATCH" if problem else "") + (f" (PINS UNREADABLE: {pin_error})" if pin_error else ""))
        if commit:
            print(f"bmad-loop commit: installed {(installed_tool_commit() or 'unknown')[:12]}, pinned {commit[:12]}"
                  + (" MISMATCH" if tool_commit_problem(commit) else ""))
        print("\n".join(status_lines()))
        return 0

    if args.release_codex:
        busy = _busy_worktrees()
        if busy and not args.force:
            print(f"error: runs are active in {', '.join(busy)}. Releasing removes the shared Codex relay for every "
                  "worktree, which would stop those runs from reporting. Stop them or pass --force.", file=sys.stderr)
            return 1
        lines = release_codex_hooks()
        for line in lines:
            print(f"{CODEX_HOOK_FILE} in {line}")
        if release_failed(lines):
            print("error: at least one checkout was not released, so its relay and skip-worktree flag are still in place.", file=sys.stderr)
            return 1
        return 0

    if args.check:
        problems = [m for m in (profile_drift(), unpatched_tool_message()) if m]
        try:
            leaked = tracked_relay_files()
        except GitError as e:
            problems.append(f"the leak check could not run: {e}")
        else:
            if leaked:
                problems.append(leak_message(leaked))
        try:
            problems.extend(personal_problems())
        except GitError as e:
            problems.append(f"the personal-answers check could not run: {e}")
        missing = codex_stages_without_no_daemon(REPO_ROOT)
        if missing and codex_daemon_running():
            problems.append(no_daemon_message(missing))
        if shutil.which("bmad-loop") is None:
            problems.append(f"bmad-loop is not on the PATH, so a run cannot start. Run `bash {INIT_SH} --install-tool`.")
        version_problem = tool_version_problem(tag)
        if version_problem:
            problems.append(version_problem)
        commit_problem = tool_commit_problem(commit)
        if commit_problem:
            problems.append(commit_problem)
        if pin_error is not None:
            problems.append(str(pin_error))
        for p in problems:
            print(f"PROBLEM: {p}")
        print("ok" if not problems else "")
        return 1 if problems else 0

    installed_now = False
    if args.install_tool:
        if shutil.which("bmad-loop"):
            print("--install-tool: bmad-loop is already installed, so nothing was installed. Use --upgrade to reinstall it at the pinned tag.")
        else:
            print(f"Installing the bmad-loop tool (machine-global, from Git{', at ' + pinned_at if tag else ', unpinned: no tag in PINS'}):")
            if run(["uv", "tool", "install", tool_spec(tag, commit)], REPO_ROOT):
                return 1
            installed_now = True
    if args.upgrade and shutil.which("bmad-loop") and not installed_now:
        busy = _busy_worktrees()
        if busy and not args.force:
            print(f"error: runs are active in {', '.join(busy)}. Upgrading replaces the machine-wide bmad-loop under "
                  "them. Stop them or pass --force.", file=sys.stderr)
            return 1
        print(f"Reinstalling the bmad-loop tool at {pinned_at}:" if tag else "Upgrading the bmad-loop tool:")
        # `uv tool upgrade` cannot move a tool back to an older tag, so a pinned CLI is reinstalled.
        if run(["uv", "tool", "install", "--force", tool_spec(tag, commit)] if tag else ["uv", "tool", "upgrade", "bmad-loop", "--reinstall"], REPO_ROOT):
            return 1
    if not shutil.which("bmad-loop"):
        if installed_now:
            print(
                "error: `bmad-loop` was installed, but the folder `uv` put it in is not on PATH. Run `uv tool update-shell` "
                "or add the folder `uv tool dir --bin` prints to PATH, open a new shell, and run this again.",
                file=sys.stderr,
            )
            return 1
        print(
            "error: `bmad-loop` is not on PATH. Re-run with --install-tool to install it with "
            "`uv tool install` (machine-global), or use the bmad-loop-setup skill.",
            file=sys.stderr,
        )
        return 1

    # An install or upgrade rebuilds the tool's environment and discards local edits, so patch every time.
    patch_failed = patch_tool()
    if patch_failed:
        return 1

    if args.worktrees:
        failed = 0
        for path in list_worktrees():
            print(f"== {path}")
            if not has_loop_setup(path):
                print("  skipped: this branch does not contain the bmad-loop setup yet. Merge or rebase it first,"
                      " because setup here would leave an uncommitted profile and a dirty tree.")
                continue
            if active_runs(path):
                print(f"  skipped: a run is active here ({', '.join(active_runs(path))})")
                continue
            try:
                failed += bool(setup_checkout(path, clis, args.upgrade, args.no_skills, validate=False,
                                              choices=_choices(args), trust_claude=args.trust_claude, tool_tag_pinned=tag,
                                              skills_pinned=repo_pin is not None, tool_commit_pinned=commit))
            except GitError as e:
                print(f"  PROBLEM: {e}")
                failed += 1
        for s in skipped_worktrees():
            print(f"== {s} (skipped)")
        return 1 if failed else 0

    return setup_checkout(REPO_ROOT, clis, args.upgrade, args.no_skills, validate=True,
                          choices=_choices(args), trust_claude=args.trust_claude, tool_tag_pinned=tag,
                          skills_pinned=repo_pin is not None, tool_commit_pinned=commit)


LONE_SURROGATE_RE = re.compile("[\ud800-\udfff]")  # a Python string holds a surrogate only when it has no partner


def _toml_string(value: str) -> str:
    """A TOML basic string. JSON's escapes are TOML's for quote, backslash and control characters; DEL is escaped, and a lone surrogate is replaced."""
    return json.dumps(LONE_SURROGATE_RE.sub("\ufffd", value), ensure_ascii=False).replace("\x7f", "\\u007f")


def answers_text(name: str) -> str:
    """The personal answers file, byte for byte as the AI-SDLC installer writes it, so either one can have made it."""
    return (
        "# Personal answers for BMAD. Written by the AI-SDLC tooling because this file was missing.\n"
        "# It is yours: no run replaces it, and git ignores it (see _bmad/.gitignore).\n"
        "# Edit a value here to change your own BMAD answers.\n"
        "\n"
        "[core]\n"
        f"user_name = {_toml_string(name)}\n"
        f"communication_language = {_toml_string(DEFAULT_LANGUAGE)}\n"
        "\n"
        "[modules.bmm]\n"
        f"user_skill_level = {_toml_string(DEFAULT_SKILL_LEVEL)}\n"
    )


def _regular_file(path: Path) -> bool:
    return path.is_file() and not path.is_symlink()


def _link_on_the_way(root: Path, rel: str) -> str | None:
    """The first symlink on the way to `rel` under `root`, itself included, or None."""
    at = root
    for part in Path(rel).parts:
        at = at / part
        if at.is_symlink():
            return at.relative_to(root).as_posix()
    return None


def personal_files_in(source: Path) -> list[str]:
    """The personal files `source` holds, relative to it: the answers file and each `*.user.toml` directly in the custom folder. A link is never followed."""
    found = [ANSWERS_FILE] if _link_on_the_way(source, ANSWERS_FILE) is None and _regular_file(source / ANSWERS_FILE) else []
    folder = source / CUSTOM_DIR
    if _link_on_the_way(source, CUSTOM_DIR) is None and folder.is_dir():
        found += [f"{CUSTOM_DIR}/{f.name}" for f in sorted(folder.glob("*.user.toml")) if _regular_file(f)]
    return found


def tracked_personal_files(root: Path) -> list[str]:
    """Personal files that git tracks in `root`."""
    listed = git(root, "ls-files", "-z", "--", "_bmad")
    if listed.returncode != 0:
        raise GitError(f"git ls-files failed in {root}: {listed.stderr.strip()}")
    found = []
    for rel in sorted(p for p in listed.stdout.split("\0") if p):
        if rel == ANSWERS_FILE or (rel.startswith(f"{CUSTOM_DIR}/") and "/" not in rel[len(CUSTOM_DIR) + 1:] and rel.endswith(".user.toml")):
            found.append(rel)
    return found


def _holds_personal_key(data: object, allowed: dict | None = None) -> bool:
    """True when a parsed TOML value has one of the personal keys anywhere in it, however the file spells the key.

    A key whose value equals the one `allowed` lists for it does not count.
    """
    if isinstance(data, dict):
        return any((k in PERSONAL_KEYS and not (allowed and allowed.get(k) == v)) or _holds_personal_key(v, allowed) for k, v in data.items())
    if isinstance(data, list):
        return any(_holds_personal_key(v, allowed) for v in data)
    return False


def committed_personal_values(root: Path) -> list[str]:
    """Tracked team override files in the custom folder that hold a personal answer, which would reach every teammate.

    The file is read as git holds it (the index), so a value scrubbed from the working copy and not yet committed still counts.
    """
    listed = git(root, "ls-files", "-z", "--", CUSTOM_DIR, TEAM_CONFIG)
    if listed.returncode != 0:
        raise GitError(f"git ls-files failed in {root}: {listed.stderr.strip()}")
    found = []
    for rel in sorted(p for p in listed.stdout.split("\0") if p):
        if not rel.endswith(".toml") or rel.endswith(".user.toml"):
            continue
        shown = git(root, "show", f":./{rel}")  # `./` makes the path relative to `root`, which may be a folder inside the repository
        if shown.returncode == 0:
            text = shown.stdout
        else:
            try:
                text = (root / rel).read_text(errors="replace")
            except OSError:
                continue
        try:
            holds = _holds_personal_key(tomllib.loads(text), SHIPPED_TEAM_DEFAULTS if rel == TEAM_CONFIG else None)
        except tomllib.TOMLDecodeError:
            holds = bool(PERSONAL_KEY_RE.search(text))  # a file BMAD could not parse is still not allowed to carry the values
        if holds:
            found.append(rel)
    return found


def answers_text_problem(text: str) -> str | None:
    """Why this text would not satisfy this tooling, or None.

    `communication_language` must be a string with something in it. `user_name` is optional, because the tracked
    `_bmad/config.toml` carries the placeholder `BMad` for it, and BMAD stops a skill only when a key the skill names is
    missing from every layer (RAD-91022). A `user_name` that is present must still be a name: a blank one overrides the
    placeholder with nothing. The AI-SDLC installer applies the same rule, and a test holds the two to the same answers.
    """
    try:
        data = tomllib.loads(text)
    except tomllib.TOMLDecodeError as e:
        return f"cannot be read as TOML ({e})"
    core = data.get("core") if isinstance(data.get("core"), dict) else {}

    def usable(value) -> bool:
        return isinstance(value, str) and bool(value.strip())

    if not usable(core.get("communication_language")):
        return "has no value for communication_language under [core]"
    if "user_name" in core and not usable(core["user_name"]):
        return "has a user_name under [core] that is blank or not a string"
    return None


def answers_file_problem(path: Path) -> str | None:
    """Why the file at `path` would not satisfy BMAD, or None."""
    if not path.is_file():
        return "is not a file (a folder, or a link to nothing)"
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError) as e:
        return f"cannot be read as TOML ({e})"
    return answers_text_problem(text)


def personal_problems(root: Path = REPO_ROOT) -> list[str]:
    """What `--check` reports about the person's BMAD answers. Empty when BMAD is not installed here."""
    if not (root / "_bmad").is_dir():
        return []
    problems = []
    answers = root / ANSWERS_FILE
    # The file's own state first, because it needs no git, and a git failure below must not hide it.
    if not os.path.lexists(answers):
        problems.append(f"{ANSWERS_FILE} is missing, so the loop's first session stops with `missing config value communication_language`. "
                        f"Run `bash {INIT_SH}` to copy it from the main checkout or create it from `git config user.name`.")
    else:
        why = answers_file_problem(answers)
        if why:
            problems.append(f"{ANSWERS_FILE} {why}, so the loop's first session would stop on a missing config value. Fix or remove it, then run `bash {INIT_SH}`.")
    try:
        tracked = tracked_personal_files(root)
        if tracked:
            problems.append(f"git tracks {', '.join(tracked)}, which hold one person's answers. Run `git rm --cached {' '.join(tracked)}`, commit, and keep the files on disk.")
        holding = committed_personal_values(root)
        if holding:
            problems.append(f"{', '.join(holding)} is committed and holds a personal answer (user_name, communication_language or user_skill_level). "
                            f"Move the values to {ANSWERS_FILE}, which git ignores, and remove them from the committed file.")
        unignored = [rel for rel in personal_files_in(root) if rel not in tracked and not is_ignored_by_repo(root, rel)]
        if unignored:
            problems.append(f"{', '.join(unignored)} {'is' if len(unignored) == 1 else 'are'} not ignored by a .gitignore in the repository, so the next `git add` can commit "
                            f"{'it' if len(unignored) == 1 else 'them'}. Run `bash {INIT_SH}`, which adds the ignore lines.")
    except GitError as e:
        problems.append(f"the personal-answers check could not finish: {e}")
    return problems


def _write_new(dest: Path, data: bytes) -> bool:
    """Write `data` to `dest`, created exclusively so a file that is there is never replaced. Returns True when it wrote.

    No temporary file is used: one would carry the person's name under a name no ignore rule covers. A failure part way removes the part-written
    file, and a process killed part way leaves an ignored file that `--check` reports as unusable.
    """
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        fd = os.open(dest, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o644)
    except FileExistsError:
        return False
    try:
        f = os.fdopen(fd, "wb")
    except BaseException:
        os.close(fd)
        dest.unlink(missing_ok=True)
        raise
    try:
        with f:
            f.write(data)
    except BaseException:
        dest.unlink(missing_ok=True)
        raise
    return True


def _answers_source_checkout(root: Path) -> Path:
    """The folder of the main checkout that matches `root`, or `root` itself when it is the main one.

    With a git directory kept apart from its checkout (`git init --separate-git-dir`), `git worktree list` names that directory as the main entry, so
    `core.worktree` names the checkout. A project in a folder of the repository maps to the same folder in the main checkout.
    """
    main = main_checkout(root)
    top = Path(git(root, "rev-parse", "--show-toplevel").stdout.strip() or root)
    if (main / "HEAD").is_file() and (main / "objects").is_dir():  # that is a git directory, not a checkout
        configured = git(main, "--git-dir", str(main), "config", "--get", "core.worktree").stdout.strip()
        if not configured:
            return root
        main = (main / configured).resolve()
    if main.resolve() == top.resolve():
        return root
    try:
        return main / root.resolve().relative_to(top.resolve())
    except ValueError:
        return root


def ensure_personal_answers(root: Path) -> tuple[str, str]:
    """Make sure `root` has the person's BMAD answers file. Returns (outcome, message); the outcome is present, copied, created, skipped or problem.

    BMAD writes the file on a first install, and neither git nor the AI-SDLC installer carries it into a fresh clone or a new worktree.
    A copy from the main checkout comes first, so the person's own answers win. Otherwise the name comes from `git config user.name`
    and the language and skill level are BMAD's own defaults. `ai-sdlc.json` is never a source: git shares it, so a name in it may be someone else's.
    The file is never overwritten, never written through a symlink, and its path is made ignored before it is written. Personal files that already
    exist here are checked for the ignore rule too, because an existing file that no .gitignore covers is the case `--check` reports.
    """
    if not (root / "_bmad").is_dir():
        return "skipped", "BMAD is not installed here, so there are no personal answers to place."
    tracked = tracked_personal_files(root)
    if tracked:
        return "problem", f"git tracks {', '.join(tracked)}. Run `git rm --cached` on them and commit, then run this again. Nothing was changed."
    link = _link_on_the_way(root, ANSWERS_FILE)
    if link:
        return "problem", f"{ANSWERS_FILE} is reached through the symlink {link}, so nothing was written. Replace the link with a real folder or file, then run this again."
    target = root / ANSWERS_FILE
    if os.path.lexists(target) and not target.is_file():
        return "problem", f"{ANSWERS_FILE} is a folder or a link to nothing, so BMAD cannot read it. Remove it, then run this again."
    try:
        main = _answers_source_checkout(root)
    except (GitError, ValueError):  # ValueError: `root` is not lexically under the repository's top, which a link or a case-only difference can cause
        main = root
    sources = personal_files_in(main) if main != root else []
    to_write: list[tuple[str, bytes]] = []
    outcome = "present"
    if not os.path.lexists(target):
        copied = (main / ANSWERS_FILE).read_bytes() if ANSWERS_FILE in sources else None
        if copied is not None and answers_text_problem(copied.decode("utf-8", "replace")) is None:
            to_write.append((ANSWERS_FILE, copied))
            outcome = "copied"
        else:
            name = git(root, "config", "user.name").stdout.strip()
            if not name:
                return "problem", (f"{ANSWERS_FILE} is missing, and there is nothing to copy and no name to create it from. "
                                   f"Run `git config user.name \"Your Name\"` or create the file by hand, then run this again.")
            to_write.append((ANSWERS_FILE, answers_text(name).encode("utf-8")))
            outcome = "created"
    for rel in sources:
        if rel != ANSWERS_FILE and not os.path.lexists(root / rel) and _link_on_the_way(root, rel) is None:
            to_write.append((rel, (main / rel).read_bytes()))
            outcome = "copied" if outcome == "present" else outcome
    ignorable = [rel for rel in personal_files_in(root)] + [rel for rel, _ in to_write if rel not in personal_files_in(root)]
    added, unignorable = ensure_ignored(root, ignorable) if ignorable else ([], [])
    if unignorable:
        return "problem", (f"{', '.join(unignorable)} cannot be ignored here, so writing it could expose a personal answer. "
                           "Fix the ignore rule that un-ignores it, then run this again. Nothing was written.")
    written = []
    for rel, data in to_write:
        try:
            if _write_new(root / rel, data):
                written.append(rel)
        except OSError as e:
            return "problem", f"{rel} could not be written: {e}"
    note = f" Added to .gitignore: {', '.join(added)}. Commit .gitignore." if added else ""
    if not written:
        return "present", f"{ANSWERS_FILE} is already here.{note}"
    what = ", ".join(written)
    if outcome == "created":
        extra = f" Also copied: {', '.join(r for r in written if r != ANSWERS_FILE)}." if len(written) > 1 else ""
        return outcome, f"created {ANSWERS_FILE} from the git name and BMAD's defaults.{extra}{note}"
    return "copied", f"copied {what} from the main checkout, {main}.{note}"


def ensure_ignored(root: Path, rels: list[str]) -> tuple[list[str], list[str]]:
    """Append each path in `rels` that no .gitignore in the repository ignores to `root`'s .gitignore.

    Returns the paths added and the paths still not ignored afterwards (a later rule can un-ignore them).
    When any path is still not ignored, .gitignore is put back as it was.
    """
    missing = [rel for rel in rels if not is_ignored_by_repo(root, rel)]
    if not missing:
        return [], []
    path = root / ".gitignore"
    original = path.read_text() if path.is_file() else None
    _replace_text(path, (original or "") + ("" if not original or original.endswith("\n") else "\n") + "".join(f"{rel}\n" for rel in missing))
    still = [rel for rel in missing if not is_ignored_by_repo(root, rel)]
    if still:
        if original is None:
            path.unlink()
        else:
            _replace_text(path, original)
        return [], still
    return missing, []


def _replace_text(path: Path, text: str) -> None:
    """Write `text` to `path` through a temporary file, so a failed write cannot leave a half-written file.

    A symlinked `path` keeps its link and the target is replaced; the file mode is kept; the temporary file is removed on failure.
    """
    target = path.resolve() if path.is_symlink() else path
    tmp = target.with_name(target.name + ".tmp-sdlc-bmad-loop")
    try:
        tmp.write_text(text)
        if target.exists():
            shutil.copymode(target, tmp)
        os.replace(tmp, target)
    finally:
        tmp.unlink(missing_ok=True)


def setup_checkout(root: Path, clis: list[str], upgrade: bool, no_skills: bool, validate: bool,
                   choices: dict | None = None, trust_claude: bool = False, tool_tag_pinned: str | None = None,
                   skills_pinned: bool = False, tool_commit_pinned: str | None = None) -> int:
    """Run steps 1 to 6 of the module docstring for one checkout. Returns a process exit code."""
    version_problem = tool_version_problem(tool_tag_pinned)  # first, because the profile sync below reads the installed CLI's files
    if version_problem:
        print(f"  PROBLEM: {version_problem} Nothing was changed or run.")
        return 1
    commit_problem = tool_commit_problem(tool_commit_pinned)
    if commit_problem:
        print(f"  PROBLEM: {commit_problem} Nothing was changed or run.")
        return 1
    if not has_loop_setup(root):
        print("  WARNING: this branch does not contain the bmad-loop setup, so the profile written below will be "
              "uncommitted and the tree will be dirty, which bmad-loop refuses to run in.")
    # The committed Claude profile points at LOCAL_HOOK_PATH whichever CLIs this run registers, so a later plain
    # `bmad-loop init --cli claude` would write a personal path there. It is protected on every run.
    wanted = [LOCAL_HOOK_PATH] + ([COPILOT_HOOK_PATH] if "copilot" in clis else [])
    tracked = [rel for rel in wanted if is_tracked(root, rel)]
    if tracked:
        print(f"  PROBLEM: {', '.join(tracked)} is tracked by git, so ignoring it cannot keep a personal path out of it. "
              f"Run `git rm --cached {' '.join(tracked)}` and commit, then run this again. Nothing was changed.")
        return 1
    added, unignorable = ensure_ignored(root, wanted)
    if unignorable:
        print(f"  PROBLEM: {', '.join(unignorable)} is not gitignored here, and adding it to .gitignore did not help, "
              "so a later ignore rule is un-ignoring it, or git could not check it. `bmad-loop init` writes a personal path into that file. "
              "Fix the rule by hand. Nothing was changed.")
        return 1
    if added:
        print(f"  added to .gitignore so `bmad-loop init` cannot write a personal path into a tracked file: {', '.join(added)}. "
              "Commit .gitignore with the profile.")

    print("0. Personal BMAD answers:")
    try:
        outcome, message = ensure_personal_answers(root)
    except (GitError, OSError, ValueError) as e:  # ValueError covers a UnicodeError from an odd git name
        print(f"  PROBLEM: {e}")
        return 1
    print(f"  {'PROBLEM: ' if outcome == 'problem' else ''}{message}")
    if outcome == "problem":
        return 1

    print("1. Project profile:")
    try:
        print(f"  {PROJECT_PROFILE}: {sync_profile(root)}")
    except (RuntimeError, ValueError, OSError) as e:
        print(f"  PROBLEM: {e}")
        return 1

    print("2. bmad-loop init:")
    cmd = ["bmad-loop", "init", "--project", str(root)]
    for cli in clis:
        cmd += ["--cli", cli]
    if upgrade and not skills_pinned:
        cmd.append("--force-skills")  # a pinned repo gets its skills from bmad-update, so init must not overwrite them
    if no_skills:
        cmd.append("--no-skills")
    codex_file_existed = (root / CODEX_HOOK_FILE).exists()
    init_status = run(cmd, root)

    print("3. Shared hook files:")
    script = root / HOOK_SCRIPT
    script_unignorable = False
    if os.path.lexists(script) and not is_tracked(root, HOOK_SCRIPT):  # also after a failed init, which may have written it
        added_script, unignorable_script = ensure_ignored(root, [HOOK_SCRIPT])
        if added_script:
            print(f"  added to .gitignore: {HOOK_SCRIPT}, the hook script `bmad-loop init` wrote for this checkout. Commit .gitignore with the profile.")
        if unignorable_script:
            script_unignorable = True
            print(f"  PROBLEM: {HOOK_SCRIPT} is not gitignored and could not be, so the tree is dirty and bmad-loop will refuse to run. "
                  "Fix the ignore rule that covers it, then run this again.")
    # A hidden .codex/hooks.json is an earlier, deliberate Codex registration: keep its relay.
    # A relay that a failed init wrote is not kept: only a successful Codex init, or a file already hidden, keeps one.
    was_hidden = CODEX_HOOK_FILE in skip_worktree_files(root)
    codex_kept = ("codex" in clis and not init_status) or was_hidden
    cleaned, problems = clean_shared_files(root, keep=(CODEX_HOOK_FILE,) if codex_kept else ())
    print(f"  removed relay commands from: {', '.join(cleaned)}" if cleaned else "  no relay commands to remove")
    for p in problems:
        print(f"  PROBLEM: {p}")
    hide_failed = False
    if codex_kept and not init_status:
        hide_lines, hide_outcome = hide_codex_hooks_checked(root)
        for line in hide_lines or ["no relay in the working copy"]:
            print(f"  {CODEX_HOOK_FILE} in {line}")
        if hide_outcome in ("ok", "partial") and CODEX_HOOK_FILE in skip_worktree_files(root):
            print(f"  Before pulling a change to that file, run {INIT_SH} --release-codex.")
        if hide_outcome == "not-hidden" and was_hidden:
            hide_failed = "codex" in clis  # a claude-only run only warns about an earlier Codex registration
            print(f"  {'PROBLEM' if hide_failed else 'WARNING'}: the relay in this checkout was hidden by an earlier setup and was left in place, "
                  "but the hide step above failed. Fix the file named above, then run this again.")
        elif hide_outcome in ("not-hidden", "untracked"):
            hide_failed = True
            removed, more = clean_shared_files(root)
            leftover = root / CODEX_HOOK_FILE
            if hide_outcome == "untracked" and not codex_file_existed and leftover.is_file() and _holds_no_hooks(leftover):
                leftover.unlink()
                removed.append(f"{CODEX_HOOK_FILE} (deleted: nothing else was in it)")
            problems += more
            for extra in more:
                print(f"  PROBLEM: {extra}")
            print(f"  PROBLEM: the Codex relay could not be hidden. "
                  + (f"It was removed from {', '.join(removed)}, so Codex will not report to the loop until this is fixed." if removed
                     else "Fix the file named above by hand.")
                  + (f" Commit {CODEX_HOOK_FILE} or add it to .gitignore, then run this again." if hide_outcome == "untracked" else ""))
        elif hide_outcome == "partial":
            hide_failed = True
            print("  PROBLEM: the relay is hidden in this checkout, but the main checkout has no file for Codex to load, "
                  "so Codex will not report to the loop. Create and commit .codex/hooks.json in the main checkout, "
                  "or run Codex from the main checkout only.")
        elif hide_outcome == "none" and "codex" in clis:
            hide_failed = True
            print(f"  PROBLEM: `bmad-loop init` succeeded but {CODEX_HOOK_FILE} holds no relay command, so Codex will not report to the loop.")
    stray = [f for f in skip_worktree_files(root) if f != CODEX_HOOK_FILE]
    if stray:
        print(f"  WARNING: skip-worktree is set on {', '.join(stray)}. Run "
              "`git update-index --no-skip-worktree` on them so git sees upstream changes.")
    try:
        leaked = tracked_relay_files(root)
    except GitError as e:
        print(f"  PROBLEM: the leak check could not run: {e}")
        return 1
    if leaked:
        print(f"  PROBLEM: {leak_message(leaked)}")
        return 1
    if init_status:
        print(f"  `bmad-loop init` failed (exit {init_status}). The hook files above were checked and cleaned anyway.")
        return 1
    if problems or hide_failed or script_unignorable:
        return 1

    missing = codex_stages_without_no_daemon(root)
    if missing:
        state = "is running" if codex_daemon_running() else "is not running now but can start at any time"
        print(f"  WARNING: {no_daemon_message(missing)} The Codex background daemon {state}.")

    print("4. Policy choices:")
    chosen = {k: v for k, v in (choices or {}).items() if v}
    if chosen:
        try:
            for line in apply_policy(root, **chosen):
                print(f"  {POLICY_FILE}: {line}")
        except ValueError as e:
            print(f"  PROBLEM: {e}")
            return 1
    else:
        print(f"  none requested, so this run did not change {POLICY_FILE}. A policy fresh from `bmad-loop init` reads sprint-status.yaml and uses the CLI's default model.")
        print("  For a stories.yaml run, pass --stories <folder>; add --model and --effort to pin them.")

    trust_failed = False
    if "claude" in clis:
        print("5. Claude Code workspace trust:")
        state = claude_trust(root)
        if state != "trusted" and trust_claude:
            try:
                print(f"  {grant_claude_trust(root)}")
            except (ValueError, OSError) as e:
                print(f"  PROBLEM: {e}")
            state = claude_trust(root)
            trust_failed = state != "trusted"
        print(f"  {root}: {state}")
        if state != "trusted":
            print("  A run here will crash at launch on Claude Code's trust dialog. Either run `claude` once in this "
                  "directory and accept the prompts, or decide to trust it and re-run with --trust-claude.")

    if validate:
        print("6. bmad-loop validate (a missing sprint-status file and a dirty tree are expected before a run):")
        run(["bmad-loop", "validate", "--project", str(root)], root)
    if trust_failed:
        print("  The trust you asked for was not recorded, so the setup is reported as failed.")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
