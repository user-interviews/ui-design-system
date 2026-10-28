---
name: sdlc-bdd
description: Use before bmad-spec when a feature needs behavior-driven discovery. Mode glossary builds the project's shared vocabulary. Mode examples maps a story into rules, concrete Given/When/Then examples and open questions, and writes the note that tells bmad-spec how to use both files.
---

# sdlc-bdd

This skill puts behavior-driven development (BDD) at the front of the pipeline.
It writes two files, and `bmad-spec` turns them into capabilities with testable success criteria.
`bmad-architecture`, the TEA skills, `bmad-build`, `bmad-build-auto` and `sdlc-loop` receive the result as ordinary requirements and need no BDD knowledge.

The skill does not write specs, stories or tests.
It runs before `bmad-spec`, and the commands in `tools.md` check the result after each later stage.

## Resolution rules

- `{skill-root}` is this skill's installed folder. The mode files and `scripts/` sit there.
- `{project-root}` is the project's working directory.
- `{planning_artifacts}` is the `planning_artifacts` value that `uv run {project-root}/_bmad/scripts/resolve_config.py --project-root {project-root}` prints under `modules.bmm`. Without BMAD it is `{project-root}/planning-artifacts`.
- `<slug>` is the feature slug named in the invocation. Without one, derive it from the brief's file name in lower-case words joined by hyphens.

## The two artifacts

| File | Scope | Holds |
|---|---|---|
| `{project-root}/GLOSSARY.md` | The whole project | One entry per business term: its definition and the synonyms to avoid. |
| `{planning_artifacts}/bdd/<slug>/examples.md` | One feature | A note for the spec writer, the story, the rules, the examples as Given/When/Then with who supplied each, the open questions and the status. |

`<slug>` names the feature, and it matches the slug `bmad-spec` will use for the same feature.

Identifiers are `RULE-n`, `EX-n` and `Q-n`, numbered in the order they are written.
An id is never renumbered or reused, so a spec, a story or a test that cites `EX-3` keeps meaning the same example.

## Modes

Pick the mode from the invocation.
With no mode named, interactive runs ask which one.
Headless runs take the first row whose file is missing: `glossary` when `GLOSSARY.md` is missing, then `examples` when the feature's `examples.md` is missing.

| Mode | Use it when | Read |
|---|---|---|
| `glossary` | The project has no glossary, or a new feature brings new terms | `mode-glossary.md` |
| `examples` | A story or brief needs its rules and examples agreed before the spec | `mode-examples.md` |

The `examples` mode ends by writing the note that `bmad-spec` reads, so the call to `bmad-spec` only names the brief, `GLOSSARY.md` and `examples.md`.
Where each pipeline skill meets these files is in `pipeline.md`.
The writing standard for every Given/When/Then is `gherkin-guidelines.md`, a vendored upstream file under MIT license.

## Interactive and headless

Interactive runs ask one question at a time and wait for the person's answer.
The person supplies the examples, and the skill proposes rules, asks for an example per rule, and probes limits.

Headless runs ask nothing.
They decide.
Mode `examples` writes each decision on a line under `## Assumptions` in `examples.md`.
Mode `glossary` states each naming choice in its final summary, because the glossary format has no assumptions section.
A question the input leaves open goes to `## Open questions`.
The headless run never answers it.

## Tools

`scripts/bdd_check.py` does the mechanical work and needs only `uv`.
`tools.md` lists its three commands (`lint`, `scan`, `trace`) and says when to run each.
