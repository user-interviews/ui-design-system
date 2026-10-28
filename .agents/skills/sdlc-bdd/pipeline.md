# Where sdlc-bdd meets the pipeline

The skill runs before `bmad-spec`.
Every later skill receives the glossary and the examples as ordinary text in the spec, the stories and the tests.
No BMAD skill is customized to read them, and no stage needs extra text in its call.

## The path

| Order | Skill | What it receives | How it receives it |
|---|---|---|---|
| 1 | `sdlc-bdd` mode `glossary` | The brief or story | Writes `GLOSSARY.md` and one line in `AGENTS.md` |
| 2 | `sdlc-bdd` mode `examples` | The brief and `GLOSSARY.md` | Writes `{planning_artifacts}/bdd/<slug>/examples.md`, with a `## For the spec writer` note at the top |
| 3 | `bmad-spec` | The brief, `GLOSSARY.md` and `examples.md`, all named in the call | Follows the note. The spec lists both files under `companions:`, cites each example id in a `success` line and adds a constraint that every test is named after its example |
| 4 | `bmad-architecture`, `bmad-testarch-test-design` | `SPEC.md` and its companions | Read the spec package. Both carry the example ids and the naming rule |
| 5 | `bmad-spec` story breakdown | `SPEC.md` | Each story names the example ids it proves |
| 6 | `bmad-testarch-atdd`, `bmad-build`, `bmad-build-auto`, `sdlc-loop` | A story and the spec | Read the story and the spec package. Tests are named `test_ex_<n>_...` and reproduce the example's values |
| 7 | `bmad-testarch-trace` and `trace` in `tools.md` | Specs and tests | `trace` lists each example id with its spec and test files |

## When to run each step

Run `glossary` early and keep the file current, because every later stage reads it.
Run `examples` once per feature, after the brief or PRD exists and before `bmad-spec`, because the rules need a stable requirement to map.
Run the checks in `tools.md` after the spec, after each built story and at the end.

## How the artifacts are found

BMAD has no registry of artifacts.
Upstream skills write under `{planning_artifacts}/<type>/<run>/`, and `bmad-spec` reads whatever the call names and lists the files it adopts under `companions:`.
These routes carry the BDD files:

- The call to `bmad-spec` names the three files, and the note inside `examples.md` says what to do with them.
- The spec's `companions:` list is what every later skill reads.
- The `AGENTS.md` line that mode `glossary` adds points every agent in the repository at `GLOSSARY.md`.

## Limits

- A headless run cannot hold the discovery conversation. Its examples are `derived`, the map is `draft`, and the spec records that an AI wrote the examples.
- `scan` matches words, so an everyday sentence that uses `user` is reported. Read its output before acting on it.
- The path was tested with a brief as input. A PRD, or the epics route through `bmad-create-epics-and-stories`, was not tested.
