#!/usr/bin/env python3
"""Registers the attribution hooks for each chosen tool and activates the package's git hooks. Standard library only, Python 3.11.

Exit codes: 0 done or nothing to change, 1 an edit did not take, 2 not in a repository or bad arguments, 3 git hooks conflict.

Existing hook files are edited as text, not re-serialised, so every entry already there stays byte-for-byte. New entries are inserted
after the last existing one, in the indent the file already uses.
"""
import argparse
import json
import os
import re
import shlex
import shutil
import subprocess
import tempfile
import sys
from pathlib import Path, PurePosixPath

TEMPLATES = Path(__file__).resolve().parent / "templates"
CLAUDE_DIR = ".claude/skills/sdlc-attribution/scripts"
AGENTS_DIR = ".agents/skills/sdlc-attribution/scripts"
SKILL_DIRS = {"claude-code": CLAUDE_DIR, "codex": AGENTS_DIR, "cursor": AGENTS_DIR, "github-copilot": AGENTS_DIR}
TARGET_FILES = {"claude-code": ".claude/settings.json", "codex": ".codex/hooks.json", "cursor": ".cursor/hooks.json",
                "github-copilot": ".github/hooks/track-ai-touch.json"}
ALIASES = {"claude": "claude-code", "copilot": "github-copilot"}


class UsageError(Exception):
    pass


class Parser(argparse.ArgumentParser):
    def error(self, message):
        raise UsageError(message)


def claude_reaches_skill_by_link(root):
    """True when .claude/skills/sdlc-attribution and .agents/skills/sdlc-attribution are the same folder on disk.

    That is the default layout the clone wrapper makes, with one link per skill, and also the layout where .claude/skills is itself a link to
    .agents/skills. A separate real copy, or a link that points anywhere else, resolves to a different folder and does not count.
    """
    claude = Path(root) / ".claude" / "skills" / "sdlc-attribution"
    agents = Path(root) / ".agents" / "skills" / "sdlc-attribution"
    try:
        return claude.is_dir() and agents.is_dir() and claude.resolve() == agents.resolve()
    except OSError:
        return False


def chosen_tools(flag, root):
    """The tool names to set up: the --tools flag when given, else the declaration's list. Raises UsageError.

    The default layout declares codex, cursor and copilot and links the skill into .claude/skills for Claude Code, so a declaration that leaves out
    claude-code still gets Claude Code's hooks when that link is in place. A --tools flag is taken as written.
    """
    if flag is not None:
        names = flag.split(",")
    else:
        names = None
        declaration = Path(root) / "ai-sdlc.json"
        if declaration.exists():
            try:
                data = json.loads(declaration.read_bytes().decode())
            except (OSError, ValueError) as e:
                raise UsageError(f"cannot read ai-sdlc.json: {e}")
            if not isinstance(data, dict):
                raise UsageError("ai-sdlc.json must hold a JSON object")
            names = data.get("tools")
            if names == "all":
                names = list(TARGET_FILES)
            elif names is not None and not (isinstance(names, list) and all(isinstance(n, str) for n in names)):
                raise UsageError('ai-sdlc.json: "tools" must be a list of tool names or "all"')
    names = list(dict.fromkeys(ALIASES.get(n.strip(), n.strip()) for n in names or [] if n.strip()))
    if not names:
        raise UsageError("no tools chosen: pass --tools=<list> or declare tools in ai-sdlc.json")
    if flag is None and "claude-code" not in names and claude_reaches_skill_by_link(root):
        names.append("claude-code")
    unknown = [n for n in names if n not in TARGET_FILES]
    if unknown:
        raise UsageError(f"unknown tool {', '.join(unknown)}; known tools are {', '.join(TARGET_FILES)} (aliases: claude, copilot)")
    return names


class Node:
    """A JSON object, array or scalar, with its span in the text. An object's items are (key, Node) pairs; an array's are Nodes."""

    def __init__(self, kind, start, end, items=(), starts=()):
        self.kind, self.start, self.end, self.items, self.starts = kind, start, end, list(items), list(starts)

    def member(self, key):
        return next((v for k, v in self.items if k == key), None)


def _skip(t, i):
    while t[i] in " \t\r\n":
        i += 1
    return i


