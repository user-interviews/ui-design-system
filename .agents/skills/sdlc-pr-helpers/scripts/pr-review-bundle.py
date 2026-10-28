#!/usr/bin/env python3
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Gather everything about a pull request's review state into one JSON bundle.

Read-only, and deliberately does no judgment at all: it fetches, it does not
decide. `pr-review-check.py` (the older tool this one replaces the reading
half of) grew a hand-written parser for every shape a reviewer's review body
could take -- a "Suppressed comments" heading, then Copilot's newer
"ccr-overview-v2" format, then a second variant of that same format -- and
each new shape meant a silent false-clean until a human noticed and a patch
landed. Reading prose for meaning is what a model is for; this script's job
ends at handing over everything a model would need to do that reading itself,
with nothing paraphrased, summarized, or pattern-matched out of it.

What it still does mechanically, because none of this is a text-comprehension
problem: paginating every source to exhaustion (GitHub's `Link` header is the
only authoritative answer to "is there more", so a short page is never
inferred to be the last one), picking which review is "latest" per reviewer
(highest `submitted_at`, ties broken by review id), checking whether that
latest review is at the pull request's current head, and reporting a standing
`CHANGES_REQUESTED` (a reviewer who requests changes and later leaves a
comment-only review still has a standing request; only a dismissal or an
approval clears it). These are structured facts about API objects, not claims
about what a comment means.

Four sources, every run, same rationale as before: automated reviewers file
findings in several places, and one of them -- a review's own body -- is
invisible to every API a model naturally polls first.

  1. GraphQL `reviewThreads`     -- the only source of isResolved / isOutdated
  2. REST  /pulls/N/comments     -- inline findings, no resolution state
  3. REST  /pulls/N/reviews      -- review bodies, kept fully raw
  4. REST  /issues/N/comments    -- the acknowledgments that clear a finding

No single source is complete, so a partial read is never a bundle.

A fifth read, `pulls/files`, is not a finding source -- it is the PR's own
list of changed paths, included so a reader can check whether a finding's
location is actually part of the diff before trusting it. Confirmed live
that this matters: a reviewer is not limited to the diff itself and can
leave findings on files the pull request never touched.

A sixth and seventh read, the head commit's check runs and commit statuses,
are not finding sources either. They report whether CI and tests passed, which
is a fact about the code and has nothing to do with whether a reviewer found
anything. They are copied into the bundle untouched (name, status, conclusion,
link) and no code in this file decides what counts as failing.

Two rules carried over, because they are still true:

  * A reviewer's check-run conclusion says nothing about that reviewer's
    findings. Copilot's check returned `success` while filing findings in six
    of six audited cases, so no code path here uses a check to decide reviewer
    state. Checks appear under `checks`, separate from `reviewers`.
  * An empty reviewer result is not a pass. A reviewer that has not reviewed,
    or has not seen the current head, is reported as such in the bundle.

Exit codes:
  0  bundle assembled
  2  usage error
  3  environment or read failure -- no bundle was produced

Usage:
  uv run scripts/pr-review-bundle.py <pr-number> [--repo OWNER/REPO]
