#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Price the sessions of bmad-loop runs, with this repository's price file.

For each run it reads the run's journal (`<project>/.bmad-loop/runs/<run-id>/journal.jsonl`)
for the list of sessions, then reads the relay events the sessions sent
(`<state root>/<project key>/<run-id>/events/`). Each event names the session's transcript.
The tool prices every transcript and prints one row per session and a total.

A session's cost includes its subagents. Claude Code writes each subagent's usage to its own file
under `<session id>/subagents/`, and Codex writes each one to its own rollout file that names its
parent. The bmad-loop dev and review skills spawn subagents, so leaving them out understates a run.

The price file is `eval-harness/src/pricing/model-prices.json` (PR #64) and the formula is
in `_bmad-output/specs/spec-evaluations-harness/cost-and-pricing.md`. The figure is a list-price
equivalent: tokens multiplied by the vendor's published API rate. It is not what was billed.

A session that sent no event has no transcript to read. It is listed as unmatched and is never
counted as zero. A session on a model with no price entry is listed as unpriced the same way.

Run via `sdlc-bmad-loop-cost.sh` beside this file, or `uv run sdlc_bmad_loop_cost.py`.
"""
import argparse
import datetime
import hashlib
import json
import math
import os
import re
import subprocess
import sys
from dataclasses import dataclass, field
from pathlib import Path

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
HARNESS_PRICES = REPO_ROOT / "eval-harness/src/pricing/model-prices.json"
# A repository that received this tool from the sdlc-loop package has no evaluations harness,
# so the package places a copy of the price file beside this script.
BUNDLED_PRICES = Path(__file__).with_name("sdlc-bmad-loop-model-prices.json")


def default_prices(harness: Path = HARNESS_PRICES, bundled: Path = BUNDLED_PRICES) -> Path:
    """The harness's price file when this repository has one, else the copy the package placed beside this script."""
    return bundled if bundled.is_file() and not harness.is_file() else harness


DEFAULT_PRICES = default_prices()
RATE_KEYS = ("input", "cacheWrite5m", "cacheWrite1h", "cacheRead", "output")
STALE_PRICE_DAYS = 60
CACHE_READ_WEIGHT = 0.1  # bmad-loop policy limits.cache_read_weight
JOURNAL_TOLERANCE = 0.05  # how far the journal's weighted count may differ from ours before the row says so
UUID_RE = re.compile(r"([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.jsonl$")


class RunError(Exception):
    """A problem with one run that should not stop the others."""


# ---------------------------------------------------------------- prices

def load_prices(path: Path) -> dict:
    if not path.is_file():
        raise SystemExit(
            f"error: price file not found: {path}\n"
            "It comes from the evaluations harness (PR #64). Pass --prices PATH, or use a branch that contains it."
        )
    try:
        data = json.loads(path.read_text())
    except (OSError, ValueError, RecursionError) as e:  # ValueError covers a non-UTF-8 file and an over-long integer
        raise SystemExit(f"error: cannot read the price file {path}: {e}")
    models = data.get("models") if isinstance(data, dict) else None
    if not isinstance(models, dict):
        raise SystemExit(f"error: {path} has no `models` table")
    return models


def _usable_rate(value: object) -> bool:
    """A rate is a finite number that is not negative and not a boolean (JSON `true` is an int in Python, and `NaN` parses)."""
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value) and value >= 0


def price_for(prices: dict, model: str) -> dict | None:
    """The price entry for a model id, or None.

    Tries the exact id, a dotted version turned into a dashed one (claude-sonnet-5.5), and the id
    without a context-window tag (`[1m]`) or an eight-digit date suffix. An entry that lacks one of
    the five rates, or has one that is not a usable rate, counts as missing, so the model is unpriced and the
    total says so instead of printing `nan` or a negative amount as complete.
    """
    if not model:
        return None
    base = re.sub(r"\[[^\]]*\]$", "", model)
    undated = re.sub(r"-\d{8}$", "", base)
    for candidate in (model, model.replace(".", "-"), base, base.replace(".", "-"), undated, undated.replace(".", "-")):
        entry = prices.get(candidate)
        if isinstance(entry, dict) and all(_usable_rate(entry.get(k)) for k in RATE_KEYS):
            return entry
    return None


def cost(prices: dict, model: str, inp: int, cache_read: int, cache_write: int, cache_write_1h: int, out: int) -> float | None:
    """The harness formula. None when the model has no price entry."""
    p = price_for(prices, model)
    if p is None:
        return None
    return (
        inp * p["input"] + cache_read * p["cacheRead"] + max(cache_write - cache_write_1h, 0) * p["cacheWrite5m"]
        + cache_write_1h * p["cacheWrite1h"] + out * p["output"]
    ) / 1_000_000