def _parse(t, i):
    """Parses the valid JSON value starting at or after i; returns (Node, index after it)."""
    i = _skip(t, i)
    start = i
    if t[i] in "{[":
        close, kind = ("}", "obj") if t[i] == "{" else ("]", "arr")
        items, starts, i = [], [], _skip(t, i + 1)
        while t[i] != close:
            starts.append(i)
            key = None
            if kind == "obj":
                key_end = _string_end(t, i)
                key = json.loads(t[i:key_end])
                i = _skip(t, _skip(t, key_end) + 1)
            node, i = _parse(t, i)
            items.append((key, node) if kind == "obj" else node)
            i = _skip(t, i)
            if t[i] == ",":
                i = _skip(t, i + 1)
        return Node(kind, start, i + 1, items, starts), i + 1
    if t[i] == '"':
        end = _string_end(t, i)
    else:
        end = i
        while t[end] not in ",]} \t\r\n":
            end += 1
    return Node("lit", start, end), end


def _string_end(t, i):
    i += 1
    while t[i] != '"':
        i += 2 if t[i] == "\\" else 1
    return i + 1


def command_texts(entry):
    """Every command text one hook entry carries, in either tool shape."""
    if not isinstance(entry, dict):
        return []
    return [h["command"] for h in entry.get("hooks", []) if isinstance(h, dict) and "command" in h] + ([entry["command"]] if "command" in entry else [])


LEGACY_COMMAND = re.compile(r"(?<![\w.-])\.(?:claude|codex|cursor|github)/hooks/(?:track-ai-touch|ensure-hookspath)\.sh(?![\w.-])")


def legacy_commands(text):
    """The (event, command) pairs of the old attribution install's hook entries in this hook file's text.

    The old install ran track-ai-touch.sh and ensure-hookspath.sh from .claude/hooks, .codex/hooks, .cursor/hooks or .github/hooks. The package's
    scripts sit under skills/sdlc-attribution/scripts, so no command of the package matches. An entry that holds any other command is not listed,
    because removing it would remove that command too.
    """
    try:
        hooks = json.loads(text).get("hooks", {}) if text.strip() else {}
    except (ValueError, AttributeError):
        return []
    found = []
    for event, entries in (hooks.items() if isinstance(hooks, dict) else []):
        for entry in (entries if isinstance(entries, list) else []):
            try:
                commands = command_texts(entry)
            except (TypeError, AttributeError):
                continue  # an entry of a shape this package does not know is not an old entry
            if commands and all(isinstance(c, str) and LEGACY_COMMAND.search(c) for c in commands):
                found += [(event, c) for c in commands]
    return list(dict.fromkeys(found))


def legacy_note(name, event, command, tools):
    """The `note:` line for one old hook entry that is still registered. Setup and the doctor print the same words."""
    if "ensure-hookspath.sh" in command:
        what = f"still runs the old session-start script ({event}), which sets core.hooksPath and can fight the package's setting"
    else:
        what = f"still runs the old attribution hook ({event}). Each edit is recorded twice until it goes"
    flags = f"--tools={','.join(tools)} " if tools else ""
    return f"note: {name} {what}: {command}. Run sdlc-attribution-setup.sh {flags}--remove-legacy to remove it"


class Editor:
    """Inserts values into JSON text without touching anything already there."""

    def __init__(self, text):
        if not isinstance(json.loads(text), dict):  # raises ValueError on a file we must not touch
            raise ValueError("the top level is not an object")
        self.nl = "\r\n" if "\r\n" in text else "\n"
        found = re.search(r"^([ \t]+)\S", text, re.M)
        self.unit = found.group(1) if found else "  "
        self.text = text

    def root(self):
        return _parse(self.text, 0)[0]

    def _indent_of(self, node, depth):
        """The indent of a container's items: that of the last item when it starts its own line, else depth * unit."""
        if node.items:
            last = node.items[-1]
            start = (last[1] if node.kind == "obj" else last).start
            line_start = self.text.rfind("\n", 0, start) + 1
            if not self.text[line_start:start].strip():
                return self.text[line_start:start]
        return self.unit * (depth + 1)

    def _insert(self, node, depth, piece):
        """Adds `piece` (already indented text for one item) as the last item of the container."""
        if node.items:
            last = node.items[-1]
            end = (last[1] if node.kind == "obj" else last).end
            self.text = f"{self.text[:end]},{self.nl}{piece}{self.text[end:]}"
        else:
            self.text = f"{self.text[:node.start + 1]}{self.nl}{piece}{self.nl}{self.unit * depth}{self.text[node.end - 1:]}"

    def _dump(self, value, indent):
        lines = json.dumps(value, indent=self.unit, ensure_ascii=False).split("\n")
        return self.nl.join([lines[0]] + [indent + line for line in lines[1:]])

    def remove_item(self, node, index):
        """Deletes one member of an object or one element of an array, with its comma, and nothing else."""
        values = [v for _, v in node.items] if node.kind == "obj" else node.items
        last = len(values) - 1
        if last == 0:
            self.text = self.text[:node.start + 1] + self.text[node.end - 1:]
        elif index == last:
            self.text = self.text[:values[index - 1].end] + self.text[values[index].end:]
        else:
            self.text = self.text[:node.starts[index]] + self.text[node.starts[index + 1]:]

    def add_member(self, node, depth, key, value):
        indent = self._indent_of(node, depth)
        self._insert(node, depth, f"{indent}{json.dumps(key)}: {self._dump(value, indent)}")

    def add_element(self, node, depth, value):
        indent = self._indent_of(node, depth)
        self._insert(node, depth, indent + self._dump(value, indent))


