#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Mechanical checks for the sdlc-bdd skill's two artifacts.

The artifacts are a project glossary (`GLOSSARY.md`) and a per-feature example
map (`examples.md`). This script reads them and answers questions that need no
judgment:

  lint     Is the example map well formed, and does it use the glossary's terms?
  trace    Which examples does the spec mention, and which does a test mention?
  scan     Do other files use a term the glossary says to avoid?

Exit code 1 means a finding the caller must act on. Exit code 2 means an input file
could not be read. A warning never fails a run.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from dataclasses import dataclass, field
from pathlib import Path

sys.dont_write_bytecode = True

RULE_RE = re.compile(r"^##\s+(RULE-\d+)\s*:?\s*(.*)$")
EXAMPLE_RE = re.compile(r"^###\s+(EX-\d+)\s*:?\s*(.*)$")
QUESTION_RE = re.compile(r"^-\s+(Q-\d+)\s*:?\s*(.*)$")
TERM_RE = re.compile(r"^\*\*(.+?)\*\*:\s*(.*)$")
AVOID_RE = re.compile(r"^_Avoid_:\s*(.+?)\s*$")
SOURCE_RE = re.compile(r"^_Source_:\s*(\w+)")
STATUS_RE = re.compile(r"^status:\s*(\w+)", re.M)
STEP_RE = re.compile(r"^\s*(Given|When|Then|And|But|Or)\b(.*)$")
FENCE_RE = re.compile(r"^```")
PROSE_SUFFIXES = {".md", ".markdown", ".txt", ".rst"}
FORBIDS_RE = re.compile(r"\b(never|avoid|_avoid_|do not use|don't use)\b", re.I)
PLACEHOLDER_RE = re.compile(r"\b(foo|bar|baz|lorem|ipsum|test data|dummy)\b", re.I)
VAGUE_RE = re.compile(r"\b(works?|correctly|properly|successfully|as expected)\b", re.I)
SKIP_DIRS = {".git", "node_modules", "__pycache__", ".venv", "venv", ".pytest_cache"}
MAX_STEPS = 5


@dataclass
class Term:
    name: str
    meaning: str
    avoid: list[str]


@dataclass
class Rule:
    id: str
    text: str


@dataclass
class Example:
    id: str
    title: str
    rule: str | None
    steps: list[tuple[str, str]] = field(default_factory=list)
    has_fence: bool = False
    text: str = ""
    source: str | None = None
    tags: list[str] = field(default_factory=list)


@dataclass
class Question:
    id: str
    text: str


@dataclass
class ExampleMap:
    status: str | None = None
    has_note: bool = False
    rules: list[Rule] = field(default_factory=list)
    examples: list[Example] = field(default_factory=list)
    questions: list[Question] = field(default_factory=list)


@dataclass
class Finding:
    level: str
    where: str
    message: str


@dataclass
class TraceRow:
    id: str
    spec: list[str] = field(default_factory=list)
    tests: list[str] = field(default_factory=list)
    other: list[str] = field(default_factory=list)


@dataclass
class LanguageScan:
    avoided: list[tuple[str, str, str]] = field(default_factory=list)
    used: dict[str, int] = field(default_factory=dict)


def parse_glossary(text: str) -> list[Term]:
    """Read the GLOSSARY.md format of the domain-modeling skill.

    A term is `**Term**:` followed by its definition lines, then an optional
    `_Avoid_: a, b` line. A blank line or the next term ends the entry.
    """
    terms: list[Term] = []
    current: Term | None = None
    for line in text.splitlines():
        stripped = line.strip()
        match = TERM_RE.match(stripped)
        if match:
            current = Term(match.group(1).strip(), match.group(2).strip(), [])
            terms.append(current)
            continue
        if current is None:
            continue
        if not stripped or stripped.startswith("#"):
            current = None
            continue
        avoid = AVOID_RE.match(stripped)
        if avoid:
            current.avoid = [a.strip() for a in avoid.group(1).split(",") if a.strip()]
        else:
            current.meaning = (current.meaning + " " + stripped).strip()
    return terms