def price_notes(prices: dict, models: set[str], today: datetime.date | None = None) -> list[str]:
    """Warnings about price entries last checked a long time ago."""
    today = today or datetime.date.today()
    notes = []
    for model in sorted(models):
        entry = price_for(prices, model)
        checked = entry.get("checkedOn") if entry else None
        try:
            age = (today - datetime.date.fromisoformat(str(checked))).days
        except ValueError:
            continue
        if age > STALE_PRICE_DAYS:
            notes.append(f"the price for {model} was last checked on {checked} ({age} days ago); confirm it at {entry.get('source', 'the vendor page')}")
    return notes


# ---------------------------------------------------------------- transcripts

@dataclass
class Usage:
    """Token counts for one model. `cache_write_1h` is part of `cache_write`."""
    input: int = 0
    cache_read: int = 0
    cache_write: int = 0
    cache_write_1h: int = 0
    output: int = 0
    incomplete: int = 0  # records that lacked input_tokens or output_tokens, or lines that could not be parsed, so the cost is understated

    def add(self, other: "Usage") -> None:
        for f in ("input", "cache_read", "cache_write", "cache_write_1h", "output", "incomplete"):
            setattr(self, f, getattr(self, f) + getattr(other, f))

    @property
    def total(self) -> int:
        return self.input + self.cache_read + self.cache_write + self.output

    @property
    def weighted(self) -> int:
        """bmad-loop's weighted count: cache reads at CACHE_READ_WEIGHT, everything else at full weight."""
        return round(self.input + self.cache_write + self.output + CACHE_READ_WEIGHT * self.cache_read)


def usage_totals(per_model: dict) -> "Usage":
    total = Usage()
    for part in per_model.values():
        total.add(part)
    return total


def _count(value: object) -> int:
    return value if isinstance(value, int) and not isinstance(value, bool) and value > 0 else 0


def _has_count(value: object) -> bool:
    return isinstance(value, int) and not isinstance(value, bool) and value >= 0


def _records(path: Path, unreadable: list | None = None):
    """The JSON objects of a transcript or journal, one per line, read as a stream. Invalid lines and non-objects are skipped.

    Each non-blank line that is not a JSON object, whether it is invalid JSON or a valid array or scalar, adds one item
    to `unreadable`, when it is given, so the caller can say that some of the file was not counted.
    """
    with path.open(encoding="utf-8", errors="replace") as f:
        for line in f:
            try:
                d = json.loads(line)
            except (ValueError, RecursionError):  # JSONDecodeError, an over-long integer, or nesting too deep
                if unreadable is not None and line.strip():
                    unreadable.append(line)
                continue
            if isinstance(d, dict):
                yield d
            elif unreadable is not None and line.strip():  # valid JSON, but not a record: an array or a scalar replaced one
                unreadable.append(line)


def _flag_unreadable(per: dict[str, Usage], count: int) -> None:
    """Mark a transcript's usage incomplete because `count` lines could not be parsed and may have held tokens."""
    if count:
        per.setdefault(next(iter(per), "unknown"), Usage()).incomplete += count


def merge_usage(into: dict[str, Usage], other: dict[str, Usage]) -> None:
    for model, usage in other.items():
        into.setdefault(model, Usage()).add(usage)


def claude_usage(path: Path) -> dict[str, Usage]:
    """Usage per model from a Claude Code transcript. One record per message id, the last one wins."""
    last: dict[str, dict] = {}
    dropped: dict[str, int] = {}
    unreadable: list = []
    for d in _records(path, unreadable):
        m = d.get("message")
        if d.get("type") == "assistant" and isinstance(m, dict) and isinstance(m.get("usage"), dict):
            if isinstance(m.get("id"), str) and m["id"]:
                last[m["id"]] = m
            else:  # a record with usage but no usable id cannot be de-duplicated, so its tokens are not counted
                model = m["model"] if isinstance(m.get("model"), str) and m["model"] else "unknown"
                dropped[model] = dropped.get(model, 0) + 1
    per: dict[str, Usage] = {}
    for m in last.values():
        model = m["model"] if isinstance(m.get("model"), str) and m["model"] else "unknown"
        if model == "<synthetic>":  # Claude Code's own placeholder messages carry no billed usage
            continue
        u = m["usage"]
        breakdown = u.get("cache_creation") if isinstance(u.get("cache_creation"), dict) else {}
        w5, w1 = _count(breakdown.get("ephemeral_5m_input_tokens")), _count(breakdown.get("ephemeral_1h_input_tokens"))
        written = max(_count(u.get("cache_creation_input_tokens")), w5 + w1)
        per.setdefault(model, Usage()).add(Usage(
            input=_count(u.get("input_tokens")),
            cache_read=_count(u.get("cache_read_input_tokens")),
            cache_write=written,
            cache_write_1h=w1,
            output=_count(u.get("output_tokens")),
            incomplete=0 if _has_count(u.get("input_tokens")) and _has_count(u.get("output_tokens")) else 1,
        ))
    for model, count in dropped.items():
        if model != "<synthetic>":
            per.setdefault(model, Usage()).incomplete += count
    _flag_unreadable(per, len(unreadable))
    return per


