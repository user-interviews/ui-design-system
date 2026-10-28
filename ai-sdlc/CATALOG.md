# What you now have

This file arrived in your repository with `ai-sdlc`. It lists everything that was
installed, in plain words, and tells you which one to reach for first.

**This file is hand-maintained.** Nothing generates it. If it disagrees with what is
actually on disk, the disk is right and this file is stale — please say so.

## This is a Beta release

The installer is in Beta, so expect changes between versions.
Each skill also has its own readiness level, which the install plan prints.
That level is a separate scale. It says how far to trust one skill, and the Beta label does not change it.
Read the level of a skill before you point it at work that matters.

**The undo is git.** Discarding the branch takes it all back:

The install prints the exact undo commands for the files it wrote when it ends.
Those commands name only the paths the run touched.
In outline, they are:

```bash
git checkout -- <the tracked files the run replaced>
git clean -fdx -e ai-sdlc/local -e _bmad/custom -e _bmad/config.user.toml -- <the paths the run created>
git checkout <your-branch>
```

Restore tracked files first, in that order.
An install can overwrite a file your repository already tracks at a path the installer writes.
Switching branches with that change still in place can fail with "local changes would be overwritten," before anything is cleaned up.

`-x` matters here: without it, `git clean` skips anything gitignored, and `_bmad/` holds gitignored files that would otherwise survive the undo.

The three `-e` patterns keep what the installer never owns: `ai-sdlc/local/` (the backups of files you edited, and the last-run file), your own `_bmad/custom/`, and your BMAD answers file `_bmad/config.user.toml`.
Do not drop them to clean "everything": that would delete the backups.

`ai-sdlc remove --all` is the other way back.
It deletes the paths `ai-sdlc/installed.json` names, and copies any file you edited since to `ai-sdlc/local/backups/` first.

**Do not add `_bmad-output/` to that command.**
It holds the team's own hand-authored planning and test-artifact content alongside installer scaffolding, and it's commonly gitignored in a real target.
Cleaning it wholesale can delete real uncommitted work, not just what this installer added.
Review it by hand instead: `git status --ignored -- _bmad-output`.

**The printed clean command names only what the run created.**
A folder such as `.claude/skills/` is shared with content that may not be ours, so it is named only when the run created it.
A file the run added to a folder that already existed is named as that file.
If you have not committed the install, those new files are untracked and a branch switch leaves them in place, so use the printed command or review `git status` by hand.

---

## Start here — one thing, not thirty

You have just received a few hundred files and 50-odd capabilities. **Do not try to adopt
them all.** Teams that adopt the whole method at once tend to find it too heavy and stop.
Teams that start with one capability on real work tend to keep going.

**Reach for `bmad-build` first.** Describe a change you actually want made, and let it
implement it against your repository's own patterns. It is the capability most likely to
show value on first use; everything else is optional.

If you want to understand the rest, ask for `bmad-help` — it reads what is installed and tells
you what fits where you are.

**Check one prerequisite now.** Some of these need `uv` on your PATH; it is how the
Python parts run, and `bmad-build` will not start without it. Check with `uv --version`,
install with `brew install uv`.

---

## The `bmad` package — BMAD Method 6.12.4

Written and maintained by BMad Code, LLC. Not ours.
The skills and the `_bmad/` data were made by BMAD's own installer, run for you in a temporary folder outside your repository.
That run needs network access, because BMAD fetches its modules.
The installer then copied the result into your repository, and your repository was not touched until the plan was agreed.

| Capability | What it does |
|---|---|
| `bmad-build` | Implements a change you describe — a feature, a fix, a refactor — following the patterns already in your codebase. **The one to try first.** |
| `bmad-help` | Reads what is installed and what you have produced so far, and tells you what to do next. Start here if you are lost. |
| `bmad-brainstorming` | Runs a structured ideation session with you, using a range of techniques rather than one. |
| `bmad-prd` | Writes, updates or checks a product requirements document. |
| `bmad-architecture` | Produces a short set of architectural rules that later work has to follow, rather than a long design document. |
| `bmad-create-epics-and-stories` | Breaks requirements into epics and stories. |
| `bmad-code-review` | Reviews a change from several adversarial angles at once and triages what it finds. |
| `bmad-review` | A multi-lens review of any document or diff — structure, prose, edge cases, verification gaps. |
| `bmad-deep-recon` | Research, three ways: draft a prompt for your own tool, process a report you already have, or run the search here. |
| `bmad-retrospective` | Evidence-based retrospective on a finished epic. |
| ...and about 39 more | All named `bmad-*`. Ask `bmad-help` rather than reading them all. |

