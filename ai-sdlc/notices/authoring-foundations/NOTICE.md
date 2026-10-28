# Third-party notices for the `authoring-foundations` package

**Almost everything in `skills/` here was written by somebody else** — the exceptions are
named below, in "What we changed." This package exists to redistribute the rest through
this repository's installer, the way `packages/bmad/curated/` redistributes a curated
BMAD subset. If you are reading this in a repository that installed
`authoring-foundations`, this file is the licence notice MIT requires to travel with the
copy you received.

## What is here, and whose it is

| Skill(s) (as installed) | Upstream name | Whose | Commit | Licence |
| --- | --- | --- | --- | --- |
| `authoring-foundations-unslop` (plus rules 34-36 and the invocation-flag removal, ours, see "What we changed") | `unslop` | Cursor (`cursor/plugins`) | `6ed0f7a9504f577d7529064103cecce9be7dfc5e` | MIT (stated in README, no formal `LICENSE` file — see `LICENSE.unslop`) |
| `authoring-foundations-writing-for-agents` (plus a Register section and a broadened description, ours, see "What we changed") | `writing-for-agents` | Matt Pocock (`mattpocock/skills`) | `c55ee46073ed923f86ce59a5eb3b6d895095d1b7` | MIT — `LICENSE.writing-for-agents` |
| `authoring-foundations-test-driven-development` | `test-driven-development` | Jesse Vincent / `obra/superpowers` | `5bf4e78011075bcfc0dc295f0724994cd123ee71` | MIT — `LICENSE.superpowers` |

Copyright, where upstream states one: Matt Pocock, 2026 (`writing-for-agents`); Jesse
Vincent, 2025 (`test-driven-development`). `unslop`'s upstream names no copyright
holder — see `LICENSE.unslop` for exactly what it does say.

## What we changed

Every directory and each `SKILL.md`'s `name:` field carries an `authoring-foundations-`
prefix that upstream does not use, to satisfy this installer's AD-3 (a copy-kind
package's component names must start with its declared prefix).

**`authoring-foundations-writing-skills` was removed from this package** (RAD-88050,
CAP-5), not ready for estate-wide distribution yet. It still lives in `ai/skills/` for
this repository's own use. Upstream's `writing-skills` names `test-driven-development`
as `REQUIRED BACKGROUND` in its own text, but nothing among the three skills that remain
here points at `writing-skills` in either direction, so removing it leaves no dangling
pointer in this package.

`authoring-foundations-unslop/SKILL.md` also gained three new rules, 34 through 36, and
`authoring-foundations-writing-for-agents/SKILL.md` gained a `## Register` section and a
broadened trigger description. Both skills' `description` fields were later tightened
again to be more assertive and to widen the trigger to any markdown file, not only
skills and specs. Full detail, including which specific lines changed and why, is in
this repository's own `ai/skills/NOTICE.md` — the canonical source this file restates
for an audience that installed the package without cloning `sdlc-flows` itself.

Beyond the rename, those content additions, and the pointer fixes, every file's body is
otherwise a byte-for-byte copy of the commit named above.

## Where the originals are

- `https://github.com/cursor/plugins` — `pstack/skills/unslop/SKILL.md`
- `https://github.com/mattpocock/skills` — `skills/productivity/writing-for-agents/`
- `https://github.com/obra/superpowers` — `skills/test-driven-development/`

All fetched at the commits named in the table above, verbatim, then renamed per "What we
changed."

## Keeping this in sync

This file and `ai/skills/NOTICE.md` state the same commit/date/licence facts for two
different audiences. When one updates — a re-vendor per `ai/skills/NOTICE.md`'s "When to
update" recipe — update this file in the same change, so a downstream install never reads
a stale commit hash the source repository has already moved past.
