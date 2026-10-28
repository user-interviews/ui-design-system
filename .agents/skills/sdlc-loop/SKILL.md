---
name: sdlc-loop
description: Use when setting up, upgrading or checking bmad-loop in a repo or git worktree, or when Codex says "Hooks need review" or `bmad-loop validate` says "hook trust is stale" (mode setup), when starting, watching, stopping, resuming, recovering or finishing a bmad-loop run, including a run that pauses, crashes, sits waiting or reports that it finished (mode run), or when asked what a run cost or to record its actuals (mode cost). Replaces the vendor bmad-loop-setup skill, which writes a personal path into shared files. Not for installing the AI-SDLC or BMAD itself, and not for writing specs, stories or sprint plans.
---

# bmad-loop: set up, run, cost

Three modes.
Each mode does one job and stops.
Begin your first reply by naming the mode.
If the request does not say which mode, ask.

| Mode | Job | Instructions |
|---|---|---|
| `setup` | Install the CLI, register its hooks without a personal path, write the policy, trust the directory, approve Codex's hooks | `setup.md` |
| `run` | Check, start, watch, stop, resume and recover a run, then finish | `run.md` |
| `cost` | Price a finished run at list prices and record its actuals | `cost.md` |

This skill needs `uv`, `tmux` and git 2.34 or newer.

`SKILL_DIR` is the folder that holds this file.
The mode files sit beside this one, and the scripts sit in `$SKILL_DIR/scripts/`.
Before you run a command that names `SKILL_DIR`, set it to that folder's absolute path, because the working directory is usually the repository root.
Each shell command starts fresh, so set it again in every command that uses it.

`bmad-loop init` writes the absolute path of one person's binary into hook files that other people share.
The wrapper `$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh` runs it safely, by sending the hooks to a file that git ignores.
Every mode uses the wrapper, and no mode runs `bmad-loop init` itself.

Start a run only after `bash "$SKILL_DIR/scripts/sdlc-bmad-loop-init.sh" --check` exits 0.
When it exits 1, run `setup` first.

`<scratch>` in the mode files is a folder for the run's temporary files.
Use the session's scratch directory when the tool provides one.
Otherwise make one with `mktemp -d` at the start and reuse it for the whole run.

The vendor skills `bmad-loop-resolve` and `bmad-loop-sweep` belong to bmad-loop's own escalation and sweep workflows, and this skill does not replace them.
