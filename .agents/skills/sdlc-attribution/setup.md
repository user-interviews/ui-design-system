# Mode `setup`: register the attribution hooks in this repository

Set `SKILL_DIR` as `SKILL.md` describes.
Run setup once per clone, because git configuration and the `.git/` folder belong to one clone.

## Steps

1. Preview the changes: `bash "$SKILL_DIR/scripts/sdlc-attribution-setup.sh" --dry-run`.
   The script reads the chosen tools from `ai-sdlc.json`.
   Add `--tools=claude-code,codex` (a comma-separated list) to override it.
   The known tools are `claude-code`, `codex`, `cursor` and `github-copilot`.
   `claude` and `copilot` are accepted as short names.
2. Run it for real: `bash "$SKILL_DIR/scripts/sdlc-attribution-setup.sh"`.
   It merges the package's entries into each chosen tool's hook file, adds two lines to `.gitattributes`, sets `core.hooksPath` when that is safe, and writes `ai-sdlc/sdlc-attribution-manifest.json`.
   A second run changes nothing.
3. Read the exit code and act on it.

| Exit | Meaning | What to do |
|---|---|---|
| 0 | Everything is in place | Go to step 4 |
| 1 | A file edit failed | Read the error, which names the file, fix that file and run again |
| 2 | Not in a repository, or bad arguments | Run it inside the repository, or correct the arguments |
| 3 | Git hooks conflict | Do the next section, then go to step 4 |

4. Run the `check` mode.
5. Tell the user to commit the changed hook files, `.gitattributes` and the manifest.
   The manifest holds relative paths only.

## When setup prints a `note:` line about the old attribution hook

An earlier attribution install registered its own entries, which run scripts from `.claude/hooks/`, `.codex/hooks/`, `.cursor/hooks/` or `.github/hooks/`.
They stay beside the package's entries, so two trackers record each edit.
Setup removes nothing silently.
Show the user each line, and ask whether to remove them.
If they agree, run `bash "$SKILL_DIR/scripts/sdlc-attribution-setup.sh" --remove-legacy` with the same `--tools` list the note printed. It removes only those entries from the chosen tools' hook files.
It does not delete the old script files or the `.githooks` folder.
The user can delete those after they have committed the change.

## When the exit code is 3

Another tool owns this repository's git hooks.
Examples are a `core.hooksPath` that points elsewhere, any executable hook of the repository's own in `.git/hooks` (a `.sample` file does not count), a `prepare-commit-msg` or `post-commit` file there, or a `.husky` folder, even before husky has run.
The script merged the tool registrations and left git's hooks alone.
It printed one line per git hook, in this form:

```text
sh -c 'h="$(git rev-parse --show-toplevel)/<skill folder>/git-hooks/prepare-commit-msg"; [ -f "$h" ] && [ -x "$h" ] || exit 0; exec "$h" "$@"' sh "$@"
```

That form is for a husky or `.git-hooks` hook file, which git runs with the hook's arguments.
The ending depends on the tool that runs the line, and setup prints the ending for the tool it found.
When `core.hooksPath` is set, git runs the hook files in that folder, so setup prints the `"$@"` ending and names the folder, even if a lefthook or pre-commit config sits in the repository too.
For lefthook the line ends with `sh {0}`, because lefthook fills in `{0}` with git's arguments and gives the shell none of its own.
For pre-commit the line ends with `sh`, because pre-commit runs an entry without a shell and adds the commit message file after it.
The pre-commit line is the `entry` of a local hook with `language: system` and `always_run: true`, and `pass_filenames` stays at its default of true.
Each line does nothing when the package's hook script is missing or not executable, so deleting the package folder does not block commits.

Do not add these lines yourself.
Show them to the person who owns the repository's git hooks, and ask them to add each line to their own hook of the same name.
Until they do, the edit hooks record files and no trailer is added.

## When a linked worktree causes the exit code 3

Run `git worktree list`.
If it lists a worktree besides this one, setup left `core.hooksPath` unset on purpose and printed the same lines as above.
Git stores that setting once for every worktree, so writing it from one worktree would also set it in a worktree whose branch has no package folder, and git would run none of that worktree's hooks.

Tell the user the two ways forward.
The first is to run setup in a clone that has no linked worktree, and then add the worktrees, because setup leaves a path that is already set alone.
The second is to give the owner of the hooks the lines above.
Setting the path for one worktree only, with `extensions.worktreeConfig` and `git config --worktree`, is not done yet.

## When Copilot is chosen

Copilot reads hooks only from a personal folder outside the repository.
The script prints a `mkdir` and `cp` command for it and does not run it.
Tell the user to run that command once per machine.
Copilot cannot add the trailer until they do.

## When `jq` is missing

Setup does not look for `jq` and still succeeds.
The edit hook cannot record files without it, so no trailer is added.
Run the `check` mode, which reports a missing `jq`, and tell the user to install it (for example `brew install jq`).
