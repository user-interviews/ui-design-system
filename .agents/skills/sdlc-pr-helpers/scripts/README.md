# `scripts/` for sdlc-pr-helpers

`pr-review-bundle.py` gathers one pull request's complete review state and prints it as raw JSON.
It judges nothing.
The `read` mode hands the JSON to a fresh subagent for the verdict, and `respond` matches findings to threads with it.

Run it with `uv run pr-review-bundle.py <pr-number> [--repo OWNER/REPO]`.
`uv` reads the script's PEP 723 header to pick a Python 3.11 or newer, so nothing needs installing beyond `uv` and an authenticated `gh`.

| Exit code | Meaning |
|---|---|
| 0 | The bundle was assembled and printed. |
| 2 | Usage error. |
| 3 | Environment or read failure. No bundle was produced. |

The tests and the recorded pull-request bundle they use stay in the sdlc-flows repository and are not installed.