def _within(path: Path, parent: Path) -> bool:
    """True when `path`, after following symlinks, is inside `parent`. A path that cannot be resolved is not."""
    try:
        return path.resolve().is_relative_to(parent.resolve())
    except (OSError, RuntimeError, ValueError):
        return False


def claude_subagent_files(path: Path) -> list[Path]:
    """Claude Code keeps each subagent's transcript at `<session id>/subagents/*.jsonl`, beside the session file.

    A file that resolves outside the folder holding the session file, through a symlink, is not read.
    """
    return sorted(f for f in (path.parent / path.stem / "subagents").glob("*.jsonl") if _within(f, path.parent))


def codex_usage(path: Path, fallback_model: str) -> dict[str, Usage]:
    """Usage per model from a Codex rollout.

    The rollout holds running totals. Each increase is charged to the model that was active when it
    was recorded, so a session that switches model is priced at each model's rate.
    `input_tokens` includes the cached part, which is priced separately.
    A total that goes down (a reset, or a damaged record) is not charged again when it comes back up: each counter keeps
    its highest value, and the record that went down makes its session unpriced, because the tokens in between are unknown.
    """
    model = fallback_model or "unknown"
    previous = (0, 0, 0, 0)
    per: dict[str, Usage] = {}
    unreadable: list = []
    for d in _records(path, unreadable):
        p = d.get("payload") if isinstance(d.get("payload"), dict) else {}
        if d.get("type") == "turn_context" and isinstance(p.get("model"), str) and p["model"]:
            model = p["model"]
        info = p.get("info")
        total = info.get("total_token_usage") if isinstance(info, dict) else None
        if p.get("type") != "token_count" or not isinstance(total, dict):
            continue
        # A missing field keeps its previous running total, so the next complete record does not charge it twice.
        current = tuple(total[key] if _has_count(total.get(key)) else previous[i] for i, key in enumerate(
            ("input_tokens", "cached_input_tokens", "cache_write_input_tokens", "output_tokens")))
        d_in, d_cached, d_write, d_out = (max(c - q, 0) for c, q in zip(current, previous))
        regressed = any(c < q for c, q in zip(current, previous))
        previous = tuple(max(c, q) for c, q in zip(current, previous))  # the highest value seen, so a rebound is not charged twice
        per.setdefault(model, Usage()).add(Usage(
            input=max(d_in - d_cached, 0), cache_read=d_cached, cache_write=d_write, output=d_out,
            incomplete=0 if _has_count(total.get("input_tokens")) and _has_count(total.get("output_tokens")) and not regressed else 1,
        ))
    _flag_unreadable(per, len(unreadable))
    return per


def _codex_parent_id(rollout: Path) -> str | None:
    """The parent thread id of a subagent rollout, from its first line, or None for a main session."""
    try:
        with rollout.open(encoding="utf-8", errors="replace") as f:
            first = json.loads(f.readline())
    except (OSError, ValueError, RecursionError):
        return None
    payload = first.get("payload") if isinstance(first, dict) else None
    source = payload.get("source") if isinstance(payload, dict) else None
    spawn = source.get("subagent", {}).get("thread_spawn") if isinstance(source, dict) and isinstance(source.get("subagent"), dict) else None
    parent = spawn.get("parent_thread_id") if isinstance(spawn, dict) else None
    return parent if isinstance(parent, str) else None