Five BMAD agents also arrived, each as a skill folder beside the other skills, with a Copilot wrapper in `.github/agents/`: `bmad-agent-analyst` (Mary), `bmad-agent-pm` (John), `bmad-agent-ux-designer` (Sally), `bmad-agent-architect` (Winston) and `bmad-agent-dev` (Amelia). They are personas you can talk to.

## Where those BMAD skills came from

The installer ran BMAD's own installer in a scratch folder and placed the result here. We gave BMAD a reviewed set of 39 skill sources (34 skills and 5 agents) and pinned the versions. You received 42 skill folders per tool tree: those 39 and the three `bmad-loop` skills. Deprecation shims are declined. The package lists exactly which sources it carries.

**Those skill bodies are BMad Code, LLC's work, not ours.** They are redistributed under the MIT licence, copied unmodified except in three files:

- `bmad-testarch-ci`'s GitHub Actions template — 13 action references pinned from `@v4` to the commit SHA each tag pointed at, because that file becomes *your* repository's CI and a mutable tag can be repointed by its owner.
- `bmad-testarch-framework`'s `tea-enforce.cjs` hook — one `nosemgrep` comment carrying its own justification, for a regex-injection finding that is a false positive.
- `bmad-brainstorming`'s `brain.py` — `hashlib.md5(...)` gains `usedforsecurity=False`. The hash picks a colour from a category name; the flag keeps the identical digest.

None of the three changes what a skill does.

**Their notice and licence texts are in this repository, at `ai-sdlc/notices/bmad/`.** Read `NOTICE.md` there for the full attribution the MIT licence requires, the trademark terms, and the reasoning behind each of the three changes above. `LICENSE.bmad-method` and `LICENSE.tea` are the licence texts themselves, verbatim.

**If you are reading this in a repository set up before 2026-09-10**, check whether `ai-sdlc/notices/` exists. If it does not, the notice never arrived. Re-running the installer places it. In the meantime the attribution is at `UserTestingEnterprise/sdlc-flows` under `packages/bmad/curated/`.

The `_bmad/` directory in your repository came from the same package. A skill reads it by path while it runs.

## The `authoring-foundations` package — prose and skill-authoring craft

Vendored from three separate upstream authors — Cursor, Matt Pocock, and Jesse Vincent
(`obra/superpowers`) — not ours. Renamed under a shared prefix from each source's own bare
skill name; `authoring-foundations/NOTICE.md` has the full attribution and what changed.

| Capability | What it does |
|---|---|
| `authoring-foundations-unslop` | Cuts AI writing tells (filler, mannered prose, stock vocabulary) from any text before it ships. |
| `authoring-foundations-writing-for-agents` | Reference for writing any document an agent consumes — a skill, your `AGENTS.md`/`CLAUDE.md` — so the same document produces reliable agent behavior every run. |
| `authoring-foundations-test-driven-development` | Red-green-refactor discipline for implementing any feature or bugfix: write the failing test first, minimal code to pass, then refactor. |

`authoring-foundations-writing-skills` is not included here. It stays in `sdlc-flows`'s own
`ai/skills/` for this repository's own use; it is not ready for estate-wide distribution yet
(RAD-88050, CAP-5). None of the three skills above point at it, so leaving it out creates no
dangling reference.

## The `sdlc-loop` package — set up and run bmad-loop

Written and maintained by the AI-SDLC team, in `sdlc-flows`.

| Capability | What it does |
|---|---|
| `sdlc-loop` | Sets up bmad-loop without writing one person's binary path into a hook file the whole team shares. It then starts, watches, recovers and prices an unattended run that builds the stories in a spec folder. It has three modes: `setup`, `run` and `cost`. |

It needs `uv`, `tmux` and git 2.34 or newer.
Use it instead of the `bmad-loop-setup` skill that BMAD places.
That skill writes the path to one person's copy of the program into hook files the whole team shares.
The scripts it runs sit inside its own skill folder.
It edits `.gitignore`, `.bmad-loop/` and the hook files in your repository without asking.
It edits your personal Claude Code and Codex settings only after you approve each change.