def parse_examples(text: str) -> ExampleMap:
    doc = ExampleMap()
    front = re.match(r"^---\n(.*?)\n---", text, re.S)
    if front and (status := STATUS_RE.search(front.group(1))):
        doc.status = status.group(1)
    current_rule: str | None = None
    current: Example | None = None
    in_fence = False
    in_questions = False
    for line in text.splitlines():
        if FENCE_RE.match(line):
            in_fence = not in_fence
            if current is not None and in_fence:
                current.has_fence = True
            continue
        if in_fence:
            if current is not None:
                current.text += line + "\n"
                if line.strip().startswith("@"):
                    current.tags.extend(line.split())
                step = STEP_RE.match(line)
                if step:
                    current.steps.append((step.group(1), step.group(2).strip()))
            continue
        rule = RULE_RE.match(line)
        if rule:
            doc.rules.append(Rule(rule.group(1), rule.group(2).strip()))
            current_rule, current, in_questions = rule.group(1), None, False
            continue
        example = EXAMPLE_RE.match(line)
        if example:
            current = Example(example.group(1), example.group(2).strip(), current_rule)
            doc.examples.append(current)
            in_questions = False
            continue
        if line.startswith("## "):
            if line.strip().lower() == "## for the spec writer":
                doc.has_note = True
            current_rule, current = None, None
            in_questions = line.strip().lower() == "## open questions"
            continue
        source = SOURCE_RE.match(line.strip())
        if source and current is not None:
            current.source = source.group(1)
            continue
        question = QUESTION_RE.match(line)
        if question and in_questions:
            doc.questions.append(Question(question.group(1), question.group(2).strip()))
    return doc


class _Word:
    """Match a term as a whole word, including inside snake_case and camelCase names."""

    def __init__(self, term: str):
        esc = re.escape(term)
        self.plain = re.compile(rf"(?<![A-Za-z0-9]){esc}s?(?![A-Za-z0-9])", re.I)
        cap = re.escape(term[:1].upper() + term[1:])
        self.camel = re.compile(rf"(?<=[a-z0-9]){cap}s?(?![a-z])")

    def findall(self, text: str) -> list[str]:
        return self.plain.findall(text) + self.camel.findall(text)

    def search(self, text: str) -> bool:
        return bool(self.plain.search(text) or self.camel.search(text))


def _word(term: str) -> _Word:
    return _Word(term)


def lint(doc: ExampleMap, terms: list[Term], raw: str) -> list[Finding]:
    findings: list[Finding] = []
    if not doc.rules and not doc.examples:
        findings.append(Finding("error", "file", "no RULE or EX headings found, so this is not an example map"))
    for kind, items in (("RULE", doc.rules), ("EX", doc.examples), ("Q", doc.questions)):
        seen: set[str] = set()
        for item in items:
            if item.id in seen:
                findings.append(Finding("error", item.id, f"duplicate id {item.id}"))
            seen.add(item.id)
    with_examples = {e.rule for e in doc.examples}
    for rule in doc.rules:
        if rule.id not in with_examples:
            findings.append(Finding("error", rule.id, "rule has no example"))
    for ex in doc.examples:
        if ex.rule is None:
            findings.append(Finding("error", ex.id, "example sits outside any rule"))
        if not ex.has_fence or not ex.steps:
            findings.append(Finding("error", ex.id, "example has no gherkin steps"))
            continue
        findings.extend(_lint_steps(ex))
        if f"@{ex.id}" not in ex.tags:
            findings.append(Finding("warning", ex.id, f"scenario has no @{ex.id} tag above it"))
    findings.extend(_lint_status(doc))
    if not doc.has_note:
        findings.append(
            Finding("warning", "note", "no '## For the spec writer' section; add it so bmad-spec knows how to use this file")
        )
    for term in terms:
        for alias in term.avoid:
            pattern = _word(alias)
            for ex in doc.examples:
                if pattern.search(ex.title + "\n" + ex.text):
                    findings.append(
                        Finding("error", ex.id, f"uses avoided term '{alias}'; use '{term.name}'")
                    )
    for term in terms:
        for alias in term.avoid:
            pattern = _word(alias)
            for rule in doc.rules:
                if pattern.search(rule.text):
                    findings.append(Finding("error", rule.id, f"uses avoided term '{alias}'; use '{term.name}'"))
            for question in doc.questions:
                if pattern.search(question.text):
                    findings.append(Finding("error", question.id, f"uses avoided term '{alias}'; use '{term.name}'"))
    story = re.search(r"## Story\n(.*?)(?=\n## )", raw, re.S)
    if story:
        for term in terms:
            for alias in term.avoid:
                if _word(alias).search(story.group(1)):
                    findings.append(
                        Finding("error", "Story", f"uses avoided term '{alias}'; use '{term.name}'")
                    )
    return findings


