#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Local patches to the installed bmad-loop tool, reapplied after every install or upgrade.

bmad-loop is a machine-global uv tool installed from Git. `uv tool install` and `uv tool upgrade --reinstall`
rebuild its environment, which discards any edit. This module holds the edits this repository keeps, and
sdlc_bmad_loop_init.py and scripts/bmad-update.py call it so they come back.

Each patch is `{id, file, old, new}`, the same shape as the package build's patches (build/bmad/patches/).
For each patch `apply` reports one state:

  applied  `old` was found and replaced by `new`.
  already  `new` is present, so an earlier run did it.
  fixed    neither text is present and the behaviour check passes, so upstream fixed it. Retire the patch.
  manual   neither text is present and the behaviour check fails. The file is left untouched. Update the patch.
  missing  (check mode only) `old` is present, so the patch has not been applied and would be.

Patches:

  tally-unique-messages  bmad_loop/tokens.py `tally()` sums every transcript line that has a usage block.
                         Claude Code writes one API response on several lines (one per content block), so
                         bmad-loop through 0.12.0 counts a Claude message about twice. Its journal's
                         `tokens` and `tokens_weighted` and its token budgets are inflated by that factor.
                         The patch keeps the last line per message id, as the Gemini parser in the same file does.
                         Evidence: _bmad-output/spikes/RAD-88329-token-spend/REPORT.md.

  status-names-the-state bmad_loop/cli.py `cmd_status` prints "in progress (or interrupted)" for every run that is not
                         finished, paused or in a graceful stop, so a crashed, stopped or dead run reads like a live one
                         and a monitor that matches "interrupted" fires on every poll (finding F-002). The patch prints
                         `crashed`, `stopped`, `in progress` (engine alive), `interrupted (the engine is not running)`
                         (engine dead), and keeps the old words only when liveness is unknown. `status --json` is unchanged.

Run `uv run sdlc_bmad_loop_patches.py` to apply them to the installed tool, or add `--check` to only report.
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

# The bmad-loop version the patch text was written against. bmad-pins.json pins bmad-loop to "v" + this, and
# `apply` reports every patch as manual when the pin differs, because the patch text is specific to this version.
TARGET_VERSION = "0.12.0"
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


PINS_FILE = _repo_root() / "bmad-pins.json"
# This file as a person types it from the repository root.
PATCHES_PY = Path(os.path.relpath(Path(__file__).resolve(), _repo_root())).as_posix()


# A repository without bmad-pins.json (one that received this script from a package) records the tag in this file instead: {"bmad-loop": "v0.12.0"}.
PIN_FILE = Path(__file__).with_name("bmad-loop-pin.json")


def pinned_tag() -> str:
    """The bmad-loop tag bmad-pins.json holds, or `PIN_FILE` when the repository has no bmad-pins.json, for example "v0.12.0".

    Raises OSError, ValueError, KeyError or TypeError when unreadable.
    """
    if PINS_FILE.exists():
        tag = json.loads(PINS_FILE.read_text(encoding="utf-8"))["modules"]["bmad-loop"]
    else:
        tag = json.loads(PIN_FILE.read_text(encoding="utf-8"))["bmad-loop"]
    if not isinstance(tag, str):
        raise TypeError(f"the bmad-loop pin must be a string, and it is {tag!r}")
    return tag


TALLY_OLD = '''def tally(transcript_path: Path) -> TokenUsage:
    total = TokenUsage()
    for entry in _jsonl_entries(transcript_path):
        usage = _usage_block(entry)
        if not usage:
            continue
        total.add(
            TokenUsage(
                input_tokens=_int(usage.get("input_tokens")),
                output_tokens=_int(usage.get("output_tokens")),
                cache_read_tokens=_int(usage.get("cache_read_input_tokens")),
                cache_creation_tokens=_int(usage.get("cache_creation_input_tokens")),
            )
        )
    return total
'''