def codex_subagent_files(path: Path) -> list[Path]:
    """Subagent rollouts of a Codex session, found by their parent thread id.

    Codex files rollouts by date, and a subagent starts after its parent, so only the parent's day
    and the days either side are read.
    """
    match = UUID_RE.search(path.name)
    if not match:
        return []
    day_dir = path.parent
    try:
        day = datetime.date(int(day_dir.parent.parent.name), int(day_dir.parent.name), int(day_dir.name))
        root = day_dir.parent.parent.parent
        dirs = [root / f"{d:%Y}" / f"{d:%m}" / f"{d:%d}" for d in (day - datetime.timedelta(1), day, day + datetime.timedelta(1))]
    except ValueError:
        root = day_dir
        dirs = [day_dir]
    children: dict[str, list[Path]] = {}
    for directory in dirs:
        for rollout in sorted(directory.glob("rollout-*.jsonl")):
            if not _within(rollout, root):  # a rollout symlinked from outside the sessions folder is not opened
                continue
            parent = _codex_parent_id(rollout)
            if parent:
                children.setdefault(parent, []).append(rollout)
    found, queue, seen = [], [match.group(1)], set()
    while queue:
        parent = queue.pop()
        for rollout in children.get(parent, []):
            if rollout in seen:
                continue
            seen.add(rollout)
            found.append(rollout)
            child_id = UUID_RE.search(rollout.name)
            if child_id:
                queue.append(child_id.group(1))
    return sorted(found)


# ---------------------------------------------------------------- runs

def state_root() -> Path:
    """Where bmad-loop keeps run control state, outside the project tree."""
    if os.environ.get("BMAD_LOOP_STATE_DIR"):
        return Path(os.environ["BMAD_LOOP_STATE_DIR"])
    base = os.environ.get("XDG_STATE_HOME") or str(Path.home() / ".local/state")
    return Path(base) / "bmad-loop"


def project_key(project: Path) -> str:
    return hashlib.sha256(os.fsencode(str(project.resolve()))).hexdigest()[:16]


def run_ids(project: Path) -> list[str]:
    runs = project / ".bmad-loop/runs"
    return sorted(p.name for p in runs.iterdir() if p.is_dir()) if runs.is_dir() else []


def resolve_run(project: Path, ref: str) -> str:
    """A full run id, or a unique prefix or suffix of one (the short ref `bmad-loop list` prints)."""
    runs = run_ids(project)
    hits = [r for r in runs if r == ref] or [r for r in runs if r.startswith(ref) or r.endswith(ref)]
    if not hits:
        raise SystemExit(f"error: no run matching {ref!r} in {project / '.bmad-loop/runs'}")
    if len(hits) > 1:
        raise SystemExit(f"error: {ref!r} matches several runs: {', '.join(hits)}")
    return hits[0]


@dataclass
class SessionRow:
    task_id: str
    role: str
    adapter: str
    model: str
    status: str
    journal_weighted: int | None
    usage: dict[str, Usage] = field(default_factory=dict)
    main_usage: dict[str, Usage] = field(default_factory=dict)  # the session's own transcript, without its subagents
    extra_files: int = 0
    dollars: float | None = None
    dollars_partial: float | None = None
    problem: str = ""
    note: str = ""
    placeholder: bool = False  # not a session: stands for journal lines or event files that could not be read
    unreadable_lines: int = 0  # how many journal lines, on the placeholder
    unreadable_events: int = 0  # how many event files, on the placeholder
    event_id: str = ""  # the task id as the relay events carry it; task_id gets a "#2" suffix on a repeat
    shared_by: int = 1  # how many sessions in the run started with this task id


def journal_sessions(project: Path, run_id: str) -> list[SessionRow]:
    """The run's sessions in start order. A session-end record closes the oldest still-open session with its task id."""
    journal = project / ".bmad-loop/runs" / run_id / "journal.jsonl"
    if not journal.is_file():
        raise RunError(f"no journal at {journal}")
    rows: dict[str, SessionRow] = {}
    open_keys: dict[str, list[str]] = {}
    starts: dict[str, int] = {}
    unreadable: list = []
    for d in _records(journal, unreadable):
        task = d.get("task_id")
        if not isinstance(task, str):
            if d.get("kind") in ("session-start", "session-end"):  # valid JSON, but a session record we cannot place: a session may be missing
                unreadable.append(d)
            continue
        if d.get("kind") == "session-start":
            starts[task] = starts.get(task, 0) + 1
            key = task if starts[task] == 1 else f"{task}#{starts[task]}"
            rows[key] = SessionRow(key, str(d.get("role", "?")), str(d.get("adapter", "?")), str(d.get("model") or ""), "started", None,
                                   event_id=task)
            open_keys.setdefault(task, []).append(key)
        elif d.get("kind") == "session-end" and not open_keys.get(task) and task not in starts:
            unreadable.append(d)  # an end for a task whose start was never read: the start may be the line that was lost
        elif d.get("kind") == "session-end" and open_keys.get(task):
            row = rows[open_keys[task].pop(0)]
            row.status = str(d.get("status", "?"))
            weighted = d.get("tokens_weighted")
            row.journal_weighted = weighted if isinstance(weighted, int) and not isinstance(weighted, bool) else None
    for row in rows.values():
        row.shared_by = starts[row.event_id]
    listed = list(rows.values())
    if unreadable:  # a lost session-start would drop its session from the report, so the report says a session may be missing
        listed.append(SessionRow("(journal)", "?", "?", "", "unreadable", None, placeholder=True, unreadable_lines=len(unreadable),
                                 problem=f"{len(unreadable)} line(s) of the journal cannot be read as a session record, so a session may be missing from this report "
                                         "or its cost assigned to the wrong session"))
    return listed