MAX_RULES = 6
MAX_OPEN_QUESTIONS = 3


def _lint_status(doc: ExampleMap) -> list[Finding]:
    findings: list[Finding] = []
    if doc.status is None:
        findings.append(Finding("warning", "front matter", "no status; set `status: draft` or `status: ready`"))
    if len(doc.rules) > MAX_RULES:
        findings.append(Finding("warning", "rules", f"{len(doc.rules)} rules; the story is too large, split it"))
    per_rule: dict[str | None, int] = {}
    for ex in doc.examples:
        per_rule[ex.rule] = per_rule.get(ex.rule, 0) + 1
        if ex.source is None:
            findings.append(Finding("warning", ex.id, "no `_Source_:` line; use human or derived"))
    for rule in doc.rules:
        if per_rule.get(rule.id) == 1:
            findings.append(Finding("warning", rule.id, "rule has one example; thin, add a limit or a counterexample"))
    if doc.status == "ready":
        for ex in doc.examples:
            if ex.source != "human":
                findings.append(Finding("error", ex.id, "status is ready but this example is not human-supplied"))
        if len(doc.questions) > MAX_OPEN_QUESTIONS:
            findings.append(
                Finding("error", "Open questions", f"status is ready with {len(doc.questions)} open questions; answer some or set draft")
            )
    return findings


def _lint_steps(ex: Example) -> list[Finding]:
    findings: list[Finding] = []
    phase = 0
    order = {"Given": 1, "When": 2, "Then": 3}
    effective = None
    for keyword, body in ex.steps:
        if keyword == "Or":
            findings.append(Finding("error", ex.id, "step uses 'Or'; split into two scenarios"))
            continue
        if keyword in order:
            effective = keyword
            if order[keyword] < phase:
                findings.append(Finding("error", ex.id, f"steps out of order at '{keyword}'"))
            phase = max(phase, order[keyword])
        if effective == "Then" and VAGUE_RE.search(body):
            findings.append(Finding("warning", ex.id, f"vague Then step: '{body}'"))
        if PLACEHOLDER_RE.search(body):
            findings.append(Finding("warning", ex.id, f"placeholder value in step: '{body}'"))
    present = {k for k, _ in ex.steps}
    for needed in ("Given", "When", "Then"):
        if needed not in present:
            findings.append(Finding("error", ex.id, f"scenario has no {needed} step"))
    if len(ex.steps) > MAX_STEPS:
        findings.append(Finding("warning", ex.id, f"{len(ex.steps)} steps; aim for 5 or fewer"))
    return findings


def _iter_files(roots: list[Path]):
    """Yield each file under `roots` with its path relative to the root that holds it.

    The path starts with the name of the root's own folder, so a `tests` folder passed as the root still
    reads as tests. Folders above the root never count, so a repository that lives under a folder named
    `tests` or `venv` is read like any other. A file reached twice, through overlapping roots, is yielded
    once. A root that does not exist raises FileNotFoundError.
    """
    seen: set[Path] = set()
    for root in roots:
        if not root.exists():
            raise FileNotFoundError(2, "No such file or directory", str(root))
        root = root.resolve()
        if root.is_file():
            candidates = [(root, Path(root.parent.name) / root.name, set())]
        else:
            candidates = [
                (p, Path(root.name) / p.relative_to(root), set(p.relative_to(root).parts))
                for p in sorted(root.rglob("*"))
            ]
        for path, rel, below in candidates:
            if path in seen or not path.is_file() or (below & SKIP_DIRS):
                continue
            seen.add(path)
            yield path, rel


def _read(path: Path) -> str | None:
    try:
        return path.read_text(errors="strict")
    except (UnicodeDecodeError, OSError):
        return None


SPEC_FILES = {"SPEC.md", "stories.yaml"}


def _is_test(rel: Path) -> bool:
    """`rel` is the path below the search root. A spec file is never a test, even in a folder named `spec`."""
    name = rel.name.lower()
    parts = {p.lower() for p in rel.parts[:-1]}
    return rel.name not in SPEC_FILES and rel.suffix.lower() not in PROSE_SUFFIXES and (
        bool(parts & {"tests", "test", "__tests__", "spec", "e2e"})
        or name.startswith("test_")
        or ".test." in name
        or ".spec." in name
        or name.endswith("_test.py")
    )