def merge_hooks(text, template):
    """Returns the text with the template's entries added, skipping any whose command is already registered."""
    ed = Editor(text if text.strip() else "{}\n")
    for key, value in template.items():
        if key != "hooks" and ed.root().member(key) is None:
            ed.add_member(ed.root(), 0, key, value)
    if ed.root().member("hooks") is None:
        ed.add_member(ed.root(), 0, "hooks", template["hooks"])
    for event, entries in template["hooks"].items():
        hooks = ed.root().member("hooks")
        if hooks.kind != "obj":
            raise ValueError("hooks is not an object")
        array = hooks.member(event)
        if array is None:
            ed.add_member(hooks, 1, event, entries)
            continue
        if array.kind != "arr":
            raise ValueError(f"hooks.{event} is not a list")
        have = {c for e in json.loads(ed.text)["hooks"][event] for c in command_texts(e)}
        for entry in entries:
            if not set(command_texts(entry)) <= have:
                ed.add_element(ed.root().member("hooks").member(event), 2, entry)
                have |= set(command_texts(entry))
    return ed.text if ed.text.endswith("\n") or ed.text == text else ed.text + "\n"


def unmerge_hooks(text, ours):
    """Returns the text without the entries whose every command is one of `ours`, a set of (event, command) pairs.

    An event left with no entry loses its key, and so does `hooks` when no event is left. Anything else stays byte for byte.
    """
    ed = Editor(text)
    if not _is(ed.root().member("hooks"), "obj"):
        return text
    removed = False
    for event in [k for k, _ in ed.root().member("hooks").items]:
        commands = {c for e, c in ours if e == event}
        array = ed.root().member("hooks").member(event)
        if not commands or not _is(array, "arr"):
            continue
        entries = json.loads(ed.text)["hooks"][event]
        mine = [i for i, entry in enumerate(entries) if command_texts(entry) and set(command_texts(entry)) <= commands]
        if len(mine) == len(entries) and mine:
            keys = [k for k, _ in ed.root().member("hooks").items]
            ed.remove_item(ed.root().member("hooks"), keys.index(event))
        else:
            for i in reversed(mine):
                ed.remove_item(ed.root().member("hooks").member(event), i)
        removed = removed or bool(mine)
    if removed and not ed.root().member("hooks").items:
        ed.remove_item(ed.root(), [k for k, _ in ed.root().items].index("hooks"))
    return ed.text


def _is(node, kind):
    return node is not None and node.kind == kind


def holds_only_our_shape(text):
    """True when the JSON has no hook entry and no key the package's templates do not define, so a file we created can go."""
    data = json.loads(text)
    return set(data) <= {"hooks", "version"} and not any(data.get("hooks", {}).values())


def unmerge_lines(text, lines):
    """Returns the text without the last occurrence of each line."""
    parts = text.split("\n")
    for line in lines:
        for i in range(len(parts) - 1, -1, -1):
            if parts[i].rstrip("\r") == line:
                del parts[i]
                break
    return "\n".join(parts)


def merge_lines(text, lines):
    """Returns the text with each line appended unless it is already a line of the file."""
    have = set(text.split("\n"))
    missing = [line for line in lines if line not in have]
    if not missing:
        return text
    return text + ("" if not text or text.endswith("\n") else "\n") + "\n".join(missing) + "\n"


def ignored_by_git(root, paths):
    """(path, rule) for each of `paths` that git ignores, in order. A tracked path is never ignored. `rule` is source:line:pattern as `git check-ignore -v` prints it.

    Each path is asked about alone, because git refuses a whole call when one path lies beyond a symbolic link, and the links layout puts
    the hook scripts beyond one. A path beyond a link is asked about at the place the link points, which is the file a commit holds.
    A rule that starts with `!` re-includes the path, so it is not a finding.
    """
    top = os.path.realpath(root)
    found = []
    for path in paths:
        real = os.path.realpath(os.path.join(root, path))
        if real != top and not real.startswith(top + os.sep):
            continue  # the link points outside the repository, so no commit holds this file
        asked = os.path.relpath(real, top)
        code, out = git(root, "check-ignore", "-v", "--", asked)
        if code != 0:
            continue
        rule, _, _ = out.partition("\t")
        parts = rule.split(":", 2)
        if len(parts) < 3 or parts[2].startswith("!"):
            continue  # output git does not normally give, or a rule that re-includes the path
        found.append((asked, rule))
    return found


