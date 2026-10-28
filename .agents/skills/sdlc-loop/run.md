# Mode `run`: run, watch and recover a bmad-loop run

Set `SKILL_DIR` as `SKILL.md` describes.
A run takes minutes to hours and the engine runs in the foreground, so an agent starts it in the background and watches its state.
`setup.md` covers setup.
Start here once `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh" --check` exits 0.
`<scratch>` is defined in `SKILL.md`.

## Before starting

1. Run `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh" --check` before every `run` and every `resume`, not only the first.
   The check fails when the installed bmad-loop is missing the local token-count patch.
   A `uv tool` reinstall removes the local patches, and the token tally then counts each message twice and the hook check fails.
   `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh"` puts them back.
   The check also fails when this checkout has no `_bmad/config.user.toml`, the user's BMAD answers, which a new worktree and a fresh clone lack.
   Without that file, the first session stops with `missing config value communication_language`.
   Run the wrapper to copy or create the file, and never commit it or write its values into a tracked file.
2. Check that `git status --short` prints nothing.
   The engine refuses a dirty tree, so commit the spec first.
3. Check that `bmad-loop validate --project .` shows only expected failures: the Codex trust line inside a linked worktree, and "hook trust unverifiable" for a stage that sets `--no-daemon`.
4. Check that the line printed by `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh" --status` for this checkout shows `claude-trust=trusted`.
   Without it the first dev session crashes at launch; `setup.md` covers asking the user and fixing it.
5. For a stories run, point the policy at the spec folder first: `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh" --stories <folder>`.
   That leaves the model and effort that setup chose alone.
   Add `--model <name> --effort <level>` only when the policy has none, and only for a Claude dev stage: the wrapper refuses a Codex dev stage, and a dev stage with its own `model` or `extra_args`.
   `setup.md` covers both.
   Then `bmad-loop run --project . --dry-run` prints the plan.
   Add `--story <id>` to run one story, or `--spec <folder>` to force stories mode.
6. Look for shared state that the stories will touch, and settle it before the run.
   Check for a long-lived database or container, demo servers that a person has open, and the ports the stories bind (`podman ps` or `docker ps`, and `lsof -nP -iTCP -sTCP:LISTEN`).
   If no container runtime is installed or its machine is stopped, note that and go on; start the machine only if the stories need it.
   Read the spec's rules for what a story may touch.
   A database that earlier work left dirty fails the verification gates for a reason no story caused, and a story that is forbidden to reset it will stop.
   Reset it yourself before the run, or fix the gate so it does not depend on the leftover state.
   Commit any tracked file that the reset or the fix changes before starting.
   After any commit made here, run steps 2 and 3 again.
   Stop the person's demo servers only if the run needs their ports or memory.
   Write the names and start commands of whatever you stop into `<scratch>/stopped.txt`, and tell the user when you stop it.

## Start and watch

1. Start it in the background and keep the pid: `nohup bmad-loop run --project . > <scratch>/run.log 2>&1 & echo $! > <scratch>/run.pid`.
2. Watch with `bmad-loop status --project .`.
   A story moves through `dev-running`, `review-running` and `done`.
   The `status:` line names the run's state: `in progress` (the engine is alive), `interrupted (the engine is not running)` (the engine is dead), `crashed`, `stopped`, `PAUSED (...)` or `finished`.
   The setup's patch to bmad-loop prints these words, and the unpatched tool prints `in progress (or interrupted)` for every run that is not finished or paused.
   The word `interrupted` can still appear for a live run in two cases.
   When the engine's liveness cannot be read, the patched tool prints the old `in progress (or interrupted)`.
   In a run's first moments, before the engine writes its pid file, `status` reads `interrupted (the engine is not running)`.
   Match a monitor on `crashed` or `stopped` at once, and treat `interrupted` as real only when it holds on two polls about 30 seconds apart.
