# Mode: glossary

Goal: one file where each business term has one name and one meaning, written before the spec so every later stage uses the same words.

The file and its format are the ones the `domain-modeling` skill in `mattpocock/skills` writes today (MIT license, renamed from `CONTEXT.md` to `GLOSSARY.md` on 2026-09-17).
A repository that also has `domain-modeling` installed can use either skill on the same file.

## File format

`{project-root}/GLOSSARY.md`, at the repository root, has this shape.

```markdown
# Session scheduler

A library that schedules research sessions between moderators and participants.

## Language

**Session**:
A scheduled meeting between a moderator and a participant.
_Avoid_: booking, appointment

**Participant**:
A person who takes part in a session.
_Avoid_: user, subject
```

A term is a bold name and a colon, then a definition of one or two sentences that says what the thing is.
`_Avoid_:` comes last and lists the synonyms people use for the same thing.
A blank line ends an entry.
Only terms specific to this project belong in the file.
Leave generic words such as item, element, row or rule out of `_Avoid_`, because existing code uses them for other things and `scan` reports each use.
General programming words such as timeout or error do not.
Keep the file under about 200 lines, because every stage loads it.

## Steps

1. Read the inputs: the brief, story or spec the person points at, any existing `GLOSSARY.md`, and the names in existing code.
   An existing glossary means this run updates it in place and keeps every term's name.
2. List the candidate terms: the nouns and verbs the domain relies on.
   For each, collect the other words the input uses for the same thing.
3. Settle one name per concept.
   Interactive: show the person the synonyms and ask which name wins, one concept at a time.
   Headless: choose the name the input uses most, and say so in the final summary.
4. Write or update `GLOSSARY.md` in the format above.
5. Make `AGENTS.md` point at the glossary.
   Add one line if no line mentions `GLOSSARY.md`: "Business terms are defined in `GLOSSARY.md`. Use those names in code, tests and documents, and never a term listed under `_Avoid_`."
   Every agent session and subagent reads `AGENTS.md`, so this line is how build-stage agents receive the vocabulary.
6. Run `scan` over the input: `bdd_check.py scan --glossary GLOSSARY.md --search <input>`.

Done when every concept the input names two ways has one entry, each entry has a definition of one or two sentences, `AGENTS.md` names the file, and the `scan` output lists avoided terms only in the input and in `GLOSSARY.md` itself.
