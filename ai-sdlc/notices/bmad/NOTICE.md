# Third-party notices for `bmad-curated`

**Everything under `skills/` in this package was written by somebody else.** It is not UserTesting's work, and this file is the notice their licence requires us to ship with it.

## What is here, and whose it is

| What | Whose | Version | Licence |
| --- | --- | --- | --- |
| 29 skills from BMAD Method (`bmm` and `core` modules) | BMad Code, LLC | 6.12.4 | MIT — `LICENSE.bmad-method` |
| 10 skills from BMAD Test Architecture Enterprise (`tea`) | BMad Code, LLC | 1.24.0 | MIT — `LICENSE.tea` |
| The three `bmad-loop` skills (`bmad-loop`) | BMad Code, LLC | 0.12.0 | MIT — `LICENSE.bmad-loop` |

Copyright (c) 2025 BMad Code, LLC, for all three.

The `bmad-loop` row differs from the other two in one way. This package carries only the three `bmad-loop` skills. BMAD's own installer still fetches the module at the tag `bmad-pins.json` pins and places its `_bmad/bmad-loop/` folder in the target repository, and the skills come from this package as the other two do. The installer places this notice and `LICENSE.bmad-loop` under `ai-sdlc/notices/`, so the licence travels with the files. `LICENSE.bmad-loop` is the licence file of the `bmad-loop` 0.12.0 release, copied unchanged. The `bmad-loop` command-line tool is not carried.

## Why the file exists

The MIT licence permits copying, modifying and redistributing the software. It attaches one condition, and this is the whole of it:

> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

We vendor 936 of their files. That is a substantial portion by any reading, so the notice has to travel with them. Without this file the redistribution is out of compliance — not because the content is restricted, but because the one condition attached to using it freely was not met.

**This was missing until 2026-09-07T22:31:27Z.** An adversarial review of RAD-87151 found it. The package had been built, published as a plugin and installed into six repositories with no notice of any kind, under a root `LICENSE` that describes the whole repository as UserTesting's property.

## Trademarks, which the licence treats separately

BMAD's licence carries a trademark notice, and it is not covered by the copyright grant:

> BMad™, BMad Method™, and BMad Core™ are trademarks of BMad Code, LLC, covering all casings and variations (including BMAD, bmad, BMadMethod, BMAD-METHOD, etc.). The use of these trademarks in this software does not grant any rights to use the trademarks for any other purpose.

Two consequences for how this package is named and described:

- Every skill keeps its upstream `bmad-` name. That is a functional requirement — the skills call each other by name and BMAD's routing tables refer to them — and it is use *in this software*, which the notice permits.
- The plugin is titled "BMAD Method (curated by UserTesting)". It says whose method it is and that the selection is ours. **It is not a UserTesting product and must not be described as one.**

## What we changed

**Every changed file is listed below. Everything else in `skills/` is a byte-for-byte copy.**

MIT permits modification, so this section is not a licence obligation — it is here because a modified copy passed off as upstream's own is a worse problem than a missing notice, and because a reader comparing our tree to theirs deserves to know where to expect a difference.