TALLY_NEW = '''def tally(transcript_path: Path) -> TokenUsage:
    # sdlc-flows patch tally-unique-messages: Claude Code writes one response on several
    # transcript lines (one per content block). Count each message id once, using its last
    # line, as the Gemini parser below does. A line with no message id is counted as before.
    last: dict[str, dict[str, Any]] = {}
    anonymous: list[dict[str, Any]] = []
    for entry in _jsonl_entries(transcript_path):
        usage = _usage_block(entry)
        if not usage:
            continue
        message = entry.get("message")
        message_id = message.get("id") if isinstance(message, dict) else None
        if isinstance(message_id, str) and message_id:
            last[message_id] = usage
        else:
            anonymous.append(usage)
    total = TokenUsage()
    for usage in [*last.values(), *anonymous]:
        total.add(
            TokenUsage(
                input_tokens=_int(usage.get("input_tokens")),
                output_tokens=_int(usage.get("output_tokens")),
                cache_read_tokens=_int(usage.get("cache_read_input_tokens")),
                cache_creation_tokens=_int(usage.get("cache_creation_input_tokens")),
            )
        )
    return total
'''

# Runs in the tool's own interpreter. One message written on two lines must count once.
TALLY_BEHAVIOUR_CHECK = r'''
import json, sys, tempfile
from pathlib import Path
from bmad_loop.tokens import tally
line = {"type": "assistant", "message": {"id": "m1", "usage": {"input_tokens": 1, "output_tokens": 2,
        "cache_read_input_tokens": 10, "cache_creation_input_tokens": 4}}}
with tempfile.TemporaryDirectory() as d:
    p = Path(d) / "t.jsonl"
    p.write_text(json.dumps(line) + "\n" + json.dumps(line) + "\n")
    t = tally(p)
sys.exit(0 if (t.input_tokens, t.output_tokens, t.cache_read_tokens, t.cache_creation_tokens) == (1, 2, 10, 4) else 1)
'''

STATUS_OLD = '''    elif graceful_pending:
        print("status: in progress — graceful stop pending (will stop after the current item)")
    else:
        print("status: in progress (or interrupted)")
'''

STATUS_NEW = '''    elif graceful_pending:
        print("status: in progress — graceful stop pending (will stop after the current item)")
    elif state.crashed:
        # sdlc-flows patch status-names-the-state: name the state the run already records.
        print("status: crashed")
    elif state.stopped:
        print("status: stopped")
    else:
        try:
            liveness = runs.engine_liveness(run_dir)
        except Exception:
            liveness = "unknown"
        if liveness == "alive":
            print("status: in progress")
        elif liveness == "dead":
            print("status: interrupted (the engine is not running)")
        else:
            print("status: in progress (or interrupted)")
'''

# Runs in the tool's own interpreter. Each case must exit 0 and print a `status:` line. A crashed run must print "status: crashed", and a run with no engine pid must not print the old words.
STATUS_BEHAVIOUR_CHECK = r'''
import json, subprocess, sys, tempfile
from pathlib import Path
with tempfile.TemporaryDirectory() as d:
    run = Path(d) / ".bmad-loop" / "runs" / "20260101-000000-abcd"
    run.mkdir(parents=True)
    def status(**state):
        (run / "state.json").write_text(json.dumps({"run_id": run.name, "project": d, "started_at": "x", **state}))
        out = subprocess.run([sys.executable, "-m", "bmad_loop", "status", "--project", d], capture_output=True, text=True)
        lines = out.stdout.splitlines()
        return lines if out.returncode == 0 and any(line.startswith("status:") for line in lines) else None
    crashed = status(crashed=True)
    dead = status()
ok = crashed is not None and dead is not None and "status: crashed" in crashed and "(or interrupted)" not in " ".join(dead)
sys.exit(0 if ok else 1)
'''

PATCHES = [{"id": "tally-unique-messages", "file": "tokens.py", "old": TALLY_OLD, "new": TALLY_NEW,
            "check": TALLY_BEHAVIOUR_CHECK},
           {"id": "status-names-the-state", "file": "cli.py", "old": STATUS_OLD, "new": STATUS_NEW,
            "check": STATUS_BEHAVIOUR_CHECK}]


@dataclass
class PatchResult:
    id: str
    state: str  # applied | already | fixed | manual | missing
    detail: str


