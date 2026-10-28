# Mode `cost`: price a finished run

Set `SKILL_DIR` as `SKILL.md` describes.
The cost script prices each session of a run from the run's journal and the sessions' transcripts, at list prices.
The price file `$SKILL_DIR/scripts/sdlc-bmad-loop-model-prices.json` holds those prices.
The script warns when an entry is more than 60 days old.

1. Run `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-cost.sh" --by-story <run-id>` and report the total with its session count.
   A `~` note that says the journal's weighted count is about 2 times the unique-message count means the run used an unpatched bmad-loop.
   Report it, and apply the patch before the next run: `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh"` applies it.
   A story that was attempted more than once has one row for each attempt, so the total includes discarded attempts.
2. Report any unmatched or unpriced session and say the total is then a lower bound.
   A session with no end record shows its amount with a `+` and is unpriced, because it may still be running or may have been killed.
   A row named `(journal)` is not a session.
   It means the journal had lines that could not be read, so a session may be missing.
3. State that the figure is a list-price equivalent and not an invoice.
   Do not take a cost from `bmad-loop status`: it reads only each session's own transcript, so it leaves out the subagents, which were 53% of the cost in one measured loop, and it shows nothing for an aborted session.
   A story that spans two runs needs both runs added.
   Label a published figure with its method, its price table and date, and what it leaves out.
4. Record the actuals, after the figures above are final.
   Paths in this step start at the repository root, not at the skill folder.
   **The epic's file.**
   Write `<spec folder>/actuals.md`, in the spec folder of the epic the run built.
   If the request does not say which spec folder, ask, and never create a spec folder.
   If the file does not exist, create it with a heading and this table header:
   `| Built id | Runs | Start | Wall-clock | Sessions | Tokens including subagents | Weighted tokens | List cost | Commit |`.
   The table has one row per story, filled from two sources.
   From the `--by-story` output, take the built id (the story's key), sessions, tokens, weighted tokens and list cost.
   Skip its `(journal)` row, which is not a story, and add "a session may be missing" to the "Not included" line when that row is present.
   Use its `weighted` column, and never the `journal wt` column of the per-session view, which counts each Claude message about twice.
   An amount that ends in `+` is a lower bound, so keep the `+`.
   From `.bmad-loop/runs/<run-id>/journal.jsonl`, take start, wall-clock and commit.
   The `ts` of the story's `story-start` record is the start, written as a UTC datetime.
   Wall-clock is the sum, in minutes, of `session-end` `ts` minus `session-start` `ts` for each of the story's sessions, matched by `task_id`.
   The commit is the `commit` of the story's last `story-done` record.
   Write `n/a` for any value the journal lacks, such as the wall-clock of a story that has a session with no `session-end`, and never estimate a value.
   The Runs cell names each run id counted in the row.
   If a row for the story already names this run id, leave it as it is, so that a rerun does not count a run twice.
   If a row for the story exists from an earlier run, update it: add the figures, add this run id, keep the earliest start, and take the commit of this run.
   Otherwise add a new row.
   Keep one totals row at the end of the table, and rewrite it after every change.
   It sums Sessions, Tokens, Weighted tokens and List cost, and it sums Wall-clock when every row has one.
   It leaves the other cells blank.
   A sum over a column that holds a `+` or an `n/a` is a lower bound, so write it with a `+`.
   Check that the figures you took from this run add up to the total the cost tool printed for the run.
   When that total says it is a lower bound, copy the wording into the "Not included" line and do not force the two to match.
   Under the table, keep one "Not included" line that lists what the run figures leave out, each with its dollar value: setup, the spec session, the driver session, review and fixes, and reconciliation.
   Write "not measured" for a value you do not have.
   **The rollup.**
   Add one row for the epic to `_bmad-output/implementation-artifacts/actuals.md`, the rollup for the whole repository.
   If that file does not exist, create the folder and the file, with the header `| Epic | Basis | Points | Loop wall-clock | Loop list cost | Notes |`.
   Copy Loop wall-clock and Loop list cost from the totals row of the epic's file, including any `+`, and replace them in an existing row, because that totals row already holds every run.
   If a row for the epic exists, update it and add no second row.
   Basis is `forecast` or `retrospective`, as the epic's estimate record labels it.
   Take Points from that record, and leave Basis and Points blank if there is none.
   Never work out a points figure from the measurements.
   **Jira.**
   A Jira worklog is optional.
   If you make one, name bmad-loop and the run id in it, and say it is run time, not human time.