def events_dir(project: Path, run_id: str) -> Path:
    return state_root() / project_key(project) / run_id / "events"


def _transcript_roots(project: Path) -> list[Path]:
    """Directories a transcript may live in, resolved: the folders the two CLIs write transcripts to.

    The defaults are ~/.claude/projects and ~/.codex/sessions. CLAUDE_CONFIG_DIR and CODEX_HOME add their own
    projects/ and sessions/ folders when set, and are the way to allow a CLI that keeps its transcripts somewhere else.
    The project directory is not a root, so an event cannot make the tool open a project file such as .env.
    `project` is kept for callers and is not used.
    """
    candidates: list[Path] = []
    try:
        home = Path.home()
        candidates += [home / ".claude" / "projects", home / ".codex" / "sessions"]
    except RuntimeError:  # no HOME and no resolvable user
        pass
    for var, sub in (("CLAUDE_CONFIG_DIR", "projects"), ("CODEX_HOME", "sessions")):
        if os.environ.get(var):
            candidates.append(Path(os.environ[var]).expanduser() / sub)
    roots = []
    for candidate in candidates:
        try:
            roots.append(candidate.resolve())
        except (OSError, RuntimeError):
            continue
    return roots


def _inside(path: Path, roots: list[Path]) -> bool:
    """True when `path` resolves to a .jsonl path inside one of `roots`, and is a regular file if it exists.

    A missing file passes, so the caller can report it as missing and not as rejected.
    """
    try:
        resolved = path.resolve()
        if resolved.suffix != ".jsonl" or (resolved.exists() and not resolved.is_file()):
            return False
        return any(resolved.is_relative_to(root) for root in roots)
    except (OSError, RuntimeError, ValueError):
        return False


def event_transcripts(project: Path, run_id: str) -> dict[str, list[Path]]:
    """task id -> the distinct transcript paths named by the run's relay events, in event order."""
    return _read_events(project, run_id)[0]


def _read_events(project: Path, run_id: str) -> tuple[dict[str, list[Path]], dict[str, Path], int]:
    """The accepted transcript paths per task id, the first rejected path per task id, and how many event files could not be read.

    An event's path is data from a file under the state directory, so a path that resolves
    outside every directory in `_transcript_roots`, or not a regular .jsonl file, is rejected rather than opened.
    """
    found: dict[str, list[Path]] = {}
    rejected: dict[str, Path] = {}
    unreadable = 0
    directory = events_dir(project, run_id)
    if not directory.is_dir():
        return found, rejected, unreadable
    roots = _transcript_roots(project)
    for f in sorted(directory.glob("*.json")):
        try:
            d = json.loads(f.read_text())
        except (OSError, ValueError, RecursionError):  # not readable, not UTF-8, not JSON, an over-long integer, or nested too deep
            unreadable += 1  # it may have named a transcript, so the report says so
            continue
        if not isinstance(d, dict):
            unreadable += 1  # valid JSON that is not an event object: it may have been the one that named a transcript
            continue
        if not isinstance(d.get("transcript_path"), str) or not isinstance(d.get("task_id"), str):
            if "transcript_path" in d:  # it was meant to name a transcript, so one may be missing; a lifecycle event has no such key
                unreadable += 1
            continue
        try:
            # The path is only built here. `_inside` below resolves it and rejects anything that is not a .jsonl file
            # inside `_transcript_roots`, and nothing opens it before that check. The marker covers only the line below it.
            # nosemgrep
            path = Path(d["transcript_path"]).expanduser()
        except (RuntimeError, ValueError):
            continue
        if not path.is_absolute():
            path = project / path
        if not _inside(path, roots):
            rejected.setdefault(d["task_id"], path)
            continue
        path = path.resolve()  # two names for one file (a symlink and its target) must count once
        paths = found.setdefault(d["task_id"], [])
        if path not in paths:
            paths.append(path)
    return found, rejected, unreadable