def behaviour_ok(check: str, site_packages: Path, python: str) -> bool:
    env = {**os.environ, "PYTHONPATH": str(site_packages), "PYTHONDONTWRITEBYTECODE": "1"}
    return subprocess.run([python, "-c", check], env=env, capture_output=True).returncode == 0


def apply(package_dir: Path, python: str = sys.executable, write: bool = True,
          patches: list[dict] | None = None, pinned_version: str | None = None) -> list[PatchResult]:
    """Apply (or, with write=False, only check) every patch against an installed bmad_loop package directory.

    Every patch is reported `manual`, and no file is touched, when the pinned bmad-loop version (default: the one in
    bmad-pins.json) is not the version the patch text targets."""
    selected = PATCHES if patches is None else patches
    try:
        pin = pinned_tag() if pinned_version is None else pinned_version
    except (OSError, ValueError, KeyError, TypeError) as e:
        return [PatchResult(p["id"], "manual", f"bmad-pins.json could not be read, so the bmad-loop pin is unknown ({e!r})") for p in selected]
    if pin.removeprefix("v") != TARGET_VERSION:
        return [PatchResult(p["id"], "manual", f"bmad-pins.json pins bmad-loop {pin}, but this patch was written against "
                            f"v{TARGET_VERSION}. Rewrite the patch for the new version, then change TARGET_VERSION")
                for p in selected]
    results = []
    for p in selected:
        path = package_dir / p["file"]
        if not path.is_file():
            results.append(PatchResult(p["id"], "manual", f"{path} does not exist, so bmad-loop's layout changed"))
            continue
        text = path.read_text(encoding="utf-8")
        if p["new"] in text:
            results.append(PatchResult(p["id"], "already", "patched by an earlier run"))
        elif p["old"] in text:
            if write:
                path.write_text(text.replace(p["old"], p["new"], 1), encoding="utf-8")
                results.append(PatchResult(p["id"], "applied", str(path)))
            else:
                results.append(PatchResult(p["id"], "missing", f"{path} still has bmad-loop's original text"))
        elif behaviour_ok(p["check"], package_dir.parent, python):
            results.append(PatchResult(p["id"], "fixed", "upstream behaves correctly without the patch; retire it"))
        else:
            results.append(PatchResult(p["id"], "manual", f"neither the shipped nor the patched text is in {path}, and the "
                                       "behaviour check fails. The file was left untouched. Update the patch in "
                                       + PATCHES_PY))
    return results


def installed_package() -> tuple[Path, str] | None:
    """The installed bmad_loop package directory and the interpreter that runs it, or None when it is not on PATH."""
    launcher = shutil.which("bmad-loop")
    if not launcher:
        return None
    python = None
    try:
        first = Path(launcher).resolve().read_text(encoding="utf-8", errors="replace").splitlines()[0]
        if first.startswith("#!"):
            python = first[2:].strip().split()[0]
    except (OSError, IndexError):
        pass
    if not python or not Path(python).exists():
        return None
    out = subprocess.run([python, "-c", "import bmad_loop, pathlib; print(pathlib.Path(bmad_loop.__file__).resolve().parent)"],
                         capture_output=True, text=True)
    if out.returncode != 0 or not out.stdout.strip():
        return None
    return Path(out.stdout.strip()), python


def describe(results: list[PatchResult]) -> str:
    return "; ".join(f"{r.id}: {r.state}" + ("" if r.state in ("already",) else f" ({r.detail})") for r in results)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--check", action="store_true", help="report what would change and change nothing; exit 1 unless every patch is already applied")
    args = parser.parse_args()
    found = installed_package()
    if found is None:
        print("bmad-loop is not installed on PATH (or its launcher is not a Python script), so there is nothing to patch.")
        return 1
    package_dir, python = found
    results = apply(package_dir, python, write=not args.check)
    for r in results:
        print(f"{r.id}: {r.state}: {r.detail}")
    ok = {"already", "applied"} if not args.check else {"already"}
    return 0 if all(r.state in ok for r in results) else 1


if __name__ == "__main__":
    sys.exit(main())
