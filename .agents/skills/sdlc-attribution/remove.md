# Mode `remove`: undo what setup placed

Set `SKILL_DIR` as `SKILL.md` describes.
Remove undoes setup's work.
It does not delete the skill folder, because the installer placed that folder and the installer removes it.

## Steps

1. Ask the user to confirm, because this edits hook files.
2. Run `bash "$SKILL_DIR/scripts/sdlc-attribution-setup.sh" --remove`.
   It reads `ai-sdlc/sdlc-attribution-manifest.json` and deletes exactly the entries listed there.
   It leaves every other entry in each hook file and every other line in `.gitattributes`.
   It deletes a file that setup created when nothing but the package's entries remains in it.
   It unsets `core.hooksPath` only when the value still equals the one setup recorded and the repository has no linked worktree.
   With a linked worktree it leaves the value set, because every worktree shares it, and prints the command that unsets it.
   Tell the user to run that command before the skill folder goes, because git runs no hooks from a path that names a missing folder.
   It deletes the manifest last.
3. A second run prints that nothing is recorded and changes nothing.
4. If another tool owns the repository's git hooks, tell the person who owns them to delete the two lines that setup printed, one in `prepare-commit-msg` and one in `post-commit`.
   Until they do, the lines do nothing and commits still succeed.
5. Tell the user to commit the changed files.

## What remove leaves alone

- A `core.hooksPath` that someone changed after setup.
- The records in `.git/ai-touch/`.
  They are small and per clone, and a later commit trims them.
- Copilot's personal file in `~/.copilot/hooks/`.
  The script never wrote it, so the user deletes it themselves if they want it gone.

To remove the skill folder as well, run the AI-SDLC installer's `update` without this package in the list.
Run remove first, so `core.hooksPath` does not point at a folder that no longer exists.
