# Anchors

Story points are an arbitrary relative size from a pre-AI sizing method. They are never a time estimate. See the `sdlc-estimates` skill.
Every figure here comes from the RAD-88329 installer work (UserTesting). Add rows as epics finish.
The factors that add points (API changes, versioning, coordination across repositories, complexity) and the method for high-level estimates are in `rubric.md`. This file holds the measured data the rubric is checked against.

## Line rates (for retrospective estimates and cross-checks)

Set on 2026-10-04 after a review found that small stories came out too high. The rates are sizes in points, and they exist only to turn a finished diff into points.

| Overhead per story | Production lines per point | Test lines per point | Deleted lines | Floor |
|---|---|---|---|---|
| 0.75 points | 67 | 133 | 10 percent of the production rate | 2 points |

## Anchor stories (retrospective, Epic 1, RAD-89617)

| Points | Story | Shape |
|---|---|---|
| 2 | 1-7 Never destroy a file we did not put there | One guard with a refusal path; 42 production lines, 141 test lines |
| 3 | 1-13 Return one result envelope and findings from every command | Small shared type and its adoption; 69 production lines |
| 5 | 1-12 Record what landed, with digests | One record format and its writer |
| 6 | 1-2 Layer the modules, enforce the import graph | 30 files moved, one architecture test |
| 6 | 1-11 Remove pointer mode and its tests | Mostly deletion; 1,446 lines removed, tests rewritten |
| 8 | 1-5 Read the exact plan before anything is written | One command output and its planner; 298 production lines |
| 9 | 1-10 Find out how to use what I just installed | A docs command, flags and stubs; about 230 new production lines (1,680 more were a move) |
| 10 | 1-3 See what is on offer, and how far it has been proven | A list command with readiness rules; 382 production lines |
| 13 | 1-9 Choose interactively, or drive the same run from flags | Interactive screens and a flag-driven twin; 480 production lines |
| 13 | 1-8 Stage the plan, then write it across under a lock | Staging, lock and write-across; 481 production lines |
| 14 | 1-4 Place content where each coding tool looks, and only once | Placement rules across four tools; 517 production lines |
| 15 | 1-6 Refuse, clearly, before writing anything | A gate with many distinct refusals; 595 production lines |
| 18 | 1.1 Run the CLI from a packed tarball (low confidence) | A mechanical TypeScript port of 11 modules, packaging and CI, publish workflows, parity check |
