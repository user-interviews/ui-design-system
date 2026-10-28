# Mode `setup`: set up bmad-loop in this repo

Set `SKILL_DIR` as `SKILL.md` describes.
Every step below uses the wrapper that `SKILL.md` explains.
The entry that `bmad-loop init` writes into a hook file is a relay command, the hook that forwards a coding session's events to the bmad-loop engine.

## Set up a checkout

1. List every worktree (an extra working copy made with `git worktree add`) and its state: `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh" --status`.
2. Set up the current checkout with `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh" --cli claude`, or `--cli claude --cli codex` when Codex runs any stage.
   Repeat the `--cli` flag for each CLI.
   - Add `--install-tool` when `bmad-loop` is not on the PATH.
     It installs the CLI at the pinned tag.
     It installs a machine-global `uv` tool for the user's whole account, so tell the user before you add it.
     The wrapper reads the tag from the first of these that exists: `bmad-pins.json` at the repository root, the `PINS` table in `scripts/bmad-update.py`, then `$SKILL_DIR/scripts/bmad-loop-pin.json`.
     The pinned tag is also the tag of the bmad-loop skills that the AI-SDLC installer placed.
     The pin also records the commit the tag pointed at (`commits` in `bmad-pins.json`, or `commit` in the pin file).
     The wrapper installs the CLI at that commit, and `--check` fails when the installed CLI was built from another one.
   - Add `--upgrade` after the pinned tag changes, or when `--status` says `MISMATCH`.
     It reinstalls the CLI at the pinned tag, which changes the same machine-global tool, so tell the user first.
     It refuses while a run is active in any worktree.
   - Use `--worktrees` to set up every worktree whose branch has the setup.
   - Add `--stories <folder> --model <name> --effort <level>` to write those choices into the policy, as the next section describes.
   - Add `--trust-claude` only after the user has agreed to trust the directory, as the trust section describes.
3. A worktree reported as `setup=NO` is on a branch without `.bmad-loop/profiles/claude.toml`.
   Merge or rebase the branch that holds the setup into it.
   In a repo that has never had the setup, run the wrapper anyway, then commit what it wrote: `git add .bmad-loop/profiles .gitignore`, then `git commit`.
   `bmad-loop init` and the wrapper add these lines to `.gitignore`, which keep the local state and the personal hook file out of git: `.bmad-loop/runs/`, `.bmad-loop/cache/`, `.bmad-loop/policy.toml`, `.bmad-loop/bmad_loop_hook.py`, `_bmad/render/` and `.claude/settings.local.json`.
   The wrapper adds `.claude/settings.local.json` itself when no `.gitignore` in the repository ignores it, so the repository does not depend on a developer's global ignore file.
   With `--cli copilot`, the wrapper also ignores Copilot's hook file `.github/copilot/settings.json`.
   The engine refuses a dirty tree, so this commit comes before the first run.
4. If `validate` warns that `_bmad/render/` is tracked, the install was made before the installer started ignoring that folder.
   Run `ai-sdlc update`, which deletes `_bmad/render/.gitignore`, and commit the deletion with the setup files.
   If the repository was installed with the old script, follow "A repository the old script installed" in the Installation Guide for that update.
   If `validate` still warns afterwards, other files under `_bmad/render/` are tracked, so run `git rm -r --cached _bmad/render` and commit the change.
   A fresh install needs no step.
5. When Codex runs any stage, BMAD must be installed for Codex too, or `validate` fails with `.agents/skills/bmad-build-auto not found`.
   `update --tools=<list>` replaces the declared tools with the list, so first read the declared tools from `tools` in `ai-sdlc.json`, add `codex`, and pass all of them.
   Run `ai-sdlc update --tools=<that list>` from the repository, then commit the new `.agents/skills`.
   From a clone of sdlc-flows, run `scripts/ai-sdlc.sh update --tools=<that list> <repository>` instead.
   Check that `.agents/skills` exists afterwards, and that every tool that was declared before is still declared.

6. The wrapper's step 0 handles the user's BMAD answers, before it does anything else.
   BMAD keeps a user's name, language and skill level in `_bmad/config.user.toml`, and git must never hold that file.
   A fresh clone and a new worktree start without it, and the loop's first session then stops with `missing config value communication_language`.
   The wrapper copies the file from the main checkout when it can.
   Otherwise it creates the file from `git config user.name`, with BMAD's defaults.
   It makes sure git ignores the file before it writes it, and it never overwrites one.
   **Never put these values in a committed file.**
   Do not write `user_name`, `communication_language` or `user_skill_level` into `_bmad/custom/config.toml` or any other tracked file.
   `--check` fails in four cases: git tracks the answers file or another `*.user.toml` file under `_bmad/`, a committed `_bmad/custom/*.toml` holds one of those keys, the file is missing or unusable, and no `.gitignore` in the repository ignores it.
   The wrapper reports when it cannot create the file because there is no `git config user.name`.
   Then ask the user for the name, set it with `git config user.name`, and run the wrapper again.

`bmad-loop init` creates `.bmad-loop/policy.toml` (gitignored, personal), and the wrapper only edits it.
The wrapper also reports whether Claude Code trusts the directory, and ends by running `bmad-loop validate`.
A missing sprint-status file is an expected failure when the policy reads a stories folder, and a dirty tree is expected before the setup is committed.
In a linked worktree (one made with `git worktree add`), `validate` also reports a failure on the Codex trust line even though the relay works.

## Choose the CLI, model and effort per stage