| File | What we changed | Why |
| --- | --- | --- |
| `skills/tea/bmad-testarch-ci/github-actions-template.yaml` | 13 GitHub Actions references pinned from `@v4` to the commit SHA that tag pointed at on 2026-09-07T22:31:27Z | This file is a **template** the skill writes into a target repository, so an unpinned tag becomes that repository's CI. A mutable tag can be repointed by the action owner |
| `skills/tea/bmad-testarch-framework/resources/hooks/tea-enforce.cjs` | A `nosemgrep` comment above one `new RegExp()`, carrying its own justification | The finding is a false positive for regex injection — the pattern is built from escaped input — and saying so in place is better than suppressing it out of sight |
| `skills/bmm/bmad-brainstorming/scripts/brain.py` | `hashlib.md5(...)` gains `usedforsecurity=False` | The hash derives a colour hue from a category name. Nothing security-relevant depends on it, and the flag keeps the identical digest, so hues do not shift |
| `skills/bmm/bmad-retrospective/scripts/tests/test_git_evidence.py` | A `nosemgrep` comment above one `os.chmod(shim, 0o755)`, carrying its own justification | BMAD 6.12.4 added this test. It makes a fake `git` executable in a temporary folder, and the permissive-mode finding does not apply to a folder the test deletes |
| `skills/bmm/bmad-retrospective/scripts/tests/test_sprint_status.py` | A `nosemgrep` comment above one `os.chmod(holder, 0o755)`, carrying its own justification | BMAD 6.12.4 added this test. It restores a read-only temporary folder so the runner can delete it, and the permissive-mode finding does not apply there |
| `skills/bmad-loop/bmad-loop-setup/SKILL.md` | A notice under the title that says not to run an upgrade where bmad-loop is pinned, and to use the `sdlc-loop` skill's `setup` mode | The skill's upgrade steps run `uv tool upgrade bmad-loop --reinstall`, which follows `main`, and `bmad-loop init --force-skills`, which overwrites the installed skills with the CLI's bundled copy. Either one moves an install off the pinned release |
| `skills/bmm/bmad-code-review/steps/step-02-review.md` | One rule and one comment reworded: a review layer that returns no output at all counts as failed, and a layer that reports it found nothing, such as an empty `[]` array, is clean | Upstream's text lists a layer that "returns empty results" in `failed_layers`. Edge Case Hunter returns `[]` on a clean diff, as its own instructions say, so a clean review warned that a layer failed and withheld the clean-review message |
| `skills/tea/bmad-testarch-test-review/test-review-template.md` | The knowledge-base links and paths change from `../../../agents/bmad-tea/` to `../../.agents/skills/bmad-tea/` | The skill writes its report to `_bmad-output/test-artifacts/test-review.md`. The knowledge files are under `.agents/skills/bmad-tea/` at the repository root, and from the report's folder `../../` reaches that root. A report written to another location needs different relative links, as the release notes explain. Upstream's `agents/` folder does not exist in an installed repository, so every link in every generated report pointed at a file that is not there |
| `skills/tea/*/SKILL.md` (10 files) and `skills/tea/*/workflow.yaml` (8 files) | The step that loaded `_bmad/tea/config.yaml` now runs `_bmad/scripts/resolve_config.py`, and `config_source` in each `workflow.yaml` names that command. The 8 `workflow.yaml` files also lose the `autonomous: true` line in `execution_hints` (RAD-91246) | BMAD's installer writes the installing person's `user_name` into each module `config.yaml`, and git shares those files. The resolver also reads the personal `_bmad/config.user.toml`, so the name can leave the shared files (RAD-91022). BMAD 6.12.4 made the same change in its own `bmm` and `core` skills, and `tea` has not made it, even at v1.27.2 |
| `skills/bmm/bmad-sprint-planning/scripts/sprint_plan.py` | The loader variable is called `round_trip`, not `yaml`, at each of two `yaml.load(fh)` calls (`_load_existing` and the validate path), with a comment giving the reason | The finding is a false positive: the loader is ruamel's round-trip loader, which builds on its safe constructor and constructs no objects from tags. RAD-91246 added a `nosemgrep` comment, but Semgrep's rule matches the name `yaml` and still reported the call in ai-sdlc-workspace, so the variable has a different name (RAD-92086) |
| `skills/bmm/bmad-retrospective/scripts/sprint_status.py` | The loader variable in `_load_yaml` is called `round_trip`, not `yaml`, with a comment giving the reason | The same false positive as in `sprint_plan.py` (RAD-91246, RAD-92086) |
| `skills/bmm/bmad-party-mode/scripts/resolve_party.py` and `skills/bmm/bmad-forge-idea/scripts/resolve_personas.py` | `subprocess.run(...)` collapsed onto one line, with a `nosemgrep` comment above it carrying its own justification | The call passes an argument list with no shell, and `--project-root` comes from the person running the script. A marker above a call spread over three lines was ignored (RAD-91246) |
| `skills/bmm/bmad-deep-recon/scripts/recon_kit.py` | `read_text` reads `Path(path_arg).resolve()` under a justified bare `# nosemgrep`, and the `-` stdin branch still comes first | The path hardening a path-traversal rule asks for, without limiting where a claims file can live. `resolve()` alone did not clear `hooks-path-traversal-python`, so the marker covers it: this is an argparse CLI, not a hook, and the caller can already read any file they name (RAD-91246) |
| `skills/bmm/bmad-deep-recon/scripts/tests/test_recon_kit.py` | A `ReadTextTest` class: a symlinked file is read, `-` reads stdin, a missing path raises `FileNotFoundError` | Covers the `resolve()` change above (RAD-91246) |
| `skills/tea/bmad-testarch-ci/steps-c/step-02-generate-pipeline.md` | The Maestro Install bullet requires the version pin and a SHA-256 check on every route, and the example exports `MAESTRO_SHA256` and runs `shasum -a 256 --check` | Upstream's text accepted "release-pinned or checksum-verified", so an agent copying its example wrote a CI pipeline that never verified the download (RAD-91246) |

Of the first seven rows, six alter nothing a skill does. The sixth adds a warning above the steps and changes none of them. The seventh changes one rule in `bmad-code-review`: a review layer that finds nothing is a clean layer, where upstream's text counts it as failed and so withholds the clean-review message. The eighth row changes where 18 `tea` files read their configuration. The skills load it through BMAD's resolver script, which merges the personal `_bmad/config.user.toml`, and no longer read `_bmad/tea/config.yaml`. The same keys come back, and a person's name can now come from a file git does not share. The pin is behaviour-preserving: the tag is pinned, not upgraded. Worth knowing separately — every action in that template is several majors behind current, and upgrading is a decision about vendored behaviour rather than a security fix.