def _session_usage(row: SessionRow, path: Path) -> tuple[dict[str, Usage], dict[str, Usage], int]:
    """Usage of one transcript with its subagents, usage of the transcript alone, and how many subagent files that took."""
    if row.adapter == "claude":
        main, extra = claude_usage(path), claude_subagent_files(path)
        usage = {k: Usage() for k in main}
        merge_usage(usage, main)
        for f in extra:
            merge_usage(usage, claude_usage(f))
    else:
        main, extra = codex_usage(path, row.model), codex_subagent_files(path)
        usage = {k: Usage() for k in main}
        merge_usage(usage, main)
        for f in extra:
            merge_usage(usage, codex_usage(f, row.model))
    return usage, main, len(extra)


def price_run(project: Path, run_id: str, prices: dict) -> list[SessionRow]:
    rows = journal_sessions(project, run_id)
    transcripts, rejected, unreadable_events = _read_events(project, run_id)
    no_events = not events_dir(project, run_id).is_dir()
    for row in rows:
        if row.placeholder:
            continue
        if row.adapter not in ("claude", "codex"):
            row.problem = f"unpriced: this tool reads Claude and Codex transcripts, and this session used the {row.adapter} adapter"
            continue
        if row.shared_by > 1:
            row.problem = (f"ambiguous: {row.shared_by} sessions in this run started with the task id {row.event_id}, and relay events carry "
                           "only that id, so their transcripts cannot be told apart")
            continue
        paths = transcripts.get(row.event_id, [])
        if paths and row.event_id in rejected:
            row.note = (f"an event also named a transcript at {str(rejected[row.event_id])!r}, outside the allowed directories or not a .jsonl file, and it was "
                        "not read, so this cost may be low")
        if not paths:
            if row.event_id in rejected:
                row.problem = (f"unmatched: the session's transcript path {str(rejected[row.event_id])!r} is outside the project and the Claude and Codex "
                               "config directories. Set CLAUDE_CONFIG_DIR or CODEX_HOME if your CLI keeps transcripts there")
            else:
                row.problem = ("unmatched: there is no events directory for this run (wrong state root or project path?)"
                               if no_events else "unmatched: the session sent no event with a transcript path")
            continue
        missing = [p for p in paths if not p.is_file()]
        if missing:
            row.problem = f"unmatched: transcript no longer exists ({missing[0]})"
            continue
        try:
            for path in paths:
                usage, main, extra = _session_usage(row, path)
                merge_usage(row.usage, usage)
                merge_usage(row.main_usage, main)
                row.extra_files += extra
        except OSError as e:
            row.usage = {}
            row.problem = f"unmatched: a transcript could not be read ({e})"
            continue
        if not row.usage:
            row.problem = "unmatched: the transcript has no token counts"
            continue
        parts = {m: cost(prices, m, u.input, u.cache_read, u.cache_write, u.cache_write_1h, u.output) for m, u in row.usage.items()}
        missing_models = [m for m, c in parts.items() if c is None]
        incomplete = sum(u.incomplete for u in row.usage.values())
        row.dollars_partial = sum(c for c in parts.values() if c is not None) or None
        reasons = ([f"no price entry for {', '.join(missing_models)}"] if missing_models else []) + (
            ["some transcript records lack input or output token counts, cannot be matched to a message, or cannot be parsed, so the cost may be understated"] if incomplete else [])
        if row.event_id in rejected:  # an event named a transcript that was not read, so some of this session's cost is missing
            reasons.append("an event named a transcript that was not read, so some cost may be missing")
        if row.status == "started":  # more cost may follow, so the amount below is a lower bound and the total must say so
            reasons.append("the session has no end record, so it may still be running and this amount is a lower bound")
        if reasons:
            row.problem = f"unpriced: {'; '.join(reasons)}"
        else:
            row.dollars = sum(parts.values())
        if row.status == "started":
            note = "the journal has no session-end record, so the run stopped or is still going"
            row.note = f"{row.note}; {note}" if row.note else note
        row.note = "; ".join(n for n in (row.note, journal_disagreement(row)) if n)
    if unreadable_events:  # an event file that cannot be read may have named a transcript, so a session's cost may be missing
        rows.append(SessionRow("(events)", "?", "?", "", "unreadable", None, placeholder=True, unreadable_events=unreadable_events,
                               problem=f"{unreadable_events} event file(s) cannot be read, so a transcript may be missing from this report"))
    return rows