"""
from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
import traceback

EXIT_OK = 0
EXIT_USAGE = 2
EXIT_ENV = 3

PER_PAGE = 100
GH_TIMEOUT_SECONDS = 60
PAGE_CAP = 100

USAGE = "usage: pr-review-bundle.py <pr-number> [--repo OWNER/REPO]"

# The same reviewer has different logins in different APIs, and Copilot even
# differs between two REST endpoints: its *review* author is
# `copilot-pull-request-reviewer[bot]` while its *inline comment* author is
# `Copilot`. So an allowlist is per-endpoint. Re-derive by listing one PR's
# comments through both APIs and comparing the author fields.
REVIEWERS: dict[str, dict[str, object]] = {
    "bugbot": {
        "display": "Cursor Bugbot",
        "rest_review_logins": frozenset({"cursor[bot]"}),
    },
    "copilot": {
        "display": "GitHub Copilot",
        "rest_review_logins": frozenset({"copilot-pull-request-reviewer[bot]"}),
    },
}

LINK_NEXT = re.compile(r'rel="next"', re.IGNORECASE)

THREADS_QUERY = """
query($owner:String!, $name:String!, $number:Int!, $cursor:String) {
  repository(owner:$owner, name:$name) {
    pullRequest(number:$number) {
      headRefOid
      reviewThreads(first:100, after:$cursor) {
        totalCount
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          isResolved
          isOutdated
          path
          line
          originalLine
          comments(first:100) {
            pageInfo { hasNextPage }
            nodes { databaseId url body author { login __typename } }
          }
        }
      }
    }
  }
}
"""


class Fail(Exception):
    """A named reason the run cannot produce a bundle, with its exit code."""

    def __init__(self, code: int, message: str) -> None:
        super().__init__(message)
        self.code = code
        self.message = message


# --------------------------------------------------------------------------
# Talking to GitHub, through `gh` only
# --------------------------------------------------------------------------
def run_gh(args: list[str], what: str) -> str:
    try:
        proc = subprocess.run(["gh", *args], capture_output=True, text=True,
                              timeout=GH_TIMEOUT_SECONDS)
    except subprocess.TimeoutExpired as exc:
        raise Fail(EXIT_ENV,
                   f"{what}: gh did not return within {GH_TIMEOUT_SECONDS}s") from exc
    except OSError as exc:
        raise Fail(EXIT_ENV, f"{what}: could not execute gh ({exc})") from exc
    if proc.returncode != 0:
        detail = proc.stderr.strip() or "(no stderr)"
        raise Fail(EXIT_ENV, f"{what}: gh exited {proc.returncode}: {detail}")
    return proc.stdout


def gh_json(args: list[str], what: str):
    out = run_gh(args, what)
    try:
        return json.loads(out)
    except json.JSONDecodeError as exc:
        raise Fail(EXIT_ENV, f"{what}: gh returned output that is not JSON ({exc})") from exc


def require_gh() -> None:
    if shutil.which("gh") is None:
        raise Fail(EXIT_ENV,
                   "environment: gh is not on PATH -- install it and run `gh auth login`")
    run_gh(["auth", "status"], "environment: gh authentication")


def split_headers(raw: str, what: str) -> tuple[str, str]:
    text = raw.replace("\r\n", "\n")
    head, sep, body = text.partition("\n\n")
    if not sep:
        raise Fail(EXIT_ENV,
                   f"{what}: `gh api -i` produced no blank line between headers and body, "
                   "so the Link header cannot be read; refusing to guess how many pages there are")
    return head, body


def has_next_page(head: str) -> bool:
    for line in head.split("\n"):
        name, sep, value = line.partition(":")
        if sep and name.strip().lower() == "link" and LINK_NEXT.search(value):
            return True
    return False


def paginate_rest(path: str, what: str, key: str | None = None) -> tuple[list, int]:
    """Exhaust a REST collection. `key` names the array inside an object response
    (check-runs wraps its array as {"total_count":..., "check_runs":[...]})."""
    items: list = []
    declared_total = None
    for page in range(1, PAGE_CAP + 1):
        sep = "&" if "?" in path else "?"
        url = f"{path}{sep}per_page={PER_PAGE}&page={page}"
        raw = run_gh(["api", "-i", "-H", "Accept: application/vnd.github+json", url],
                     f"{what} page {page}")
        head, body = split_headers(raw, f"{what} page {page}")
        try:
            chunk = json.loads(body)
        except json.JSONDecodeError as exc:
            raise Fail(EXIT_ENV,
                       f"{what} page {page}: gh returned output that is not JSON ({exc})") from exc
        body_obj = chunk
        if key is not None:
            if not isinstance(chunk, dict) or not isinstance(chunk.get(key), list):
                raise Fail(EXIT_ENV,
                           f"{what} page {page}: expected an object holding a {key!r} array")
            declared_total = body_obj.get("total_count")
            chunk = chunk[key]
        if not isinstance(chunk, list):
            raise Fail(EXIT_ENV,
                       f"{what} page {page}: expected a JSON array, got "
                       f"{type(chunk).__name__}")
        items.extend(chunk)
        if not has_next_page(head):
            if declared_total is not None and declared_total != len(items):
                raise Fail(EXIT_ENV,
                           f"{what}: read {len(items)} items but the API declared "
                           f"{declared_total}; the read is incomplete")
            return items, page
    raise Fail(EXIT_ENV,
               f"{what}: still paginating after {PAGE_CAP} pages; refusing to produce a "
               "bundle from a read that may be truncated")


def read_pull(owner: str, name: str, number: int, what: str) -> dict:
    doc = gh_json(["api", "-H", "Accept: application/vnd.github+json",
                   f"repos/{owner}/{name}/pulls/{number}"], what)
    if not isinstance(doc, dict) or "head" not in doc:
        raise Fail(EXIT_ENV, f"{what}: response has no head; not a pull request payload")
    return doc


def read_threads(owner: str, name: str, number: int) -> tuple[list[dict], list[str], int]:
    """GraphQL reviewThreads, exhausted, with every head SHA it reported."""
    nodes: list[dict] = []
    heads: list[str] = []
    cursor: str | None = None
    declared_total: int | None = None
    for page in range(1, PAGE_CAP + 1):
        what = f"read 1/7 reviewThreads (GraphQL) page {page}"
        args = ["api", "graphql",
                "-f", f"owner={owner}", "-f", f"name={name}", "-F", f"number={number}",
                "-f", f"query={THREADS_QUERY}"]
        if cursor is not None:
            args += ["-f", f"cursor={cursor}"]
        doc = gh_json(args, what)
        if not isinstance(doc, dict):
            raise Fail(EXIT_ENV, f"{what}: expected a JSON object")
        if doc.get("errors"):
            raise Fail(EXIT_ENV,
                       f"{what}: GraphQL returned errors: {json.dumps(doc['errors'])[:400]}")
        pull = ((doc.get("data") or {}).get("repository") or {}).get("pullRequest")
        if not isinstance(pull, dict):
            raise Fail(EXIT_ENV, f"{what}: no pullRequest in the response")
        head = pull.get("headRefOid")
        if not head:
            raise Fail(EXIT_ENV, f"{what}: no headRefOid in the response")
        heads.append(head)
        conn = pull.get("reviewThreads") or {}
        if declared_total is None:
            declared_total = conn.get("totalCount")
        for node in conn.get("nodes") or []:
            comments = node.get("comments") or {}
            if (comments.get("pageInfo") or {}).get("hasNextPage"):
                raise Fail(EXIT_ENV,
                           f"{what}: thread {node.get('id')} has more than {PER_PAGE} "
                           "comments and an unconsumed cursor")
            nodes.append(node)
        info = conn.get("pageInfo") or {}
        if not info.get("hasNextPage"):
            if declared_total is not None and len(nodes) != declared_total:
                raise Fail(EXIT_ENV,
                           f"read 1/7 reviewThreads: read {len(nodes)} threads but the API "
                           f"declared {declared_total}; the read is incomplete or the pull "
                           "request changed mid-run")
            return nodes, heads, page
        cursor = info.get("endCursor")
        if not cursor:
            raise Fail(EXIT_ENV,
                       f"{what}: hasNextPage is true but no endCursor was returned; the "
                       "remaining threads are unreachable")
    raise Fail(EXIT_ENV, f"read 1/7 reviewThreads: still paginating after {PAGE_CAP} pages")


def reviewer_for(login: str) -> str | None:
    for key, spec in REVIEWERS.items():
        if login in spec["rest_review_logins"]:  # type: ignore[operator]
            return key
    return None


def latest_review_per_reviewer(reviews: list[dict]) -> dict[str, dict]:
    """Latest = highest submitted_at, ties broken by review id."""
    latest: dict[str, dict] = {}
    for review in reviews:
        login = (review.get("user") or {}).get("login") or ""
        key = reviewer_for(login)
        if key is None or not review.get("submitted_at"):
            continue
        current = latest.get(key)
        if current is None or (review["submitted_at"], review.get("id") or 0) > \
                (current["submitted_at"], current.get("id") or 0):
            latest[key] = review
    return latest


# The states that change where a reviewer stands. COMMENTED and PENDING do
# not: GitHub does not treat a later comment-only review as withdrawing a
# request for changes.
STANDING_STATES = ("CHANGES_REQUESTED", "APPROVED", "DISMISSED")


def standing_changes_requested(reviews: list[dict]) -> list[dict]:
    """Every reviewer -- human included -- with an unwithdrawn CHANGES_REQUESTED."""
    by_login: dict[str, list[dict]] = {}
    for review in reviews:
        login = (review.get("user") or {}).get("login") or ""
        if not login or not review.get("submitted_at"):
            continue
        by_login.setdefault(login, []).append(review)

    out: list[dict] = []
    for login in sorted(by_login):
        ordered = sorted(by_login[login],
                         key=lambda r: (r.get("submitted_at") or "", r.get("id") or 0))
        standing = None
        for review in ordered:
            if (review.get("state") or "") in STANDING_STATES:
                standing = review
        if standing is not None and (standing.get("state") or "") == "CHANGES_REQUESTED":
            out.append({"login": login, "review_id": standing.get("id"),
                        "submitted_at": standing.get("submitted_at")})
    return out


def latest_status_per_context(statuses: list[dict]) -> list[dict]:
    """The statuses endpoint lists every status ever posted on the commit, so a
    failure that a retry later turned green is still in it. The newest entry per
    context is that context's current state (ties keep the earlier-listed entry,
    and the endpoint lists newest first)."""
    latest: dict[str, dict] = {}
    for status in statuses:
        context = status.get("context") or ""
        current = latest.get(context)
        if current is None or (status.get("created_at") or "") > (current.get("created_at") or ""):
            latest[context] = status
    return list(latest.values())


def thread_location(node: dict) -> tuple[str, object]:
    line_no = node.get("line")
    if line_no is None:
        line_no = node.get("originalLine")
    return (node.get("path") or ""), line_no


def build_bundle(owner: str, name: str, number: int) -> dict:
    slug = f"{owner}/{name}"

    pull_first = read_pull(owner, name, number, "read 0 pull metadata")
    head_first = (pull_first.get("head") or {}).get("sha") or ""
    heads = [("pull metadata (first)", head_first)]

    threads, thread_heads, thread_pages = read_threads(owner, name, number)
    for index, value in enumerate(thread_heads, start=1):
        heads.append((f"reviewThreads page {index}", value))

    inline, inline_pages = paginate_rest(f"repos/{slug}/pulls/{number}/comments",
                                         "read 2/7 pulls/comments")
    reviews, review_pages = paginate_rest(f"repos/{slug}/pulls/{number}/reviews",
                                          "read 3/7 pulls/reviews")
    issue_comments, issue_pages = paginate_rest(f"repos/{slug}/issues/{number}/comments",
                                                "read 4/7 issues/comments")
    changed, changed_pages = paginate_rest(f"repos/{slug}/pulls/{number}/files",
                                           "read 5/7 pulls/files")

    check_runs, check_run_pages = paginate_rest(
        f"repos/{slug}/commits/{head_first}/check-runs", "read 6/7 check-runs",
        key="check_runs")
    statuses, status_pages = paginate_rest(f"repos/{slug}/commits/{head_first}/statuses",
                                           "read 7/7 commit statuses")

    pull_last = read_pull(owner, name, number, "read 8 pull metadata (re-check)")
    heads.append(("pull metadata (last)", (pull_last.get("head") or {}).get("sha") or ""))

    stamp_first, stamp_last = pull_first.get("updated_at"), pull_last.get("updated_at")
    if stamp_first != stamp_last:
        raise Fail(EXIT_ENV,
                   "the pull request changed during the run (updated_at "
                   f"{stamp_first} -> {stamp_last}); re-run -- a review, comment, or "
                   "resolution may have landed between two reads")

    if len({value for _, value in heads}) != 1:
        detail = ", ".join(f"{where}={value[:8] or '(none)'}" for where, value in heads)
        raise Fail(EXIT_ENV,
                   "head changed during the run; re-run -- a bundle spanning two heads "
                   f"describes neither ({detail})")
    head = head_first

    thread_comment_ids: set[int] = set()
    review_threads: list[dict] = []
    for node in threads:
        comments = (node.get("comments") or {}).get("nodes") or []
        for comment in comments:
            if comment.get("databaseId") is not None:
                thread_comment_ids.add(int(comment["databaseId"]))
        path, line_no = thread_location(node)
        review_threads.append({
            "thread_id": node.get("id") or "",
            "path": path, "line": line_no,
            "is_resolved": bool(node.get("isResolved")),
            "is_outdated": bool(node.get("isOutdated")),
            "comments": [{
                "id": c.get("databaseId"),
                "author": (c.get("author") or {}).get("login") or "",
                "author_type": (c.get("author") or {}).get("__typename") or "",
                "url": c.get("url") or "",
                "body": c.get("body") or "",
            } for c in comments],
        })

    orphan_inline_comments = [{
        "id": comment.get("id"),
        "path": comment.get("path"),
        "line": comment.get("line") if comment.get("line") is not None
                else comment.get("original_line"),
        "author": (comment.get("user") or {}).get("login") or "",
        "author_type": (comment.get("user") or {}).get("type") or "",
        "url": comment.get("html_url") or "",
        "body": comment.get("body") or "",
    } for comment in inline if comment.get("id") is not None
      and int(comment["id"]) not in thread_comment_ids]

    latest = latest_review_per_reviewer(reviews)
    reviewers_state: dict[str, dict] = {}
    for key, spec in REVIEWERS.items():
        review = latest.get(key)
        if review is None:
            reviewers_state[key] = {"display": spec["display"], "reviewed": False}
        else:
            reviewers_state[key] = {
                "display": spec["display"],
                "reviewed": True,
                "review_id": review.get("id"),
                "state": review.get("state"),
                "commit_id": review.get("commit_id"),
                "submitted_at": review.get("submitted_at"),
                "at_head": review.get("commit_id") == head,
                "body": review.get("body") or "",
            }

    all_reviews = [{
        "id": review.get("id"),
        "login": (review.get("user") or {}).get("login") or "",
        "reviewer_key": reviewer_for((review.get("user") or {}).get("login") or ""),
        "state": review.get("state"),
        "commit_id": review.get("commit_id"),
        "submitted_at": review.get("submitted_at"),
        "at_head": review.get("commit_id") == head,
        "body": review.get("body") or "",
    } for review in reviews if review.get("submitted_at")]

    all_issue_comments = [{
        "id": comment.get("id"),
        "login": (comment.get("user") or {}).get("login") or "",
        "author_association": comment.get("author_association") or "",
        "created_at": comment.get("created_at"),
        "url": comment.get("html_url") or "",
        "body": comment.get("body") or "",
    } for comment in issue_comments]

    # A reviewer is not limited to commenting on lines this diff actually
    # touches -- confirmed live on a real PR, where Copilot left findings on
    # files entirely untouched by the diff. Without this list, a downstream
    # reader has no cheap way to check "is this location even part of the
    # diff" and can end up trusting a finding's own framing (e.g. "this new
    # behavior...") instead of verifying it -- exactly the failure mode the
    # materiality test exists to catch.
    changed_files = [{
        "path": entry.get("filename"),
        "status": entry.get("status"),
        "additions": entry.get("additions"),
        "deletions": entry.get("deletions"),
    } for entry in changed]

    # Raw facts about the head commit's CI. Deliberately not summarized: which
    # conclusions count as failing is a judgment for the reader, and a check
    # that is still queued or running is reported as it is, never as passing.
    checks = {
        "runs": [{
            "name": run.get("name"),
            "app": (run.get("app") or {}).get("slug") or "",
            "status": run.get("status"),
            "conclusion": run.get("conclusion"),
            "started_at": run.get("started_at"),
            "completed_at": run.get("completed_at"),
            "url": run.get("html_url") or run.get("details_url") or "",
        } for run in check_runs],
        "statuses": [{
            "context": status.get("context"),
            "state": status.get("state"),
            "created_at": status.get("created_at"),
            "url": status.get("target_url") or "",
        } for status in latest_status_per_context(statuses)],
    }

    return {
        "repo": slug,
        "number": number,
        "url": pull_first.get("html_url") or "",
        "head": head,
        "draft": bool(pull_first.get("draft")),
        "pr_author": (pull_first.get("user") or {}).get("login") or "",
        "reads": {
            "reviewThreads": {"count": len(threads), "pages": thread_pages},
            "pulls_comments": {"count": len(inline), "pages": inline_pages},
            "pulls_reviews": {"count": len(reviews), "pages": review_pages},
            "issues_comments": {"count": len(issue_comments), "pages": issue_pages},
            "pulls_files": {"count": len(changed), "pages": changed_pages},
            "check_runs": {"count": len(check_runs), "pages": check_run_pages},
            "commit_statuses": {"count": len(statuses), "pages": status_pages},
        },
        "reviewers": reviewers_state,
        "standing_changes_requested": standing_changes_requested(reviews),
        "changed_files": changed_files,
        "checks": checks,
        "review_threads": review_threads,
        "orphan_inline_comments": orphan_inline_comments,
        "reviews": all_reviews,
        "issue_comments": all_issue_comments,
    }


REPO_SHAPE = re.compile(r"^[^/\s]+/[^/\s]+$")


def parse_args(argv: list[str]) -> tuple[int, str | None]:
    number: int | None = None
    repo: str | None = None
    index = 0
    while index < len(argv):
        arg = argv[index]
        if arg in ("-h", "--help"):
            print(__doc__)
            raise SystemExit(EXIT_OK)
        if arg == "--repo":
            index += 1
            if index >= len(argv):
                raise Fail(EXIT_USAGE, f"--repo needs a value. {USAGE}")
            repo = argv[index]
        elif arg.startswith("--repo="):
            repo = arg.split("=", 1)[1]
        elif arg.startswith("-"):
            raise Fail(EXIT_USAGE, f"unknown option {arg}. {USAGE}")
        elif number is None:
            if not arg.isdecimal():
                raise Fail(EXIT_USAGE, f"pr-number must be a positive integer. {USAGE}")
            number = int(arg)
        else:
            raise Fail(EXIT_USAGE, f"unexpected argument {arg!r}. {USAGE}")
        index += 1
    if number is None:
        raise Fail(EXIT_USAGE, f"missing <pr-number>. {USAGE}")
    if repo is not None and not REPO_SHAPE.match(repo):
        raise Fail(EXIT_USAGE, f"--repo must look like OWNER/REPO, got {repo!r}. {USAGE}")
    return number, repo


def resolve_repo(repo: str | None) -> tuple[str, str]:
    if repo is not None:
        owner, name = repo.split("/", 1)
        return owner, name
    doc = gh_json(["repo", "view", "--json", "nameWithOwner"],
                  "environment: resolving the repository")
    slug = (doc or {}).get("nameWithOwner") or ""
    if slug.count("/") != 1 or not all(slug.split("/")):
        raise Fail(EXIT_ENV,
                   "environment: could not resolve OWNER/REPO from `gh repo view`; pass --repo")
    owner, name = slug.split("/", 1)
    return owner, name


def main(argv: list[str]) -> int:
    try:
        number, repo = parse_args(argv)
        require_gh()
        owner, name = resolve_repo(repo)
        bundle = build_bundle(owner, name, number)
    except Fail as failure:
        print(f"pr-review-bundle: {failure.message}", file=sys.stderr)
        if failure.code == EXIT_ENV:
            print("pr-review-bundle: no bundle produced", file=sys.stderr)
        return failure.code
    except Exception as exc:  # noqa: BLE001
        traceback.print_exc()
        print(f"pr-review-bundle: internal error: {exc!r}", file=sys.stderr)
        print("pr-review-bundle: no bundle produced", file=sys.stderr)
        return EXIT_ENV

    print(json.dumps(bundle, indent=2))
    return EXIT_OK


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