3. Watch in three independent layers, because one background `until` loop missed two pauses and left a story escalated for 3.5 hours.
   - **Event monitor.** Run a poll script through a monitor that prints one line when the run's state changes, and one line for every way a run can stop being unattended: paused, escalated, finished, stopped, crashed (`CRASHED:` in the log of the command that started or resumed the run), the engine pid gone (`kill -0 $(cat <scratch>/run.pid)` fails, and a pid can be reused, so also read `status`), or nothing changed for 40 minutes.
     Count the newest change in the working tree or the journal as activity, and count a running test suite or build (`node --test`, `npm test`, `unittest`, `verify.sh`) as activity too.
     The journal alone is quiet for a whole dev session, and a dev in its verification phase changes no file for 40 minutes or more.
     A monitor expires after 30 minutes, so re-arm it each time it expires.
   - **Heartbeat.** Schedule a recurring job every 15 minutes, off the :00 and :30 marks, whose prompt polls `bmad-loop status` itself, checks the pid and the run's `ATTENTION` file, reads the journal tail, handles a pause, and re-arms the monitor if it expired.
     The prompt reads the run id from a file (`current-run.id`), so a fresh run does not leave it stale.
   - **The engine's own alerts.** `[notify] desktop = true` and `file = true` in `.bmad-loop/policy.toml` give a desktop toast and an `ATTENTION` file in the run folder.

   A watcher that waits for one action to finish, such as `stop --graceful`, must also watch for a pause.
   If the run pauses before the engine acts on the graceful stop, the request is cancelled.

   In a headless or scripted session, nothing can send the agent a new message after it ends its turn.
   A monitor or a scheduled job then cannot report to it, and an agent that ends its turn to wait for one leaves the run unwatched.
   Poll inside the turn instead.
   Use a shell loop that reads `bmad-loop status --project .` every 30 seconds, for a stated maximum such as 60 minutes.
   End the turn only when the run has finished, paused or stopped.
   If the limit passes first, report that the run is still going.
4. When a session looks stuck, read its pane: `tmux ls`, then `tmux capture-pane -p -t <session>:<window>`.
   A pane that says `HALT: missing config value <key>`, followed by the engine's repeated "You appear idle" nudges, means the user's BMAD answers file is missing.
   The engine keeps nudging the session without pausing the run, so the run stays in `dev-running` with no new tokens.
   The session committed nothing, so a plain `bmad-loop stop` loses no work.
   Fix the file as step 1 describes, then start a new run.
5. A Codex review that wrote no relay events into the run's events folder means its stage lacks `--no-daemon`.
   That folder is `$BMAD_LOOP_STATE_DIR/<project key>/<run-id>/events/`, or under `$XDG_STATE_HOME/bmad-loop`, or under `~/.local/state/bmad-loop`, in that order of precedence.
   That is where the cost script in `$SKILL_DIR/scripts/` looks.
   Fix the policy as `setup.md` describes.

## Stop and resume

- To pause between stories, stop gracefully: `bmad-loop stop --graceful --project . <run-id>`.
  The engine finishes the story that is running, commits it, stops cleanly and stays resumable.
  Ask while a story that is not the last one is still running. A request made during the last story only finishes the run.
- A plain `bmad-loop stop --project . <run-id>` interrupts the story.
  When that attempt had already committed work, the run pauses with "manual recovery needed (committed work present)", and the recovery steps below apply.
  Use a plain stop only to abandon a story.
- Resume in the background: `nohup bmad-loop resume --project . <run-id> > <scratch>/resume.log 2>&1 &`.
  A foreground resume that is interrupted aborts the attempt.
- `resolve` and `resume` start the paused story again before any other story.
  To skip it and run the stories that must come first, remove its entry from `stories.yaml`, commit, and start a fresh run with `bmad-loop run --project . --spec <folder>`; a done story stays done.
  Put the entry back before the stories that follow it, and start another run.
  Every dispatch of the paused story costs a short dev session.

## When a run stops

Read the message in `bmad-loop status --project .` and the full text in `.bmad-loop/runs/<run-id>/ATTENTION` first.
There are four known kinds, and each has its own way back.
For any other message, read `ATTENTION`, change nothing, and ask the user.

Every way back follows one pattern, so use it when a stop matches a kind below but differs in the details.
Find the copy of the work that the engine kept, and compare it with what is in the tree.
Before you reset or delete anything, save whatever only the tree holds, as a rescue branch or as a patch or copy in `<scratch>`.
Show the user what you will remove, and remove it by explicit path after a yes.
When what you see does not match what a section describes, stop and ask the user.
These procedures came from real runs and none covers every case, so you are the safety net.

| The message says | What it means | What to do |
|---|---|---|
| "dev session crashed (no completed turn ...)" with zero tokens | A first-run dialog stopped the session | See "A first-run crash" |
| "manual recovery needed (committed work present)" | The attempt left commits | See "Manual recovery needed" |
| "CRITICAL escalation from dev session: Status: blocked" | The session found a contradiction or a gap that it could not settle alone | See "A CRITICAL escalation" |
| "CRASHED: GitError ..." in the log of the command that started or resumed the run (`<scratch>/run.log`, `resume.log` or `resolve.log`), and `status` showing "crashed" or "interrupted (the engine is not running)" (the unpatched tool shows "in progress (or interrupted)") with no engine process | The engine itself failed | See "An engine crash" |