def git(root, *args):
    """Runs git in the repository; returns (exit code, stripped stdout)."""
    run = subprocess.run(["git", "-C", str(root), *args], capture_output=True, text=True)
    return run.returncode, run.stdout.strip()


def read_text(path, root):
    """The file's text with its line endings as they are, or "" when there is no file. Raises OSError or ValueError when unreadable.

    A path that resolves outside the repository `root` is refused, whether the file or one of its folders is the symlink,
    because the file it reaches may be shared with other repositories. The root is the repository being set up, never one found
    from the link's target, which could be another repository. Every read of a file the package may later write goes through here.
    """
    real = Path(os.path.realpath(path))
    if real != path.absolute() and not real.is_relative_to(Path(os.path.realpath(root))):
        raise ValueError(f"{path.name} reaches {real} through a symlink, which is outside the repository")
    return _read(path)


def _read(path):
    """The file's text with no containment check: only for the read-back of a file write_verified has just written."""
    return path.read_bytes().decode() if path.exists() else ""


def write_verified(path, text):
    """Writes the file through a temporary file in the same folder, then reads it back. Raises OSError if it did not take.

    A symlink is followed, so the file it points at is the one that changes and the link stays.
    """
    path = Path(os.path.realpath(path))
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=path.parent, prefix=f".{path.name}.")
    try:
        with os.fdopen(fd, "w", newline="") as f:
            f.write(text)
        if path.exists():
            os.chmod(tmp, path.stat().st_mode & 0o7777)
        else:
            os.chmod(tmp, 0o644)
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)
    if _read(path) != text:
        raise OSError("the file does not hold what was written")


COMMIT_HOOKS = ("prepare-commit-msg", "post-commit")


# What follows `sh -c '<script>' sh` so the script receives git's hook arguments. Verified with pre-commit 4.7.0 and lefthook 1.13.6 on 2026-10-23.
# A husky or .git-hooks file is run by git, so "$@" holds the arguments. Lefthook runs the line in a shell with no arguments, and fills in {0}
# with git's. Pre-commit runs the entry without a shell and appends the commit message file itself, so a trailing "$@" would arrive as that text.
HOOK_ARGUMENTS = {"lefthook": "{0}", "pre-commit": ""}


def hook_line(ours, name, tool=None):
    """The one line the owner of the repository's git hooks adds, in the form that tool needs. It does nothing once the package folder is gone."""
    script = f'h="$(git rev-parse --show-toplevel)/{ours}/{name}"; [ -f "$h" ] && [ -x "$h" ] || exit 0; exec "$h" "$@"'
    tail = HOOK_ARGUMENTS.get(tool, '"$@"')
    return f"sh -c '{script}' sh" + (f" {tail}" if tail else "")
MANIFEST = "ai-sdlc/sdlc-attribution-manifest.json"


def added_commands(old_text, template):
    """The (event, command) pairs merge_hooks adds to this text: those of every template entry not already registered."""
    have = json.loads(old_text).get("hooks", {}) if old_text.strip() else {}
    found = []
    for event, entries in template["hooks"].items():
        known = {c for e in have.get(event, []) for c in command_texts(e)}
        found += [(event, c) for e in entries if not set(command_texts(e)) <= known for c in command_texts(e)]
    return found


def read_manifest(root):
    """The recorded manifest as a dict, or None when there is none. Raises OSError or ValueError when it cannot be read."""
    text = read_text(root / MANIFEST, root)
    if not text:
        return None
    data = json.loads(text)
    if not isinstance(data, dict):
        raise ValueError("the top level is not an object")
    _check_manifest_shape(data)
    return data


def _relative(value):
    """True for a non-empty string path that stays inside the repository."""
    return isinstance(value, str) and bool(value) and not PurePosixPath(value).is_absolute() and ".." not in PurePosixPath(value).parts