Ask the user which CLI runs the dev, review and triage stages, and which model and effort each uses.
Use the models the user names.
The values in the table come from a tested run and are examples.
The wrapper edits `.gitignore`, `.claude/settings.local.json` and `.bmad-loop/` without asking.
Ask before writing anywhere else, such as `~/.codex/config.toml` or `~/.claude.json`.

For a Claude dev stage on a stories folder, let the wrapper write the policy.
`--model` and `--effort` go into the `[adapter]` table, so the review and triage stages use them too unless they have their own tables: `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh" --stories <folder> --model <name> --effort <level>`.
It refuses a folder without `stories.yaml` and `SPEC.md`, and it repeats the profile's bypass flags in `extra_args`, because setting `extra_args` replaces them.
It refuses `--effort` when `[adapter]` already has `extra_args` it did not write, so add the flag to that list by hand.
For any other stage, edit `.bmad-loop/policy.toml` by hand:

| Stage runs | Set |
|---|---|
| Claude | `[adapter]` `model = "claude-sonnet-5-5"` and `extra_args = ["--permission-mode", "bypassPermissions", "--effort", "low"]` |
| Codex | `[adapter.review]` with `name = "codex"`, `model = "gpt-5.6-luna"` and `extra_args = ["--dangerously-bypass-approvals-and-sandbox", "--no-daemon"]` |

The bypass flags turn off permission prompts, because an unattended loop cannot answer them.
Hand-written `extra_args` replace the profile's defaults, so the table repeats the bypass flags.
Tell the user this when you write them.

Codex effort goes in the project's `.codex/config.toml` as `model_reasoning_effort = "medium"`.
That file is personal, so keep it out of git.
When the repo's `.gitignore` does not ignore it, add it to the exclude file instead: find that file with `git rev-parse --git-path info/exclude`, because `.git` is a file, not a folder, inside a linked worktree.
In `.bmad-loop/policy.toml`, set `[review] trigger = "always"` when every story should get the second CLI's review.
Run `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh" --check` afterwards.
It exits 0 when `bmad-loop` is on the PATH, the profile is current, and no tracked hook file holds a relay command or a home-directory path.
It also requires that the BMAD answers file exists and that no committed file holds those values.
When Codex's background daemon runs, every Codex stage must also have `--no-daemon`.
When `bmad-loop` is not on the PATH it exits 1 and points at `--install-tool`.

## Trust the directory in Claude Code

A loop started in a directory Claude Code has not trusted crashes at launch, because the trust dialog needs a person.
The run pauses with "dev session crashed", charges nothing, and `resume` stalls afterward.
The wrapper's trust step prints `trusted` or `not trusted` for the directory, and `--status` shows it per worktree.

When it says `not trusted`:

1. Ask the user whether to trust this directory in Claude Code.
   Name the exact absolute path and say what trust does: Claude Code runs the project's hooks and settings there, and the loop starts its sessions with permission prompts off.
2. Run the wrapper again with `--trust-claude` only after the user answers yes for that path.
   It sets `hasTrustDialogAccepted` for that one directory in Claude Code's `~/.claude.json` (or `$CLAUDE_CONFIG_DIR/.claude.json`) and changes nothing else.
3. With `--worktrees`, the flag trusts every worktree the wrapper sets up, so name them all in the question.
4. If the user says no, tell them to run `claude` once in the directory and accept the prompts.

Each worktree is its own path with its own trust entry.
A user's yes covers the paths named in the question and no others.

## Approve Codex's hooks

Do this when Codex shows "Hooks need review" or `validate` says "hook trust is stale".
It writes trust entries into `~/.codex/config.toml`, so get the user's yes first, and say that the folder-trust step is part of it.

1. Pick a session name once, such as `codex-approve-<random digits>`, and write the literal name in every later command, because each shell call has its own `$$`.
   Start Codex in a tmux pane with it: `tmux new-session -d -s <session> -c <dir> codex`.
2. Read the pane with `tmux capture-pane -p -t <session>` after each key.
3. Choose "Skip" on any update prompt, then "Trust and continue" on the folder prompt.
4. On "Hooks need review", choose "Review hooks" and open each hook.
5. Press `t` on a hook only when its command is one of the two shapes bmad-loop writes, and the check below passes.
   The pinned tag (v0.12.0 at the time of writing) writes `python3 <repository>/.bmad-loop/bmad_loop_hook.py <Event>`.
   Approve it only when the path is exactly the repository's `.bmad-loop/bmad_loop_hook.py`, and `bmad-loop validate --project <dir>` reports `hook relay script up to date` for that file, which means it is identical to the copy packaged in the installed CLI.
   Versions older than the pinned tag write `<path>/bmad-loop relay <Event>`.
   Approve that one only when `<path>/bmad-loop` is the same file that `command -v bmad-loop` prints.
   Report any other command to the user instead.
   The repository's own hooks also appear (for example a team's own logging hook under Stop) and stay unapproved unless the user says otherwise.
   The relay hooks sit under SessionStart and Stop, and the event list scrolls: Up from the top row jumps to the last event.
6. Quit Codex with Ctrl-C twice and run `tmux kill-session -t <session>`.
7. Check the result with `bmad-loop validate --project <main checkout>`.
   Inside a linked worktree the Codex trust line fails even when the approval worked, so the main checkout gives the real answer.

## When the checkout changes

Run `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh" --release-codex` before pulling a change to `.codex/hooks.json`, then repeat the setup.