def journal_disagreement(row: SessionRow) -> str:
    """A sentence when the journal's weighted count differs from the one computed from unique messages, else ''.

    bmad-loop up to 0.12.0 sums every transcript line that has a usage block, and Claude Code writes one response
    on several lines, so its figure for a Claude session runs about twice the true one. Codex rollouts hold
    running totals and agree.
    """
    mine = usage_totals(row.main_usage).weighted
    if not mine:
        return ""
    if not row.journal_weighted:
        return f"the journal recorded no weighted tokens for this session, which used {mine:,} by unique messages"
    ratio = row.journal_weighted / mine
    if abs(ratio - 1) > JOURNAL_TOLERANCE:
        return (f"the journal's weighted count ({row.journal_weighted:,}) is {ratio:.2f} times the count from unique messages in the "
                f"session's own transcript ({mine:,}); bmad-loop counts a message once per transcript line, so the journal figure runs high")
    return ""


# A regenerated session carries a `-gN` suffix after the attempt number (3b-15-dev-1-g1). A repeated task id carries `#N`.
STORY_RE = r"^(.*)-{role}-\d+(?:-g\d+)?(?:#\d+)?$"


def story_key(row: SessionRow) -> str:
    """The story a session belongs to: its task id without the role and attempt number (1-4-review-1 is story 1-4)."""
    found = re.match(STORY_RE.format(role=re.escape(row.role)), row.task_id)
    return found.group(1) if found else row.task_id


# ---------------------------------------------------------------- output

def row_dollars(row: SessionRow) -> float:
    return row.dollars if row.dollars is not None else (row.dollars_partial or 0.0)


def totals(results: dict[str, list[SessionRow]], failed_runs: int = 0) -> dict:
    """Sums over `results`. A run that could not be read at all (`failed_runs`) makes the total incomplete."""
    rows = [r for rs in results.values() for r in rs]
    sessions = [r for r in rows if not r.placeholder]
    priced = sum(1 for r in sessions if r.dollars is not None)
    unreadable = sum(r.unreadable_lines for r in rows)
    unreadable_events = sum(r.unreadable_events for r in rows)
    return {"usd": sum(row_dollars(r) for r in sessions), "sessions": len(sessions), "priced": priced, "unreadable_journal_lines": unreadable,
            "unreadable_event_files": unreadable_events,
            "complete": priced == len(sessions) and bool(sessions) and not unreadable and not unreadable_events and not failed_runs}


def render(run_id: str, rows: list[SessionRow]) -> str:
    out = [f"run {run_id}"]
    if not rows:
        out.append("  no sessions in the journal")
        return "\n".join(out)
    out.append(f"  {'task':14} {'role':7} {'cli':7} {'model':20} {'status':10} {'input':>8} {'cache read':>11} {'cache write':>11} {'output':>8} {'tokens':>12} {'weighted':>10} {'journal wt':>10} {'USD':>8}")
    for r in rows:
        u = usage_totals(r.usage)
        model = ",".join(r.usage) or r.model
        usd = f"{r.dollars:.2f}" if r.dollars is not None else (f"{r.dollars_partial:.2f}+" if r.dollars_partial else "-")
        journal = f"{r.journal_weighted:,}" if r.journal_weighted is not None else "-"
        out.append(f"  {r.task_id:14} {r.role:7} {r.adapter:7} {model:20} {r.status:10} {u.input:>8,} {u.cache_read:>11,} {u.cache_write:>11,} {u.output:>8,} {u.total:>12,} {u.weighted:>10,} {journal:>10} {usd:>8}")
        if r.extra_files:
            out.append(f"    + includes {r.extra_files} subagent transcript(s)")
        if r.note:
            out.append(f"    ~ {r.note}")
        if r.problem:
            out.append(f"    ! {r.problem}")
    t = totals({run_id: rows})
    reasons = ([f"{t['sessions'] - t['priced']} not fully priced"] if t["priced"] < t["sessions"] else []) + (
        [f"{t['unreadable_journal_lines']} journal line(s) could not be read"] if t["unreadable_journal_lines"] else []) + (
        [f"{t['unreadable_event_files']} event file(s) could not be read"] if t["unreadable_event_files"] else [])
    out.append(f"  total ${t['usd']:.2f} across {t['priced']} of {t['sessions']} sessions"
               + ("" if t["complete"] else f"; {' and '.join(reasons) or 'no sessions were found'}, so the total is a lower bound"))
    return "\n".join(out)


