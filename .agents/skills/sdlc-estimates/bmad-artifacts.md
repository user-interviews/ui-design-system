# Logging estimates in the BMAD artifacts

Read this when the skill says to record in the spec folder or the epics file.
The rules below come from `bmad-spec` (`.claude/skills/bmad-spec/SKILL.md` and `assets/stories-schema.md`) and `bmad-loop`.
Check them again if either tool is updated.

## What each artifact owns

| Artifact | Owner | Rule for estimates |
|---|---|---|
| `SPEC.md` and its companions | `bmad-spec`, re-derived from the memlog | Never hand-edit. Put nothing about estimates here. |
| `stories.yaml` | `bmad-spec`, re-derived from the memlog | Never add a points or status field. The schema has a fixed set of fields, forbids `status`, and is rewritten on the next derive. |
| `.memlog.md` | `bmad-spec`, append-only | Append one line per estimate with `memlog.py`. Never edit existing lines. |
| `stories/<id>-*.md` | `bmad-loop` | Leave alone. They hold the loop's Auto Run Result and are read by reconcile. |
| `estimates.md` in the spec folder | this skill | The durable record of estimates and review notes. `bmad-spec` ignores unknown files. Do not list it in `companions:`. |
| The epic's section in the epics file | the plan | A `#### Estimates` subsection that summarises `estimates.md`. The reconcile checker does not parse it. |

## The memlog lines

From the repo root, with the spec folder as the workspace:

- Estimate, written before the work: `uv run _bmad/scripts/memlog.py append --workspace <spec folder> --type note --text "estimate (forecast) story 2-7: 12 points, 2026-10-04"`.
- Re-estimates are a new `note` that says "re-estimate" and why. They never replace the earlier line.

## estimates.md

Create it in the spec folder when the epic is estimated. Frontmatter holds `created` and `updated` as full UTC ISO-8601 datetimes. The body has:

1. The standard note from "What a story point is" in `SKILL.md`, as one line under the title: "Story points are an arbitrary relative size from a pre-AI sizing method. They are never a time estimate. See the `sdlc-estimates` skill."
2. An estimates table, one row per story: built id, planned id (from the epics file) or `none`, points, range, level (`epic`, `story`, `story, code read` or `retrospective`), factors applied, basis (`forecast` or `retrospective`) and the date written. Never change a row after the baseline is set.
3. A review-notes table: the date, the reviewer, the story id, the comment and the outcome (accepted, changed or kept). Before the baseline an accepted comment changes the row. After it, the comment is recorded and the row stays.
4. A totals row for the estimates table. Do not add a points-per-time figure.

## The epics file

After reconcile, add a `#### Estimates` subsection under the epic's section with the totals, the basis and a pointer to `estimates.md`.
Keep story estimates out of the story headings, so the reconcile checker's heading comparison is not affected.

## When to write

- **A forecast is committed before the loop starts**, together with the spec. Git history then shows the forecast existed before any story was built, which is what keeps an original estimate original. Put it in `estimates.md` and the memlog line.
- **While a loop runs, do not edit tracked files in its worktree.** The loop refuses a dirty tree and commits what it finds. Keep working notes outside the repo and add them afterwards, or write them in a separate worktree.
- If an estimate was first recorded only outside the repo (for example in a Jira comment), say so in `estimates.md` and cite the comment's timestamp as the provenance.
