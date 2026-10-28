#!/usr/bin/env python3
"""Checks, offline, that what sdlc_attribution_setup.py placed is still in place. Standard library only, Python 3.11.

Exit codes: 0 everything is as the manifest says, 1 at least one fault, 2 not in a repository. One line per fault on stdout, each saying
how to fix it. A line that starts with `note:` is not a fault and does not change the exit code: it says that commit trailers are off
for a reason the doctor cannot repair. Runs no AI tool and needs no network.
"""
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

sys.dont_write_bytecode = True  # the installer ships everything in the skill folder, so an import here must not leave a __pycache__ in it
sys.path.insert(0, str(Path(__file__).resolve().parent))
import sdlc_attribution_setup as setup  # noqa: E402


def faults(root):
    """(faults, notes): one line per fault found, each saying how to fix it, and the lines that start with `note:`. No fault means everything is in place."""
    try:
        manifest = setup.read_manifest(root)
    except (OSError, ValueError) as e:
        return [f"{setup.MANIFEST} cannot be read ({e}): delete it and run sdlc-attribution-setup.sh again"], []
    if manifest is None:
        return [f"{setup.MANIFEST} is missing: run sdlc-attribution-setup.sh --tools=<your tools>"], []
    tools = [t for t in manifest.get("tools", []) if isinstance(t, str)]
    fix = "run sdlc-attribution-setup.sh --tools=" + ",".join(tools)
    found = registration_faults(root, manifest, fix)
    copy_lines, present = copy_faults(root, tools)
    return found + copy_lines + hooks_path_faults(root, manifest, fix) + suite_faults(root, present), notes(root, manifest)


def notes(root, manifest):
    """Lines that start with `note:`, for a state that is not a fault but leaves commit trailers off or a worktree without its git hooks."""
    return conflict_notes(root, manifest) + worktree_notes(root, manifest) + legacy_notes(root, manifest)


def legacy_notes(root, manifest):
    """A line for each hook entry of the old attribution install that is still registered in a chosen tool's hook file."""
    found = []
    tools = [t for t in manifest.get("tools", []) if t in setup.TARGET_FILES]
    for tool in tools:
        name = setup.TARGET_FILES[tool]
        try:
            pairs = setup.legacy_commands(setup.read_text(root / name, root))
        except (OSError, ValueError):
            continue  # registration_faults reports a file it cannot read
        found += [setup.legacy_note(name, event, command, tools) for event, command in pairs]
    return found


def hook_texts(root, name):
    """The text of each file that could call the package's git hook `name`: the repository's own hook, husky's and the one in core.hooksPath."""
    folders = [Path(root) / setup.git(root, "rev-parse", "--git-path", "hooks")[1], Path(root) / ".husky", Path(root) / ".git-hooks"]
    code, current = setup.git(root, "config", "--type=path", "--get", "core.hooksPath")  # expands a leading ~
    if code != 0:
        current = setup.git(root, "config", "--get", "core.hooksPath")[1]
    if current:
        folders.append(Path(root) / current)  # an absolute value replaces the root
    texts = []
    for folder in folders:
        try:
            texts.append((folder / name).read_text())
        except (OSError, ValueError):
            continue
    # A tool that keeps its hooks in a config file (lefthook, pre-commit) is wired when the config names the package's script.
    for config in ("lefthook.yml", "lefthook.yaml", ".lefthook.yml", ".lefthook.yaml", ".pre-commit-config.yaml"):
        try:
            texts.append((Path(root) / config).read_text())
        except (OSError, ValueError):
            continue
    return texts


def active_hooks_path(root, manifest):
    """The folder commit trailers come from: the recorded hooks_path, else core.hooksPath when it is the package's own folder and exists.

    After a recorded conflict the manifest holds null, and the session-start hook may later set core.hooksPath without updating it.
    """
    if manifest.get("hooks_path"):
        return manifest["hooks_path"]
    current = setup.git(root, "config", "--get", "core.hooksPath")[1].rstrip("/")
    if current in {f"{d}/git-hooks" for d in (setup.CLAUDE_DIR, setup.AGENTS_DIR)} and (Path(root) / current).is_dir():
        return current
    return None


def conflict_notes(root, manifest):
    """A line when setup left git's hooks alone, as the manifest records with a null hooks_path, and the owner's hooks do not call ours yet."""
    if manifest.get("hooks_path"):
        return []
    conflict = setup.hooks_conflict(root)
    if conflict is None:
        # The session-start hook sets core.hooksPath once the conflict has gone, and it does not update the manifest. A path that is ours
        # and names a folder that exists means commit trailers are on.
        if active_hooks_path(root, manifest):
            return []
        return ["note: setup left git's hooks alone and nothing blocks them now, so no commit gets a trailer: run sdlc-attribution-setup.sh again to activate them"]
    unwired = [n for n in setup.COMMIT_HOOKS if not any(f"sdlc-attribution/scripts/git-hooks/{n}" in t for t in hook_texts(root, n))]
    if not unwired:
        return []
    owner = setup.hook_owner(root)
    where = {".husky": ".husky/", ".git-hooks": ".git-hooks/"}.get(owner[0] if owner else "", "")
    names = " and ".join(where + n for n in unwired)
    if owner is not None and not where:
        names += f" in {owner[0]}"
    return [f"note: {conflict}. Setup left git's hooks alone, so commit trailers stay off until the owner of those hooks adds the package's line to {names}: "
            "run sdlc-attribution-setup.sh to print the lines"]