## The `sdlc-attribution` package — a trailer on commits that hold AI-edited files

Written and maintained by the AI-SDLC team, in `sdlc-flows`.

| Capability | What it does |
|---|---|
| `sdlc-attribution` | Adds a `Co-Authored-By` trailer to a commit that contains a file an AI tool edited, naming the tool. It has three modes: `setup`, `check` and `remove`. |

It needs `jq` and Python 3.11 or newer, or `uv`.
Its setup script merges entries into `.claude/settings.json`, `.codex/hooks.json`, `.cursor/hooks.json`, `.github/hooks/track-ai-touch.json` and `.gitattributes`, without changing the entries already there.
It sets `core.hooksPath` only when your repository has no git hooks of its own, and otherwise prints two lines for the owner of those hooks to add.
Copilot needs one personal file copied by hand, once per machine.

## The `sdlc-skills` package — behavior-driven discovery, story-point estimates and pull-request helpers

Written and maintained by the AI-SDLC team, in `sdlc-flows`.

| Capability | What it does |
|---|---|
| `sdlc-bdd` | Runs before `bmad-spec` and puts a shared glossary and agreed Given/When/Then examples in front of it. It has two modes, `glossary` and `examples`, and a script that lints, scans and traces the files it writes. It writes no spec, story or test. |
| `sdlc-estimates` | Sizes epics and stories in story points and records each size in Jira and in a spec folder. A story point is a relative size and never a time estimate. It stops and hands the estimate to the repository's own estimation workflow when there is one, such as a workflow built on OpenSpec. It does not report what a run cost. The `cost` mode of `sdlc-loop` records the actuals. |
| `sdlc-pr-helpers` | Four separate helpers around a pull request: `scan` reviews the local diff before you push, `ship` opens the draft pull request, `read` gathers the review state, and `respond` replies to each finding. |

`sdlc-bdd` needs `uv` installed, because its script `bdd_check.py` runs through it.
One of its files, `gherkin-guidelines.md`, is MIT-licensed and belongs to Pandy Knight, and its notice installs under `ai-sdlc/notices/sdlc-skills/`.

`sdlc-pr-helpers` needs `gh` signed in and `uv` installed.
Its `scan` mode also needs the `bmad-review` skill, which the `bmad` package places.
Its `ship` mode expects a branch name that starts with a Jira key and a pull request template at `.github/pull_request_template.md`.
Both conventions come from this team's repositories.

---

## What did *not* arrive, and why

**The architecture team's standards are not included, on purpose.** An earlier draft carried
a copy of their `archie`, `arch-audit` and `arch-new-standard` skills. Copying another team's
content into a third repository makes us a redistributor of material we do not maintain, and
they are separately moving away from having their framework copied into repositories at all.

If you want architecture guidance, get it from the people who own it:

```bash
npx --yes github:UserTestingEnterprise/architecture-ai-workspace
```

**Also not here:**

- **No enforcement of anything.** Nothing blocks a commit, fails a build, or gates a pull
  request.
- **Update reads the local package tree only.** `ai-sdlc update` and `ai-sdlc remove`
  act on the paths `ai-sdlc/installed.json` names, and copy any file you edited since to
  `ai-sdlc/local/backups/` before they replace or delete it.
  Update does not fetch a published release yet.
- **Jira is written only when you ask. Nothing writes to Confluence.** Some capabilities read
  from Atlassian if your coding tool is connected to it. These can change Jira:
  `sdlc-estimates` sets the Story Points field and adds comments when you ask it to record an
  estimate. The `cost` mode of `sdlc-loop` can add a worklog, which is a record of time spent, if you choose to make one.

---

## How this got here

The installer copies real files into your repository.
It works in every coding tool, including ones we have never tested.
Two files record what it did: `ai-sdlc.json` (what you asked for, and safe to edit by hand) and `ai-sdlc/installed.json` (every path the installer placed, with a digest of its content, and never edited by hand).

## Who to tell when it breaks

Report it. A specific "this did X and I expected Y" report is more useful than a general
impression. This is early in the tool's life, when changes are cheapest to make.