def _check_manifest_shape(data):
    """Raises ValueError unless every field is the type setup writes, and every path is relative and stays inside the repository."""
    strings = lambda v: isinstance(v, list) and all(isinstance(x, str) for x in v)
    merged = data.get("merged", [])
    if not (strings(data.get("tools", [])) and strings(data.get("created", [])) and strings(data.get("gitattributes", []))):
        raise ValueError("tools, created and gitattributes must be lists of strings")
    if not (isinstance(merged, list) and all(isinstance(m, dict) and all(isinstance(m.get(k), str) for k in ("file", "event", "command")) for m in merged)):
        raise ValueError("merged must be a list of objects with file, event and command")
    hooks_path = data.get("hooks_path")
    if hooks_path is not None and not _relative(hooks_path):
        raise ValueError("hooks_path must be null or a relative path")
    if not all(_relative(p) for p in [*data.get("created", []), *(m["file"] for m in merged)]):
        raise ValueError("every file must be a relative path inside the repository")


def linked_worktrees(root):
    """The names of the repository's linked worktrees whose folder still exists, whichever worktree `root` is.

    Each linked worktree has a folder under <git-common-dir>/worktrees whose `gitdir` file names the worktree's own .git file. One that
    was deleted without `git worktree remove` is skipped, since it has no hooks to lose. The main checkout is not listed, so a result
    that is not empty means the repository has a worktree besides this one, from the main checkout and from a linked worktree alike.
    """
    common = Path(root) / git(root, "rev-parse", "--git-common-dir")[1]  # an absolute value replaces the root
    try:
        entries = sorted((common / "worktrees").iterdir())
    except OSError:
        return []
    found = []
    for entry in entries:
        try:
            gitdir = (entry / "gitdir").read_text().strip()
            if gitdir and Path(gitdir).exists():  # an empty name would be read as the current folder
                found.append(entry.name)
        except (OSError, ValueError):
            continue
    return found


def worktree_conflict(root, dangling=None, ours=None):
    """Why core.hooksPath must not be written here, or None. ensure-hookspath.sh holds the same rule in shell.

    git stores the setting once for every worktree. Writing it from one worktree also sets it in the others, and a worktree on a branch
    without the package would then point at a folder that does not exist, so git would run none of its hooks, the repository's own included.
    `dangling` is the current value when it names a folder that is gone. Setup keeps it, so the reason says how to repoint it by hand.
    """
    if not linked_worktrees(root):
        return None
    reason = ("this repository has linked worktrees, and core.hooksPath is stored once for all of them, so setting it here would also set it "
              "in worktrees whose branch has no such folder, where git would then run none of their hooks")
    if dangling:
        reason += (f". core.hooksPath still names '{dangling}', a folder that does not exist here, so git runs no hooks from it. "
                   f"To repoint it for every worktree, run: git config --local core.hooksPath {ours}")
    return reason


# Tools that own git's hooks. Each either sets core.hooksPath or refuses to install while it is set, so the package cannot share git's hooks with them.
# `file` is the marker at the repository root, `hint` says where the package's two lines go. ensure-hookspath.sh holds the same list in shell.
HOOK_OWNERS = (
    (".husky", "husky", "add each line to the husky hook of the same name: .husky/prepare-commit-msg and .husky/post-commit."),
    ("lefthook.yml", "lefthook", "add each line as the `run` of a command under prepare-commit-msg and under post-commit in lefthook.yml. Lefthook fills in {0} with git's arguments."),
    ("lefthook.yaml", "lefthook", "add each line as the `run` of a command under prepare-commit-msg and under post-commit in lefthook.yaml. Lefthook fills in {0} with git's arguments."),
    (".lefthook.yml", "lefthook", "add each line as the `run` of a command under prepare-commit-msg and under post-commit in .lefthook.yml. Lefthook fills in {0} with git's arguments."),
    (".lefthook.yaml", "lefthook", "add each line as the `run` of a command under prepare-commit-msg and under post-commit in .lefthook.yaml. Lefthook fills in {0} with git's arguments."),
    (".pre-commit-config.yaml", "pre-commit", "add each line as the `entry` of a local hook in .pre-commit-config.yaml, once with `stages: [prepare-commit-msg]` and once with `stages: [post-commit]`, and give each `language: system` and `always_run: true`. Leave `pass_filenames` at its default of true, because pre-commit adds the commit message file to the entry. Run `pre-commit install --hook-type prepare-commit-msg --hook-type post-commit` once."),
    (".git-hooks", "a .git-hooks folder", "add each line to the hook of the same name: .git-hooks/prepare-commit-msg and .git-hooks/post-commit."),
)


def hook_owner(root):
    """(marker, tool, hint) for the first other tool that manages git's hooks found at the repository root, or None. A package.json counts when its text sets core.hooksPath."""
    for marker, tool, hint in HOOK_OWNERS:
        if (Path(root) / marker).exists():
            return marker, tool, hint
    try:
        if "core.hooksPath" in (Path(root) / "package.json").read_text():
            return "package.json", "a package.json script", "add each line to the hook of the same name in the folder that script points core.hooksPath at, usually .git-hooks/prepare-commit-msg and .git-hooks/post-commit."
    except (OSError, ValueError):
        pass
    return None


