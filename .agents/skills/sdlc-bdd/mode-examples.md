# Mode: examples

Goal: agree the rules of one feature and a concrete example for each rule, before the spec exists.
The method is example mapping: a story, the rules that govern it, an example of each rule, and the questions nobody can answer yet.
The procedure follows the `example-mapping` skill in `chdalski/claude_orchestration` (MIT license): the facilitator asks the person for rules and examples and does not invent them.
No text is copied from that skill.

## Who supplies the examples

Every example carries a `_Source_:` line with one of two values.
`human` means a person gave the example or confirmed it in this session.
`derived` means the skill wrote it from a document.

Interactive runs ask the person for the rules and for an example of each rule, and mark those examples `human`.
Headless runs have nobody to ask, so every example is `derived`, the file's status is `draft`, and the skill says so in its summary.
A `draft` map is a starting point for a person to confirm.
It is not a record of an agreed conversation.

## File format

`{planning_artifacts}/bdd/<slug>/examples.md` has this shape.

````markdown
---
feature: <slug>
source: <path of the brief or story this came from>
status: draft
updated: <UTC datetime from `date -u +%Y-%m-%dT%H:%M:%SZ`>
---

# Examples: <feature name>

## For the spec writer

This file and `GLOSSARY.md` are inputs to `bmad-spec`. List both under `companions:` in SPEC.md by relative path and do not edit them.
Use the glossary's terms in capabilities, constraints and success criteria, and never a term it lists under `_Avoid_`.
Each rule becomes a constraint or the intent of a capability.
Cite each example id in the `success` line of the capability it proves, so every id appears in SPEC.md.
Each open question becomes an Open Questions entry.
Add a constraint to SPEC.md: every test is named after the example it proves, with the example id in the test name, for instance `test_ex_3_...`, the test reproduces the example's names, amounts and dates, and code and tests use the glossary's terms.
If any example's `_Source_` is `derived`, or has no `_Source_` line, add an assumption that names those examples by id.
The assumption says an AI derived them and a person did not supply them.

## Story

One paragraph in glossary terms: who wants what, and why.

## RULE-1: A participant has at most one session at a time

### EX-1: Overlapping session is refused

_Source_: derived

```gherkin
@EX-1
Scenario: Overlapping session is refused
  Given the participant "Dana Reyes" has a session from 10:00 to 11:00
  When the moderator schedules a session from 10:30 to 11:30 for "Dana Reyes"
  Then the system refuses the session with the message "Participant is busy"
```

## Open questions

- Q-1: Do back-to-back sessions count as overlapping?

## Assumptions

- Headless runs record each decision here.
````

`status` is `draft` or `ready`.
`ready` means every example is `human` and at most three questions are open.
A rule heading holds one sentence that states a business rule.
An example heading holds a short title that states the behavior.
Write every scenario to `gherkin-guidelines.md`: one behavior per scenario, observable `Then` steps, concrete values, domain words and no screen mechanics.
Above each scenario goes a tag that repeats its example id, such as `@EX-1`, so the map converts to `.feature` files later without losing the link.
Keep a scenario to five steps or fewer, the number the Cucumber documentation gives. The vendored guidelines say fewer than ten, and the five-step limit is this skill's stricter choice because the examples are read by people and by a spec writer, and never run.

## Steps

1. Read the story or brief and `GLOSSARY.md`.
   No glossary means run mode `glossary` first.
2. Write the `## For the spec writer` section exactly as the format above shows it, and then the `## Story` paragraph using glossary terms only.
3. List the rules.
   Each requirement sentence in the input becomes a rule, or becomes a line under `## Open questions` if the input does not decide it.
   Interactive: propose the rules and let the person correct them.
4. Write the examples, at least two per rule: one that shows the rule and one at its limit or against it.
   Interactive: ask the person for an example first, then add the ones the person missed.
5. List every point the input leaves open under `## Open questions`, and never answer one.
   Headless: where an example depends on an open question, write the assumed answer under `## Assumptions` with the question's id.
6. Set `status` to `draft`, or to `ready` only when `lint` allows it.
7. Run `bdd_check.py lint --examples <file> --glossary GLOSSARY.md` and fix every error.
   More than six rules means the story is too large, and the right move is to split it.

Done when `lint` reports no errors, every requirement sentence in the input maps to a rule or a question, and every rule has at least two examples.
