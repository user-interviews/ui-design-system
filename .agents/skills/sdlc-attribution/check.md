# Mode `check`: verify the attribution hooks

Set `SKILL_DIR` as `SKILL.md` describes.
The check runs offline.
It starts no AI tool and uses no network.

## Steps

1. Run the doctor: `python3 "$SKILL_DIR/scripts/sdlc_attribution_doctor.py"` from anywhere inside the repository.
   Python 3.11 or newer is required.
2. Read the output.
   It prints `ok` and exits 0 when everything matches `ai-sdlc/sdlc-attribution-manifest.json` and nothing needs a note.
   Otherwise it prints one line per fault, each ending with how to fix it, and exits 1.
   It exits 2 outside a repository.
3. Fix each fault as its line says.
   Most lines say to run `sdlc-attribution-setup.sh` again.
4. Run the doctor again until it prints `ok`.

## What the doctor reports

- A registration that is gone from a tool's hook file, or a hook file that is missing or unreadable.
- A skill folder that is missing, or a script in it that is missing or not executable.
- `core.hooksPath` unset, different from the recorded value, or pointing at a folder that no longer exists.
  This happens after the tool whose copy it names is removed.
  Running setup again moves it to a copy that is still installed.
- `jq` missing from `PATH`.
- The offline test suite `test-track-ai-touch.sh` failing in an installed copy.

When setup exited 3 and left git's hooks alone, the manifest records no `core.hooksPath`, and the doctor does not report one as a fault.
Instead it prints a line that starts with `note:`.
The note names the conflict and says that commit trailers stay off until the owner of those git hooks adds the package's lines.
It prints no note once both lines are in the owner's hooks.
It also prints none once the conflict has gone and the session-start hook has set `core.hooksPath` to the package's folder.
A note does not change the exit code, and it does not print `ok`.
Tell the user what the note says.

The doctor also prints a `note:` line for each linked worktree whose folder lacks the path `core.hooksPath` names.
Git runs none of that worktree's hooks until a branch with the package is checked out there.

## Why a commit has no trailer

A commit gets no trailer for one of these reasons:

- It is a merge commit, or a commit made from a squash.
  The hook skips both on purpose.
  The commit that holds the work, beneath the merge, carries the trailer.
- No record matches the content the commit stages.
  This happens when the file was changed by hand after the tool edited it, or when only part of it was staged.
- The edit was made in one worktree and committed in another.
  Records belong to the worktree where the edit happened, so the other worktree finds none.
- The commit was made again by a rebase, a cherry-pick or an amend.
  The records of the original edits were spent when the first commit was made.
- The edit hook never recorded the edit.
  `jq` may be missing, the tool may not call the hook, or the payload may have held no path.
- Git did not run the commit hooks.
  `core.hooksPath` may be unset, or the worktree may not hold the package's folder.

To see which one applies, turn the trace on and repeat the edit and the commit.
There are two switches.
Setting `AI_TOUCH_DEBUG=1` works only when the variable reaches the tool and `git commit`.
A `bmad-loop` run does not pass it on, so for a loop create an empty file named `ai-touch-debug` in the folder that `git rev-parse --git-common-dir` prints.
Every worktree of the repository reads that file.
Each hook then adds one line for each decision to one shared log, `ai-touch-debug.log`, in that same folder.
A loop deletes a story worktree's own git folder when it cleans up, and the shared log survives that.
Each line starts with a UTC time, the hook name and the worktree's folder name in brackets, for example `2026-10-21T06:21:39Z prepare-commit-msg [story-1] credited claude: ...`.
The edit hook says how many paths it recorded or why it skipped the edit.
`prepare-commit-msg` says which tool it credited and how many staged paths matched.
When no record matches, it gives the record count, the staged count and how many staged paths have a record with other content, which means the file changed after the tool edited it.
It also says when the commit's source was a merge or a squash.
`post-commit` says how many records it removed as spent, how many it dropped as discarded and how many it kept as pending.
With the trace off, the hooks write no log.
A hook cuts the log back when it passes 512 KiB.
The trace never records file content.

To turn the trace off, delete the `ai-touch-debug` file and unset the variable.
The log can be deleted too.

## What the doctor does not check

The doctor cannot show that a tool fires its hook in a live session.
To see attribution work from edit to commit, make a small edit with the tool, stage it, run `git commit` with no trailer in the message, and read the message with `git log -1`.
The last line should be `Co-Authored-By:` followed by the tool's name and noreply address.