### A first-run crash

A pause with "dev session crashed (no completed turn ...)" and zero tokens is a first-run dialog.
One cause is a directory that Claude Code does not trust yet: the dev session cannot start, so it crashes on the first launch with zero tokens and no transcript.
Recognise it by all three signs together: the crash is on the run's first launch, the tokens are zero, and `--status` shows `claude-trust` as anything other than `trusted`.
bmad-loop reports it only as a crash and does not name the trust.
Check `claude-trust` first with `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh" --status`, because `--check` does not look at trust.
After fixing it, start a fresh run with `nohup bmad-loop run --project .`.
Use a fresh run because `resume` needs the run id, and `resolve` without `--no-interactive` waits for a y/N answer on a terminal, so it cancels itself in the background.
A crashed launch charges nothing and committed nothing, so no work is lost by starting over.

### Manual recovery needed

A pause saying "manual recovery needed (committed work present)" needs a decision from the user.
Save the commits first, whichever way the user decides: `git branch rescue-<date>-<time> HEAD`, with a name that does not exist yet.
Stop if that command fails.
Then check whether they are already merged, pushed or on a pull request: `git log --oneline <sha>..HEAD`, `git branch -r --contains HEAD` and `gh pr list --head "$(git branch --show-current)"`.

- **Discard the attempt** (the only path that has been tested).
  Show the user the sha and the commit list, and get a yes before `git reset --hard <sha>`, the sha the message gives.
  Then run `git clean -n` and list the leftover files of that attempt to the user.
  Remove them by explicit path after a yes, and never with `git clean -f`.
  Other untracked files in the tree stay.
  Resume in the background.
- **Keep the commits.**
  Read the pause message and `bmad-loop resume --help` first, because no keep path has been run.

### A CRITICAL escalation

The spec is frozen, so a session cannot change a rule that blocks it.
The run writes what blocked the session, what it finished, and whether the work is uncommitted, in an `Auto Run Result` section of the story's spec.
Read the blocking condition and decide which of these it is.
A review session that escalates is handled the same way, though only dev-session escalations have been run.

Do not edit files in the working tree and then resume.
Do not use a plain `bmad-loop resume` either: it does not re-arm an escalated story, so the story stays escalated.
When `resolve` re-arms a story (sends it back to its start), the engine moves the story's starting point to the current HEAD, so a commit made during the pause becomes part of it.
It reverts the attempt's tracked changes and keeps them under `refs/attempt-preserve-dirty/<run-id>-<sha>-N`.
An edit made during the pause is reverted with them, and survives only in that ref.
It treats the untracked files in the tree at that moment as already there, except a half-staged file and a file left by an abandoned patch restore.
So most of the attempt's untracked files stay in the tree and are not saved under the ref.
Before you run `resolve`, deal with two things:

- If `git status --short` shows ` A` in the second column, clear the index with `git reset -q` first.
  The re-drive runs `git stash create`, which fails on such an entry, and that is the engine crash below.
- After that, list the attempt's untracked files (`??` in `git status --short`).
  Copy any worth keeping to `<scratch>`, and delete the ones the story must not inherit, by explicit path after the user says yes, because the re-driven story would otherwise build on them and may commit them.
  Never delete the story's spec or another file in the spec folder this way: `resolve` needs the spec, and it is often untracked.

- **A problem in the state around the run,** such as leftover database rows, a busy port or a stopped container runtime.
  Fix the state yourself, outside the run.
  Commit any fix to a tracked file first, adding and committing only the files it touches: `git add <file> && git commit -m "<message>" -- <file>`.
  The `-- <file>` keeps the attempt's own staged files out of the commit.
  Then check that `git status --short -- <the files you changed>` prints nothing.
  The paused story's own uncommitted attempt stays in the tree, and the engine keeps it under the ref above when it re-arms.
  Then re-arm and resume in the background: `nohup bmad-loop resolve --no-interactive --resume --project . <run-id> > <scratch>/resolve.log 2>&1 &`.
  `--no-interactive` skips the resolve agent and the y/N prompt, which is what lets it run in the background.
  The story starts again from its beginning, so expect the cost and time of another attempt.
