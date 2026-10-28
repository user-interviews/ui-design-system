# Tools: lint, scan and trace

`scripts/bdd_check.py` has three commands.
Exit code 1 means a finding to act on.
Exit code 2 means an input file or search path could not be read, the example map holds no examples, or an id given to `--only` does not exist.
A warning never fails a run.

```bash
uv run {skill-root}/scripts/bdd_check.py lint --examples <examples.md> --glossary GLOSSARY.md
uv run {skill-root}/scripts/bdd_check.py scan --glossary GLOSSARY.md --search <paths...> [--since REF]
uv run {skill-root}/scripts/bdd_check.py trace --examples <examples.md> --search <paths...> --require spec|tests|both [--only EX-1 EX-2]
```

## lint

`lint` checks the example map against the format in `mode-examples.md` and the glossary.

It reports errors for a rule with no example, an example outside a rule, steps out of order, an `Or` step, a duplicate id, and an avoided glossary term in a title, step, rule, question or the story.
It reports an error when `status` is `ready` and an example is not `human`, or more than three questions are open.
It reports warnings for a vague `Then` step, a placeholder value, a scenario with more than five steps, a scenario without its `@EX-n` tag, an example without a `_Source_:` line, a rule with a single example, a map with more than six rules, a missing `status`, and a missing `## For the spec writer` section.

## scan

`scan` lists every file that uses a term the glossary says to avoid, and counts how often each glossary term appears.
A glossary term with zero uses in the code and tests means the build stage did not pick up the language.

It skips `.memlog.md` files, folders named `reviews`, and `GLOSSARY.md`, because those quote avoided terms on purpose.
In a markdown or text file, it also skips a line that contains `never`, `avoid`, `_Avoid_` or `do not use`, because that line is quoting the term to forbid it.
It reads every line of a code file.
In a repository with existing code, add `--since <ref>`, where `<ref>` is the commit before the change. `scan` then reads only the lines added since that ref, and every line of a new file, so old code is not reported.
It finds new files from the top of the repository, so it gives the same answer from any folder inside it.
It matches words, so an everyday sentence that uses `user` is reported. Read its output before acting on it.

## trace

`trace` reports, for each example id, the spec files and the test files that cite it.
A spec file is `SPEC.md`, `stories.yaml`, or a file under `stories/`.
A test file is under `tests/`, `test/`, `spec/` or `e2e/`, or is named `test_*`, `*_test.py`, `*.test.*` or `*.spec.*`.
An id matches as `EX-3`, `ex_3` or `ex3`, and `EX-3` never matches `EX-30`.
An example id is a number within one feature, so a test named `test_ex_1_...` for another feature also covers this feature's `EX-1`.
Point `--search` at the folders of one feature.
Or add `--tests-in <pattern>`, so that only a test file whose path matches the pattern counts, for example the feature's folder name.
The pattern is a regular expression that is searched for in the path, so anchor it, as in `(^|/)feature_b(/|$)`, to keep `feature_b` from matching `feature_bar`.
The path starts with the name of the search folder itself, then continues below it.

`--require spec` exits 1 when any example has no spec reference.
`--require tests` exits 1 when any example has no test reference.
`--require both`, also spelled `--strict`, exits 1 when either is missing.
`--only` limits the report and the requirement to the named ids, which is how to check the stories built so far.

## After each stage

1. After `bmad-spec` finishes, run `trace --require spec` over the spec folder.
   Every `EX-n` must appear in `SPEC.md`.
   A missing id means the spec dropped an example: ask `bmad-spec` to update the spec and cite it.
2. After the stories exist, run `trace --require spec` again over the spec folder.
3. After a story is built, run `trace --require tests --only <the story's example ids>` over the spec folder and the test folder, and `scan` over the source and test folders, with `--since <the commit before the story>` in a repository with existing code.
4. When every story is built, run `trace --require both` over the spec folder and the test folder.

Done when the command for the stage exits 0.
