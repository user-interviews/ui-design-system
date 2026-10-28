---
name: sdlc-attribution
description: Use when setting up, checking or removing the attribution hooks that add a Co-Authored-By trailer to commits holding AI-edited files (modes setup, check, remove), or when asked why an AI-assisted commit has no trailer. Not for counting AI-assisted commits.
---

# Attribution hooks: setup, check, remove

Three modes.
Each mode does one job and stops.
Begin your first reply by naming the mode.
If the request does not say which mode, ask.

| Mode | Job | Instructions |
|---|---|---|
| `setup` | Register the hooks for each chosen tool and turn on the package's git hooks | `setup.md` |
| `check` | Verify the registrations, the git hooks and the offline test suite | `check.md` |
| `remove` | Undo what setup placed | `remove.md` |

## What the package does

An AI tool's edit hook records each file the tool edits.
A git hook then adds a `Co-Authored-By` trailer to a commit that contains one of those files.
A commit with no AI-edited file gets no trailer.
The trailer names the tool, for example `Claude <noreply@anthropic.com>`.

## Rules for every mode

`SKILL_DIR` is the folder that holds this file.
The mode files sit beside this one, and the scripts sit in `$SKILL_DIR/scripts/`.
Before you run a command that names `SKILL_DIR`, set it to that folder's absolute path, because the working directory is usually the repository root.
Each shell command starts fresh, so set it again in every command that uses it.

The setup script is `$SKILL_DIR/scripts/sdlc-attribution-setup.sh`.
The check script is `$SKILL_DIR/scripts/sdlc_attribution_doctor.py`.
The script `track-ai-touch.sh` needs `jq`.
Without `jq` the hook prints a warning and records nothing, and the edit still succeeds.

Never edit `.claude/settings.json`, `.codex/hooks.json`, `.cursor/hooks.json`, `.gitattributes` or `core.hooksPath` by hand to do the setup script's job.
The script merges into those files without touching the entries already there, and it records what it did in `ai-sdlc/sdlc-attribution-manifest.json`.

`core.hooksPath` is stored once for every worktree of a repository.
Setup and the session-start hook therefore leave it unset while the repository has a linked worktree, and setup exits 3.
`remove` keeps a value that other worktrees share.
Never work around this by running `git config core.hooksPath` from one worktree, because that sets it for all of them and a worktree on a branch without the package then runs none of its git hooks.

Never count AI-assisted commits by matching the whole `Co-Authored-By` line.
Match on the noreply address, such as `noreply@anthropic.com`, because the name before it can differ between tools and over time.