def render_by_story(run_id: str, rows: list[SessionRow]) -> str:
    """One row per story, summing its dev and review sessions, with subagents included."""
    out = [f"run {run_id}", f"  {'story':12} {'sessions':>8} {'tokens':>14} {'weighted':>12} {'USD':>8}"]
    stories: dict[str, list[SessionRow]] = {}
    for r in rows:
        stories.setdefault(story_key(r), []).append(r)
    for key, group in stories.items():
        u = Usage()
        for r in group:
            u.add(usage_totals(r.usage))
        usd = sum(row_dollars(r) for r in group)
        flag = "" if all(r.dollars is not None for r in group) else "+"
        out.append(f"  {key:12} {len(group):>8} {u.total:>14,} {u.weighted:>12,} {usd:>7.2f}{flag}")
    t = totals({run_id: rows})
    every = Usage()
    for r in rows:
        every.add(usage_totals(r.usage))
    out.append(f"  {'total':12} {len(rows):>8} {every.total:>14,} {every.weighted:>12,} {t['usd']:>7.2f}"
               + ("" if t["complete"] else "  (a lower bound: some sessions are not fully priced)"))
    return "\n".join(out)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("run", nargs="?", help="run id, or a unique prefix or suffix of one")
    parser.add_argument("--all", action="store_true", help="price every run in the project")
    parser.add_argument("--project", type=Path, default=Path.cwd(), help="project root (default: current directory)")
    parser.add_argument("--prices", type=Path, default=DEFAULT_PRICES, help="price file (default: the harness's)")
    parser.add_argument("--json", action="store_true", help="print machine-readable output")
    parser.add_argument("--by-story", action="store_true", help="print one row per story instead of one per session (text output only)")
    args = parser.parse_args()
    if bool(args.run) == args.all:
        parser.error("give a run id, or --all")
    project = args.project.resolve()
    prices = load_prices(args.prices)
    ids = run_ids(project) if args.all else [resolve_run(project, args.run)]
    if not ids:
        raise SystemExit(f"error: no runs found in {project / '.bmad-loop/runs'}")
    results: dict[str, list[SessionRow]] = {}
    errors: dict[str, str] = {}
    for rid in ids:
        try:
            results[rid] = price_run(project, rid, prices)
        except (RunError, OSError) as e:  # a journal that exists but cannot be read must not end the whole --all
            errors[rid] = str(e)
    notes = price_notes(prices, {m for rows in results.values() for r in rows for m in r.usage})
    summary = totals(results, failed_runs=len(errors))
    if args.json:
        print(json.dumps({
            "runs": {rid: {"sessions": [{
                "task_id": r.task_id, "role": r.role, "adapter": r.adapter, "models": list(r.usage), "status": r.status,
                "usd": r.dollars, "usd_priced_part": r.dollars_partial, "subagent_files": r.extra_files,
                "story": story_key(r), "total_tokens": usage_totals(r.usage).total, "weighted_tokens": usage_totals(r.usage).weighted,
                "weighted_tokens_main_session": usage_totals(r.main_usage).weighted,
                "journal_weighted_tokens": r.journal_weighted, "problem": r.problem or None, "note": r.note or None,
                "placeholder": r.placeholder,
            } for r in rows], "error": errors.get(rid)} for rid, rows in {**results, **{e: [] for e in errors}}.items()},
            "total": summary, "notes": notes,
        }, indent=2))
        return 1 if errors else 0
    for rid in ids:
        print(f"run {rid}: error: {errors[rid]}" if rid in errors else (render_by_story if args.by_story else render)(rid, results[rid]))
    if len(ids) > 1:
        reasons = ([f"{len(errors)} run(s) could not be read"] if errors else []) + (
            [f"{summary['sessions'] - summary['priced']} of {summary['sessions']} sessions are not fully priced"] if summary["priced"] < summary["sessions"] else []) + (
            [f"{summary['unreadable_journal_lines']} journal line(s) could not be read"] if summary["unreadable_journal_lines"] else []) + (
            [f"{summary['unreadable_event_files']} event file(s) could not be read"] if summary["unreadable_event_files"] else [])
        reasons = reasons or ["no sessions were found"]
        print(f"\nall runs: ${summary['usd']:.2f} across {summary['priced']} of {summary['sessions']} sessions"
              + ("" if summary["complete"] else f"; {' and '.join(reasons)}, so the total is a lower bound"))
    for note in notes:
        print(f"note: {note}")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