def hooks_conflict(root):
    """Why the package must not take over git's hooks here, or None.

    core.hooksPath is read as git sees it, so a global or system value counts. A hook file inside a core.hooksPath that is not
    ours is covered by the first check, since that folder is not ours either.

    With core.hooksPath unset, git runs the hooks in the repository's own hooks folder, and setting the path would switch them
    all off. So any executable file there that is not a `.sample` is a conflict, and so is a file named like one of ours, however
    it is permissioned. A `.husky` folder is a conflict too, because husky sets core.hooksPath itself when it installs.
    ensure-hookspath.sh holds the same rule in shell; the tests run both on the same cases.
    """
    current = git(root, "config", "--get", "core.hooksPath")[1]
    if current and current.rstrip("/") not in {f"{d}/git-hooks" for d in (CLAUDE_DIR, AGENTS_DIR)}:
        return f"core.hooksPath is already set to '{current}'"
    if not current:
        folder = Path(root) / git(root, "rev-parse", "--git-path", "hooks")[1]
        try:
            hooks = sorted(folder.iterdir()) if folder.is_dir() else []
        except OSError:
            return f"{folder} cannot be read, so setup cannot tell which hooks core.hooksPath would silence"
        for hook in hooks:
            if hook.is_file() and (hook.name in COMMIT_HOOKS or (os.access(hook, os.X_OK) and not hook.name.endswith(".sample"))):
                return f"{folder.relative_to(root) if folder.is_relative_to(root) else folder}/{hook.name} exists and core.hooksPath would silence it"
        owner = hook_owner(root)
        if owner is not None:
            if owner[0] == ".husky":
                return "a .husky folder exists, and husky sets core.hooksPath itself when it installs, which would replace ours"
            return f"{owner[0]} exists, so {owner[1]} manages git's hooks, and setting core.hooksPath would replace or silence them"
        return worktree_conflict(root)
    return None


def find_root(start):
    """The repository root: git's top level, else the nearest folder holding a .git, else None."""
    code, top = git(start, "rev-parse", "--show-toplevel")
    if code == 0 and top:
        return Path(top)
    return next((d for d in [start, *start.parents] if (d / ".git").exists()), None)


def remove_empty_parents(root, path):
    """Removes each folder above `path` that is now empty, stopping at the first that is not and never at the repository root."""
    for folder in path.parents:
        if folder == root or not folder.is_relative_to(root):
            break
        try:
            folder.rmdir()
        except OSError:
            break


def remove(root):
    """Undoes what the manifest lists. Returns the exit code."""
    try:
        manifest = read_manifest(root)
    except (OSError, ValueError) as e:
        print(f"error: cannot read {MANIFEST}, which is left untouched: {e}", file=sys.stderr)
        return 1
    if manifest is None:
        print(f"Nothing is recorded: there is no {MANIFEST}, so there is nothing to remove.")
        return 0
    created = set(manifest.get("created", []))
    ours = {}
    for m in manifest.get("merged", []):
        ours.setdefault(m["file"], set()).add((m["event"], m["command"]))
    lines = manifest.get("gitattributes", [])
    names = sorted(set(ours) | created | ({".gitattributes"} if lines else set()))
    plan = []  # (path, new text or None to delete)
    for name in names:
        path = root / name
        try:
            old = read_text(path, root)
            if not path.exists():
                continue
            new = unmerge_lines(old, lines) if name == ".gitattributes" else unmerge_hooks(old, ours.get(name, set()))
            drop = name in created and (not new.strip() if name == ".gitattributes" else holds_only_our_shape(new))
        except (OSError, ValueError) as e:
            print(f"error: cannot edit {name}, and nothing was changed: {e}", file=sys.stderr)
            return 1
        plan.append((path, None if drop else new, old))
    for path, new, old in plan:
        if new == old:
            continue
        try:
            if new is None:
                path.unlink()
                remove_empty_parents(root, path)
            else:
                write_verified(path, new)
        except OSError as e:
            print(f"error: {path.relative_to(root)} was not updated: {e}", file=sys.stderr)
            return 1
    recorded = manifest.get("hooks_path")
    if recorded and git(root, "config", "--local", "--get", "core.hooksPath")[1].rstrip("/") == recorded:
        if linked_worktrees(root):
            # Unsetting it would switch off the commit hooks in every other worktree that still has the package.
            print(f"core.hooksPath is shared with this repository's other worktrees, so it is still set to {recorded}. "
                  "Keep that folder until you unset the path, because git runs no hooks from a path that names a missing folder. "
                  "Once no worktree needs it, unset it with: git config --local --unset core.hooksPath")
        else:
            git(root, "config", "--local", "--unset", "core.hooksPath")
    (root / MANIFEST).unlink()
    remove_empty_parents(root, root / MANIFEST)
    return 0