def _is_spec(rel: Path) -> bool:
    return rel.name in SPEC_FILES or "stories" in rel.parts[:-1]


def _id_pattern(ex_id: str) -> re.Pattern[str]:
    number = ex_id.split("-")[1]
    return re.compile(rf"(?<![A-Za-z0-9])ex[-_]?{number}(?![0-9])", re.I)


def trace(doc: ExampleMap, roots: list[Path], tests_in: re.Pattern[str] | None = None) -> list[TraceRow]:
    """Where each example id appears. With `tests_in`, only a test file whose path matches it counts as a test.

    Ids are numbers within one feature, so a second feature's `test_ex_1` would otherwise cover this feature's EX-1.
    """
    files = [(p, rel, t) for p, rel in _iter_files(roots) if (t := _read(p)) is not None]
    rows = []
    for ex in doc.examples:
        row = TraceRow(ex.id)
        pattern = _id_pattern(ex.id)
        for path, rel, text in files:
            if not pattern.search(text):
                continue
            is_test = _is_test(rel) and (tests_in is None or tests_in.search(rel.as_posix()) is not None)
            bucket = row.tests if is_test else row.spec if _is_spec(rel) else row.other
            bucket.append(str(path))
        rows.append(row)
    return rows


def uncovered(rows: list[TraceRow]) -> list[str]:
    return [r.id for r in rows if not r.tests]


RECORD_NAMES = {".memlog.md", "GLOSSARY.md"}
RECORD_DIRS = {"reviews"}


def _is_record(rel: Path) -> bool:
    """A memlog, review report or glossary quotes avoided terms on purpose. `rel` is the path below the search root."""
    return rel.name in RECORD_NAMES or bool(set(rel.parts[:-1]) & RECORD_DIRS)


class GitError(Exception):
    """A git command that `scan --since` needs failed."""


def _git(cwd: Path, *args: str) -> str:
    try:
        done = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True)
    except FileNotFoundError as err:
        raise GitError("git is not installed") from err
    if done.returncode != 0:
        raise GitError(f"git {' '.join(args)} failed: {done.stderr.strip()}")
    return done.stdout


def added_lines(since: str, cwd: Path) -> dict[Path, set[int] | None]:
    """The lines added since `since`, per file. A file that is new and untracked maps to None, meaning every line."""
    top = Path(_git(cwd, "rev-parse", "--show-toplevel").strip())
    found: dict[Path, set[int] | None] = {}
    current: set[int] | None = None
    for line in _git(cwd, "diff", "-U0", "--no-color", "--no-ext-diff", since).splitlines():
        if line.startswith("+++ "):
            name = line[4:]
            if name == "/dev/null":
                current = None
                continue
            current = found.setdefault((top / name[2:]).resolve(), set())
        elif line.startswith("@@") and current is not None:
            match = re.search(r"\+(\d+)(?:,(\d+))?", line)
            if match:
                start, count = int(match.group(1)), int(match.group(2) or 1)
                current.update(range(start, start + count))
    for name in _git(top, "ls-files", "-o", "--exclude-standard", "-z").split("\0"):
        if name:
            found[(top / name).resolve()] = None
    return found


def scan_language(
    terms: list[Term], roots: list[Path], since: str | None = None, cwd: Path | None = None
) -> LanguageScan:
    """Count glossary terms and list avoided ones. With `since`, read only the lines added since that git ref."""
    result = LanguageScan(used={t.name: 0 for t in terms})
    changed = added_lines(since, cwd or Path.cwd()) if since else None
    for path, text in ((p, _read(p)) for p, rel in _iter_files(roots) if not _is_record(rel)):
        if text is None:
            continue
        prose = path.suffix.lower() in PROSE_SUFFIXES
        if changed is not None:
            key = path.resolve()
            if key not in changed:
                continue
            lines = changed[key]
            if lines is not None:
                text = "\n".join(l for n, l in enumerate(text.splitlines(), 1) if n in lines)
        for term in terms:
            result.used[term.name] += len(_word(term.name).findall(text))
            for alias in term.avoid:
                pattern = _word(alias)
                if any(pattern.search(line) for line in text.splitlines() if not (prose and FORBIDS_RE.search(line))):
                    result.avoided.append((str(path), alias, term.name))
    return result