- **A rule in the spec that forbids what the story needs.**
  A session cannot edit the spec.
  Either fix the root cause in a small separate commit so that the story no longer needs the forbidden action, and re-arm as above, or ask the user whether to change the spec text.
  If the user wants the spec text corrected and the session's work kept, correct the text and commit it.
  Then save the attempt as `_bmad-output/implementation-artifacts/story-<id>-attempt.patch`.
  A saved patch can hold terminal color codes, which make `git apply` fail with "No valid patches", so strip them first: `re.sub(r"\x1b\[[0-9;]*m", "", text)`.
  Then run `nohup bmad-loop resolve <run-id> --story <id> --restore-patch <patch> --no-interactive --resume > <scratch>/resolve.log 2>&1 &`.
  If the patch file is missing, or `resolve` reports that it cannot restore it, re-arm without `--restore-patch` and accept a restart.
  Do not test the patch with `git apply --check` in the paused tree, because that tree still holds the same uncommitted changes.
- **Neither of these,** such as a gap or a missing dependency.
  Ask the user and do not resume.

### An engine crash

`CRASHED: GitError: git stash create failed ... Cannot save the current worktree state` means the index holds a file that was added with no content, shown as ` A` in the second column of `git status --short`.
The engine cannot save its attempt and stops.
If `git status --short` shows no such entry, the cause is something else: report the `GitError` text to the user and change nothing.
This procedure comes from one real incident, and its snapshot checks have not been run against a real crash with several refs.

1. Find what the engine kept: `git for-each-ref --sort=-committerdate --format='%(refname) %(committerdate:iso)' "refs/attempt-preserve-dirty/<run-id>-*"`.
   A ref is a snapshot, taken at a rollback, of the tracked edits and of the untracked files this run created since the story's last re-arm.
   The first line is the newest ref, and the date only orders the list: it does not show that the ref holds this attempt.
   If no ref for this run exists, stop and tell the user before changing anything.
   A ref from an earlier run does not count.
2. Compare the tree with the newest ref before you discard anything.
   `git diff --stat <newest ref>` lists the tracked files whose content differs from the snapshot, and `git diff --name-only --diff-filter=A HEAD <newest ref>` lists the untracked files it holds.
   `git ls-tree -r` would list every file in the repository, so it does not show which untracked files the snapshot holds.
   For an untracked file that is in both, compare `git show <newest ref>:<path>` with the file, because the tree's copy can be newer.
   If the tree holds work that the snapshot lacks, save it first, as a patch in `<scratch>` for tracked edits and a copy for untracked files, and tell the user.
3. Clear the index: `git reset -q`.
4. Restore tracked files with `git checkout -- .`.
   If `git status --short` showed modified files that are not part of the attempt, ask the user first, because this discards them.
   A crash after a `resolve` re-arm leaves the re-arm's own edit to the story's spec in the tree, with its status flipped and its `Auto Run Result` section removed.
   The spec is either a modified tracked file or, in some runs, a new file that is half-staged.
   Keep that edit: restore the other tracked files by path instead of with `.`, and leave the spec alone.
   The `GitError` text names the half-staged file, and it is often the story's spec itself.
   After `git reset -q` that file shows as untracked, and it still holds the re-arm's edit.
5. List the untracked files with `git clean -n` and show the list to the user.
   Remove by explicit path, after a yes, only the files whose content the snapshot holds, from the list in step 2.
   Leave every other untracked file, because it is the user's, and say that you left it.
   Never remove the story's spec or any other file in the spec folder, even when the snapshot holds it, because the story's inputs and the re-arm's edit live there.
   After a `resolve` re-arm the snapshot holds only the untracked files created after the re-arm, plus a file that was half-staged at that moment, so this step often removes none.
   Never use `git clean -f`, because it also removes the untracked files that are not part of the attempt.
6. Resume in the background: `nohup bmad-loop resume --project . <run-id> > <scratch>/resume.log 2>&1 &`.

## Finish

1. Price the run as `cost.md` describes, and report the total, its session count and anything that makes it a lower bound.
2. Run the gates and tests of the project the loop worked on yourself before saying the work is done.
   Name the command in your report: the gate the spec's rules name (for example `verify.sh`), or the project's own test command (for example `npm test`).
   The loop's own report is not proof, and a gate that passed inside a session can fail on the shared state it left behind.
3. Restart what you stopped for the run, such as a person's demo servers, from `<scratch>/stopped.txt`, and tell the user you did.
   Report any database or state you reset, because a reset cannot be undone.
   Do the same when a run is stopped or abandoned before it finishes.