def _parse_args(argv):
    parser = Parser(prog="sdlc-attribution-setup", description="Registers the attribution hooks for the chosen tools.")
    parser.add_argument("--tools", help="comma-separated tool names; overrides ai-sdlc.json")
    parser.add_argument("--check", action="store_true", help="exit 1 and name each file or setting that setup would still change; write nothing")
    parser.add_argument("--remove", action="store_true", help="undo what the manifest lists; cannot be combined with --check or --dry-run")
    parser.add_argument("--remove-legacy", action="store_true",
                        help="also remove the old attribution install's hook entries from the chosen tools' hook files; without it they are only reported")
    parser.add_argument("--dry-run", action="store_true", help="print what would change and write nothing")
    return parser.parse_args(argv)


def main(argv, cwd=None):
    root = find_root(Path(cwd or os.getcwd()).resolve())
    if root is None:
        print("error: not inside a git repository", file=sys.stderr)
        return 2
    try:
        args = _parse_args(argv)
        if args.remove and (args.check or args.dry_run):
            raise UsageError("--remove cannot be combined with --check or --dry-run")
        if args.remove and args.remove_legacy:
            raise UsageError("--remove-legacy cannot be combined with --remove")
        tools = None if args.remove else chosen_tools(args.tools, root)
    except UsageError as e:
        print(f"error: {e}", file=sys.stderr)
        return 2
    if args.remove:
        return remove(root)
    if shutil.which("jq") is None:
        print("warning: jq is not on PATH. The hook records no edited files without it, so no commit gets a trailer. Install jq (for example brew install jq).", file=sys.stderr)
    plan = []
    try:
        previous = read_manifest(root) or {}
    except (OSError, ValueError) as e:
        print(f"error: cannot read {MANIFEST}, which is left untouched: {e}", file=sys.stderr)
        return 1
    created, merged, removed_lines = [], [], []
    for tool in tools:
        template = json.loads((TEMPLATES / f"{tool}.json").read_text().replace("{SKILL_DIR}", SKILL_DIRS[tool]))
        target = root / TARGET_FILES[tool]
        try:
            old = read_text(target, root)
            legacy = legacy_commands(old)
            new = merge_hooks(unmerge_hooks(old, set(legacy)) if args.remove_legacy and legacy else old, template)
        except (OSError, ValueError) as e:
            print(f"error: cannot merge into {TARGET_FILES[tool]}, which is left untouched: {e}", file=sys.stderr)
            return 1
        for event, command in legacy:
            if not args.remove_legacy:
                print(legacy_note(TARGET_FILES[tool], event, command, tools))
            elif args.dry_run or args.check:
                print(f"would remove the old attribution hook from {TARGET_FILES[tool]}: {command}")
            else:
                removed_lines.append(f"removed the old attribution hook from {TARGET_FILES[tool]}: {command}")  # said only once the write has taken
        if new != old:
            plan.append((target, new))
        if not target.exists():
            created.append(TARGET_FILES[tool])
        merged += [{"file": TARGET_FILES[tool], "event": event, "command": c} for event, c in added_commands(old, template)]
    # The Claude Code copy comes first whatever the order of the tools, because core.hooksPath points at the first copy that exists and the
    # session-start hook that repairs it runs only under Claude Code.
    skill_dirs = sorted(dict.fromkeys(SKILL_DIRS[t] for t in tools), key=lambda d: d != SKILL_DIRS["claude-code"])
    attributes = root / ".gitattributes"
    try:
        old = read_text(attributes, root)
    except (OSError, ValueError) as e:
        print(f"error: cannot read .gitattributes, which is left untouched: {e}", file=sys.stderr)
        return 1
    lines = [line for d in skill_dirs for line in (f"{d}/*.sh text eol=lf", f"{d}/git-hooks/* text eol=lf")]
    new = merge_lines(old, lines)
    added_lines = [line for line in lines if line not in set(old.split("\n"))]
    if not attributes.exists():
        created.append(".gitattributes")
    if new != old:
        plan.append((attributes, new))
    pending = [str(target.relative_to(root)) for target, _ in plan]
    # A file that git ignores is written, and then it is in no commit. That is right for a local install and wrong when the team expects the hook in the repository.
    written = [str(target.relative_to(root)) for target, _ in plan] + [f"{d}/git-hooks/{n}" for d in skill_dirs for n in COMMIT_HOOKS]
    for ignored, rule in ignored_by_git(root, written):
        print(f"warning: git ignores {ignored} (rule {rule}), so it will not be committed. That is right when each developer installs locally, and wrong when the team expects the hook in the repository.", file=sys.stderr)

    def manifest_text_for(hooks_path):
        merged_all = {(m["file"], m["event"], m["command"]) for m in merged + previous.get("merged", [])}
        manifest = {"schema": 1, "tools": sorted({*tools, *previous.get("tools", [])}), "created": sorted({*created, *previous.get("created", [])}),
                    "merged": [dict(zip(("file", "event", "command"), m)) for m in sorted(merged_all)],
                    "gitattributes": sorted({*added_lines, *previous.get("gitattributes", [])}),
                    "hooks_path": hooks_path, "hooks_copy": hooks_path[:-len("/git-hooks")] if hooks_path else None}
        return json.dumps(manifest, indent=2, ensure_ascii=False) + "\n"

    if args.dry_run or args.check:
        for name in pending:
            print(f"{'missing in' if args.check else 'would update'} {name}")
    else:
        # The manifest comes first, so a write that fails below leaves a record that --remove can finish from.
        try:
            write_verified(root / MANIFEST, manifest_text_for(previous.get("hooks_path")))
        except OSError as e:
            print(f"error: {MANIFEST} was not updated: {e}", file=sys.stderr)
            return 1
        for target, new in plan:
            try:
                write_verified(target, new)
            except OSError as e:
                print(f"error: {target.relative_to(root)} was not updated: {e}", file=sys.stderr)
                return 1
        for line in removed_lines:
            print(line)
    survivors = [d for d in skill_dirs if (root / d / "git-hooks").is_dir()]
    ours = f"{(survivors or skill_dirs)[0]}/git-hooks"
    conflict = hooks_conflict(root)
    hooks_path = None
    if conflict is None:
        current = git(root, "config", "--get", "core.hooksPath")[1].rstrip("/")
        dangling = bool(current) and not (root / current).is_dir()
        move = not current or (dangling and bool(survivors) and current != ours)
        # hooks_conflict covers an unset path; this covers a dangling one
        conflict = worktree_conflict(root, current if dangling else None, ours) if move else None
    if conflict is None:
        hooks_path = ours if move else current
        if move:
            if args.dry_run or args.check:
                pending.append("core.hooksPath")
                what = "unset" if not current else f"dangling ({current})"
                print(f"{what} core.hooksPath" if args.check else f"would set core.hooksPath to {ours}")
            else:
                git(root, "config", "--local", "core.hooksPath", ours)
                if git(root, "config", "--get", "core.hooksPath")[1] != ours:
                    print("error: core.hooksPath was not set", file=sys.stderr)
                    return 1
    else:
        print(f"Git hooks conflict: {conflict}. Setup left git's hooks alone. To get commit trailers, add each line to your own hook of the same name, creating the file if there is none:")
        owner = hook_owner(root)
        # A set core.hooksPath means git runs the hook files in that folder, whatever other hook configs sit in the repository. A marker file for
        # lefthook or pre-commit then does not say which tool runs the line, so the shell form that a hook file needs is printed (PR 131 review).
        active = git(root, "config", "--get", "core.hooksPath")[1]
        by_path = bool(active) and owner is not None and owner[1] in HOOK_ARGUMENTS
        for name in COMMIT_HOOKS:
            print(f"  {hook_line(ours, name, owner[1] if owner is not None and not by_path else None)}")
        if by_path:
            print(f"core.hooksPath is set to '{active}', so git runs the hook files in that folder: add each line to the hook file of the same name there, creating the file if there is none.")
        elif owner is not None:
            print(f"For {owner[1]}, {owner[2]}")
    hooks_path = hooks_path or previous.get("hooks_path")
    manifest_text = manifest_text_for(hooks_path)
    if args.dry_run or args.check:
        if read_text(root / MANIFEST, root) != manifest_text:
            pending.append(MANIFEST)
            print(f"{'missing in' if args.check else 'would update'} {MANIFEST}")
    else:
        try:
            write_verified(root / MANIFEST, manifest_text)
        except OSError as e:
            print(f"error: {MANIFEST} was not updated: {e}", file=sys.stderr)
            return 1
    if "github-copilot" in tools:
        print("Copilot reads hooks only from your personal folder. Once per machine, copy the file setup wrote:\n"
              f"  mkdir -p ~/.copilot/hooks && cp {shlex.quote(str(root / TARGET_FILES['github-copilot']))} ~/.copilot/hooks/")
    if args.check and pending:
        return 1
    return 3 if conflict else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