def _print_rows(rows: list[TraceRow]) -> None:
    print(f"{'example':<8} {'spec':>4} {'tests':>5}  files")
    for r in rows:
        files = ", ".join(sorted(set(r.spec + r.tests)))
        print(f"{r.id:<8} {len(r.spec):>4} {len(r.tests):>5}  {files}")


def main(argv: list[str] | None = None) -> int:
    try:
        return _main(argv)
    except (OSError, UnicodeDecodeError) as err:
        print(f"error: cannot read {getattr(err, 'filename', None) or err}", file=sys.stderr)
        return 2
    except GitError as err:
        print(f"error: {err}", file=sys.stderr)
        return 2


def _main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawTextHelpFormatter)
    sub = parser.add_subparsers(dest="cmd", required=True)
    p_lint = sub.add_parser("lint", help="check the example map and glossary")
    p_lint.add_argument("--examples", required=True, type=Path)
    p_lint.add_argument("--glossary", type=Path)
    p_trace = sub.add_parser("trace", help="report where each example id is used")
    p_trace.add_argument("--examples", required=True, type=Path)
    p_trace.add_argument("--search", nargs="+", required=True, type=Path)
    p_trace.add_argument("--strict", action="store_true", help="same as --require both")
    p_trace.add_argument(
        "--require",
        choices=("spec", "tests", "both"),
        help="exit 1 unless every example has this kind of reference",
    )
    p_trace.add_argument("--only", nargs="+", metavar="EX-N", help="report and require only these example ids")
    p_trace.add_argument(
        "--tests-in",
        metavar="REGEX",
        help="count a test file only when its path matches this pattern, for example the feature's folder name",
    )
    p_trace.add_argument("--json", action="store_true")
    p_scan = sub.add_parser("scan", help="find avoided glossary terms in other files")
    p_scan.add_argument("--glossary", required=True, type=Path)
    p_scan.add_argument("--search", nargs="+", required=True, type=Path)
    p_scan.add_argument("--since", metavar="REF", help="read only the lines added since this git ref, for a repository with existing code")
    args = parser.parse_args(argv)

    if args.cmd == "lint":
        raw = args.examples.read_text()
        terms = parse_glossary(args.glossary.read_text()) if args.glossary else []
        findings = lint(parse_examples(raw), terms, raw)
        for f in findings:
            print(f"{f.level}: {f.where}: {f.message}")
        errors = sum(f.level == "error" for f in findings)
        print(f"{errors} error(s), {len(findings) - errors} warning(s)")
        return 1 if errors else 0
    if args.cmd == "trace":
        doc = parse_examples(args.examples.read_text())
        if not doc.examples:
            print(f"error: no examples found in {args.examples}", file=sys.stderr)
            return 2
        try:
            if args.tests_in is not None and not args.tests_in.strip():
                raise re.error("the pattern is empty")
            tests_in = re.compile(args.tests_in) if args.tests_in is not None else None
        except re.error as err:
            print(f"error: --tests-in is not a valid pattern: {err}", file=sys.stderr)
            return 2
        rows = trace(doc, args.search, tests_in)
        if args.only:
            wanted = [i.strip().upper() for part in args.only for i in part.split(",") if i.strip()]
            if not wanted:
                print("error: --only names no example id", file=sys.stderr)
                return 2
            known = {r.id for r in rows}
            unknown = [i for i in wanted if i not in known]
            if unknown:
                print(f"error: unknown example id: {', '.join(unknown)}", file=sys.stderr)
                return 2
            rows = [r for r in rows if r.id in wanted]
        if args.json:
            print(json.dumps([r.__dict__ for r in rows], indent=2))
        else:
            _print_rows(rows)
        require = args.require or ("both" if args.strict else None)
        needs = {"spec": ("spec",), "tests": ("tests",), "both": ("spec", "tests"), None: ("spec", "tests")}[require]
        gaps = [r.id for r in rows if not all(getattr(r, kind) for kind in needs)]
        if gaps:
            print(f"missing a {' and a '.join(needs)} reference: " + ", ".join(gaps))
        return 1 if (require and gaps) else 0
    if args.cmd == "scan":
        terms = parse_glossary(args.glossary.read_text())
        result = scan_language(terms, args.search, since=args.since)
        for path, alias, name in result.avoided:
            print(f"avoided term '{alias}' in {path}; use '{name}'")
        for name, count in result.used.items():
            print(f"{name}: used {count} time(s)")
        return 1 if result.avoided else 0
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