The rows added for RAD-91246 clear Semgrep findings. Three add a `# nosemgrep` comment, or collapse a `subprocess.run` call to one line, and three rename a local variable (RAD-92086). None changes behaviour. The `recon_kit.py` row resolves the claims-file path before reading it and adds a justified `# nosemgrep`. The `workflow.yaml` row deletes `execution_hints.autonomous`, a hint that nothing in this repo reads, so no run changes. The Maestro row tightens guidance for the CI pipeline an agent writes.

**`build/bmad/patches/index.mjs` records these patches, and `build/bmad/patches-shipped.test.mjs` and `build/bmad/curated-config-source.test.mjs` check that each one is already applied to the committed files under `skills/`.** No build step applies them. The patched text is what is committed here, and BMAD's installer reads it from this tree. The patches were found missing when the first real capture was run against BMAD 6.12.0: that capture would have dropped the first three patches and undone the two `bmad-teach-me-testing` template repairs below. The build no longer captures anything (spec FR-21), so the record is what a re-curation re-applies by hand.

## The sentence above is not yet checked by anything

**Today the "three files" claim is maintained by hand, and it was wrong the first time it was written.** Two `bmad-teach-me-testing` templates had their frontmatter placeholders mangled from `{{user_name}}` to `{ { user_name } }` when this payload was first assembled, so an earlier draft of this file said "three" while the tree held five changes. The templates would have written the broken text into every generated session note in every target repository. A reviewer's bot found it by reading one file's frontmatter, after 86 tests and six checks had passed.

Both templates are restored, and the table above is accurate as this package is committed.

**RAD-87151 built `installer/check-bodies.mjs` to make this comparison automatic — verifying our copy byte-for-byte against a fresh run of BMAD's own real installer — and RAD-87559 removed it again.** Not a regression: the comparison it ran no longer means what it used to. Under `--custom-source` (RAD-87559), this package's `skills/` tree *is* the install source the real installer reads from — there is no longer a second, independently-produced copy for it to match against, so "byte-identical to what BMAD's installer wrote" stopped being a question with content. The claim in the table above is, once again, maintained by hand; whether a CI-time check re-diffing this tree against a periodically-refreshed upstream fetch is worth building is an open question, tracked in RAD-87559's own spec rather than assumed away here.

Two things around the bodies are ours, and neither is derived from their work:

- `.claude-plugin/plugin.json` — the plugin manifest that makes the directory installable.
- `LICENSE.*` and this file.

If a future change edits another skill body, add a row above.

## Where the originals are

- `https://github.com/bmad-code-org/BMAD-METHOD` at tag `v6.12.4`
- `https://github.com/bmad-code-org/bmad-method-test-architecture-enterprise` at tag `v1.24.0`, commit `7ba2130193c473b53d2e323b4da9a80697eef88e`

Both licence files in this directory were fetched from those sources on 2026-09-07T22:31:27Z and are verbatim.

**The tea line above used to read "at `main`, version 1.24.0", and that was true when it was written and false two days later.** On 2026-09-07 `main` was v1.24.0. Upstream then shipped four releases inside about ten hours on 2026-09-09 — v1.25.0, v1.25.1, v1.25.2, v1.26.0 — so a reader arriving later would resolve "main" to something these bodies are not. It now names the tag and the commit, which cannot drift.

**The tea version is pinned.** The delegate engine runs BMAD's installer in a scratch tree with `--pin tea=v1.24.0`, because redirecting BMAD's installer with `--custom-source` redirects the skill bodies only. The module's configuration scaffolding is still fetched live from whatever its release channel currently resolves to. Without the pin, v1.26.0 scaffolding would be wrapped around these v1.24.0 bodies. Measured on 2026-09-10; evidence in `_bmad-output/spikes/RAD-87559-simplify-bmad-install-custom-source/evidence/DATA-ONLY-INSTALL-EXPERIMENT.md` (removed 2026-09-12; RAD-87559 merged to main as PR #42, findings absorbed into `ARCHITECTURE-SPINE.md`).

`npm run check` in `build/` fails when the tea version in the table above differs from the tea pin in `bmad-pins.json` at the repository root (story 3a-2). `installer/check-docs.mjs` used to reconcile the pin in `packages/bmad/install.mjs` against that table, and story 3-11 deleted that file and retired the check. **Bumping either one means re-curating the vendored bodies and updating both in the same change** — and re-reading the "three files" table above, since two of those three patches are in `tea` and nothing reapplies them (RAD-87562).
