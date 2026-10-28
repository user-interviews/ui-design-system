---
name: sdlc-estimates
description: Use when sizing epics or stories in story points, or recording a story-point estimate in Jira or a BMAD spec folder. A repository's own estimation workflow takes precedence over this skill. Story points are never a time estimate.
---

# Estimating in story points

## Before you start

Check that this skill owns the estimate. Two scales written into one Jira field make the numbers meaningless. Decide who owns the estimate first.

1. **A repository workflow wins.** If the person names a workflow for this estimate, or this repository's `AGENTS.md`, `CLAUDE.md`, README, docs or an installed skill describes one for estimating epics or tickets, use it and stop. Do not apply this skill's ruler, anchors or recording. Write nothing to Jira from this skill.
2. **Otherwise, go by where the ticket's spec lives.**
   - The ticket has a BMAD spec folder (one holding `stories.yaml`, `.memlog.md` or an `estimates.md`) or a BMAD epics file: continue, and record as "Recording" says.
   - The ticket has an OpenSpec change (a folder under `openspec/`): the repository's workflow owns the estimate. Say so and stop. If you cannot find an estimation workflow for it, say that too. Then ask the person whether to continue with this skill. Before any Jira write on a yes, read the ticket's Story Points field, and if it already holds a number, do not overwrite it.
3. **Both or neither: ask once.** If the ticket has both kinds of spec, or neither, ask which workflow owns it. Write nothing to Jira until the person answers. If the answer is unclear, or you cannot ask because no person is present, stop and write nothing.

## What a story point is

**A story point is an arbitrary measure of relative size.** It comes from a sizing method that is about ten years old and predates AI-assisted work. It says how big a piece of work is compared with other pieces of work, and nothing else.

**A story point is never a time estimate.** It does not mean hours, days, weeks, sprints or months. No document, ticket, comment, table or message converts points to a duration or states one for any number of points. That covers every conversion: "N points is a day", "N points a week", "about M weeks", "per sprint".

**The ruler.** The size of one point is fixed by a pre-AI convention that teams used to practise: an engineer's capacity for one two-week sprint was 30 story points, which is 3 points for each ideal engineering day. That convention is only the definition of how big one point is. It describes how work was sized before AI-assisted development, and it forecasts nothing. Nobody uses it to say how long a piece of work will take, because AI-assisted work does not follow it. This is ruler version 1, frozen on 2026-10-05. Changing it creates a new ruler version, and every existing estimate keeps the ruler it was made with.

**Calendar time can be derived only from measurements, and none exist yet.** The measurement is the story points an engineer completes per sprint, observed over real sprints. Until that data exists, nothing states how long any number of points will take. When it does exist, the derivation is written down with its data and dates, in its own document, and it never replaces the points.

Every artifact that records an estimate carries this one-line note, and nothing longer:

> Story points are an arbitrary relative size from a pre-AI sizing method. They are never a time estimate. See the `sdlc-estimates` skill.

## The rules

1. **One scale.** Points are relative to the reference stories in `anchors.md`. A story twice as big as an anchor gets about twice its points. The estimator is a competent developer who knows the codebase and works without AI help.
2. **Estimate without regard to the actuals.** Do not shrink or inflate an estimate because the loop was fast or slow on earlier stories. Do not look at the actual cost of the story being estimated.
3. **An original estimate is never edited.** Leave the estimate table and its comment as first written. If an estimate was wrong, add a dated note that says so and what the work turned out to be. The one exception is a deliberate recalibration, which replaces the whole set at once (see "Recalibrating").
4. **Say which kind of estimate it is.** A `forecast` is written before the work starts. A `retrospective` is written after the work was built, from the finished work, and it is less trustworthy because the size is already known. Label each one.

## Two story lists

An epic's stories exist twice. The epics file holds the **plan** stories (ids like 2.1). The epic's spec folder holds the **spec** stories that `bmad-spec` re-planned and `bmad-loop` builds (ids like 2-7). Reconcile later writes a map from planned id to built id.