def worktree_blocks(root):
    """One list of fields for each worktree git reports, the main one included.

    -z gives each field and each name exactly as it is. The default form quotes a name that holds a newline, so the doctor would
    skip that worktree. Git before 2.36 has no -z for this command, and then the default form is read instead.
    """
    code, out = setup.git(root, "worktree", "list", "--porcelain", "-z")
    if code != 0:
        return [block.splitlines() for block in setup.git(root, "worktree", "list", "--porcelain")[1].split("\n\n")]
    blocks, current = [], []
    for field in out.split("\0"):
        if field:
            current.append(field)
        elif current:
            blocks.append(current)
            current = []
    return blocks + ([current] if current else [])


def worktree_notes(root, manifest):
    """A line for each linked worktree that lacks the folder core.hooksPath names, where git therefore runs none of its hooks.

    The setting is stored once for the whole repository, so a worktree on a branch without the package inherits a path to nothing.
    """
    recorded = active_hooks_path(root, manifest)
    if not recorded:
        return []
    here = os.path.realpath(root)
    found = []
    for lines in worktree_blocks(root):
        if not lines or not lines[0].startswith("worktree "):
            continue
        other = lines[0][len("worktree "):]
        # A bare entry has no working folder, and a prunable one is a record of a folder that was deleted. Neither runs hooks.
        if "bare" in lines or any(line.startswith("prunable") for line in lines) or not Path(other).is_dir():
            continue
        if os.path.realpath(other) != here and not (Path(other) / recorded).is_dir():
            found.append(f"note: the worktree {other} has no {recorded}, so git runs none of its hooks there, including any in the repository's own hooks folder: "
                         "check out a branch that has the package in that worktree")
    return found


def registration_faults(root, manifest, fix):
    """A line for each recorded registration that is gone: a missing or unreadable file, or an entry that is not there any more."""
    found, by_file = [], {}
    for m in manifest.get("merged", []):
        by_file.setdefault(m["file"], []).append((m["event"], m["command"]))
    for name, pairs in sorted(by_file.items()):
        try:
            text = setup.read_text(root / name, root)
            if not (root / name).exists():
                found.append(f"{name} is missing, so its hooks are not registered: {fix}")
                continue
            hooks = json.loads(text).get("hooks", {})
        except (OSError, ValueError, AttributeError) as e:
            found.append(f"{name} cannot be read ({e}), so its hooks are not registered: {fix}")
            continue
        for event, command in pairs:
            entries = hooks.get(event, []) if isinstance(hooks, dict) else []
            if not any(command in setup.command_texts(entry) for entry in entries):
                found.append(f"registration missing in {name}: event {event}, command {command}: {fix}")
    return found


SUITE_SECONDS = 300
EXECUTABLE = ("track-ai-touch.sh", "test-track-ai-touch.sh", "ensure-hookspath.sh", "sdlc-attribution-setup.sh",
              "git-hooks/prepare-commit-msg", "git-hooks/post-commit")


def copy_faults(root, tools):
    """Lines for each chosen tool's skill folder that is gone or holds a script that is missing or not executable.

    Also returns the script folders that are present, in a stable order.
    """
    found, present = [], []
    for scripts in dict.fromkeys(setup.SKILL_DIRS[t] for t in tools if t in setup.SKILL_DIRS):
        folder = scripts.removesuffix("/scripts")
        if not (root / folder).is_dir():
            found.append(f"{folder} is missing, so its hooks cannot run: install the sdlc-attribution package again")
            continue
        present.append(scripts)
        for name in EXECUTABLE:
            path = root / scripts / name
            if not path.is_file():
                found.append(f"{scripts}/{name} is missing: install the sdlc-attribution package again")
            elif not path.stat().st_mode & 0o111:
                found.append(f"{scripts}/{name} is not executable: run chmod +x {scripts}/{name}")
    return found, present


def hooks_path_faults(root, manifest, fix):
    """A line when core.hooksPath is not the value setup recorded, or is that value but names a folder that is gone."""
    recorded = manifest.get("hooks_path")
    if not recorded:
        return []  # setup left git's hooks alone, so there is nothing to hold it to
    current = setup.git(root, "config", "--get", "core.hooksPath")[1].rstrip("/")
    if current != recorded:
        return [f"core.hooksPath is {current and repr(current) or 'unset'} but setup recorded '{recorded}': {fix}"]
    if not (root / current).is_dir():
        return [f"core.hooksPath points at {current}, which does not exist, so no commit trailers are added: {fix} to move it to a copy that is installed"]
    return []


def suite_faults(root, present):
    """Lines for a missing jq, or for each copy whose offline suite fails. The suite needs jq, so it does not run without it."""
    if shutil.which("jq") is None:
        return ["jq is not on PATH, so the offline suite was not run: install jq (for example brew install jq) and run the doctor again"]
    found = []
    for scripts in present:
        suite = root / scripts / "test-track-ai-touch.sh"
        if not suite.is_file() or not suite.stat().st_mode & 0o111:
            continue  # already reported as missing or not executable
        try:
            run = subprocess.run([str(suite)], capture_output=True, text=True, timeout=SUITE_SECONDS, cwd=root)
        except subprocess.TimeoutExpired:
            found.append(f"the offline suite in {scripts} did not finish in {SUITE_SECONDS} seconds: run {scripts}/test-track-ai-touch.sh to see where it stops")
            continue
        if run.returncode != 0:
            summary = next((line for line in reversed(run.stdout.splitlines()) if line.strip()), "no output")
            found.append(f"the offline suite fails in {scripts} ({summary.strip()}): run {scripts}/test-track-ai-touch.sh to see which test")
    return found


def main(argv=None, cwd=None):
    root = setup.find_root(Path(cwd or os.getcwd()).resolve())
    if root is None:
        print("error: not inside a git repository", file=sys.stderr)
        return 2
    found, extra = faults(root)
    lines = found + extra
    print("\n".join(lines) if lines else "ok")
    return 1 if found else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