- **Plan estimate.** Estimate the epic's plan stories when the epic is planned, before its spec exists. Record it on the epics file's `#### Estimates` subsection and in Jira.
- **Spec forecast.** Estimate the spec stories when the spec is written, before the loop starts. Record it in the spec folder's `estimates.md`, and the memlog.
- **Keep both.** They are two original estimates, made at two moments. When re-planning changed the scope, the gap between their totals measures that change. Do not reconcile one into the other.
- **After reconcile,** the epic's totals in Jira are the spec forecast, because that is what was built. The plan estimate stays in the epics file as first written.
- Key every estimate row by the id of the list it was made on, and carry the mapped id in a second column once reconcile has run.

## Estimating (done when every story has points and a basis)

1. List the stories (or, for an epic with no stories yet, the capabilities) from its spec, plan or goal. Use the descriptions and acceptance criteria as written.
2. Follow `rubric.md`: pick the level (epic, story, story with code read, retrospective), work out the base points, and add the factor points for API changes, versioning and compatibility, coordination across repositories and services, and code complexity.
3. Write each estimate with its level, its range and the factors you applied. A high-level estimate has a wide range, and that is correct.
4. Check the number against the anchors in `anchors.md` and note any story that sits far from its nearest anchor.
5. Sum the stories into the epic's total. The total is in points. Do not convert it to anything.
6. Record the estimate where "Recording" says, with its basis (`forecast` or `retrospective`), its level and the date.
7. Offer the estimates for review. Review comments follow the rules at the end of `rubric.md`.

A retrospective estimate may start from the finished diff (the current line rates in `anchors.md`): a fixed overhead per story, points per production line added, a tenth of that for deleted lines, and points per test line added. Round to whole points and never go below 2 points. Then adjust by judgement, because a move or a removal is cheaper per line than new logic: count only the lines that are new work. Do not use this formula for a forecast. Estimate a forecast by analogy to the anchors.

A sanity check on any story: one guard of about 40 production lines and 140 test lines is 2 to 3 points. If your number for a small story is above that, find what the extra points are made of and name it, or lower the number.

## Recalibrating

A recalibration changes the rates for the whole set at once, by a person's decision, when the estimates prove consistently off. It is dated, it has a reason, and it never happens one story at a time.

1. Write the date, the reason and the new rates in `anchors.md`. Replace the old rates there. Do not keep them.
2. Replace the numbers everywhere they were recorded: the tracker's fields, the comment tables and `estimates.md`. The current numbers are the only numbers. Delete comments that exist only to compare old and new.
3. Re-estimate the epics that are not yet built by analogy to the recalibrated anchors, not by scaling the old numbers.
4. Say which of the new numbers were not blind, because the outcome was already known when they were made.

## Recording (done when the read-back shows the numbers)

1. Put the epic's total in the tracker's story points field, and nowhere else. Leave the time-tracking Original estimate and Remaining estimate empty. A rule in the tracker sums sub-task time estimates into the parent and emails watchers, and a time estimate would present points as a duration.
2. Add a comment with the per-story table: story, points, range, level, factors, basis. Put the one-line note from "What a story point is" under the title. Keep that table when the work finishes.
3. Read the record back and check the numbers.

For Jira, follow `jira.md` in this folder: it has the field ids, the tool calls and the traps.
For the BMAD artifacts (the spec folder's `estimates.md`, the memlog lines, the epics file), follow `bmad-artifacts.md`. Commit a forecast before the loop starts, so the original estimate is original in git history as well.

## Never

- Never state, imply or compute a duration for any number of points. The ruler's 30 points per pre-AI engineer-sprint defines the size of a point and is not a conversion rate.
- Never divide points by a time, token or cost figure, or the reverse. A points-per-hour figure is a points-to-time conversion.
- Never rescale the points because of the actuals.
- Never overwrite an original estimate.
- Never set a time-tracking estimate (Original or Remaining) on an epic sub-task.
- Never mix a forecast and a retrospective in one total without labelling each part.
