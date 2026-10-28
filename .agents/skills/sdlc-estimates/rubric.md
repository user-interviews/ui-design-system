# Estimating rubric

Read this when estimating a story or an epic.
Everything here is in story points, which are an arbitrary relative size and never a time estimate (see "What a story point is" in `SKILL.md`).
Every number here is a starting value that a person can review and change. Where a number comes from measured work it says so. Where it is a judgement it says that, and it has no data behind it yet.

## Steps

1. **Pick the level** from what you know today (next section). The level sets the method and the range.
2. **Work out the base points** for the core change and its own tests.
3. **Add the factor points** for the factors that apply and are not already inside the base.
4. **Round** to a whole number, with a floor of 2 points.
5. **Write the range and the level** next to the number.
6. **Check against the anchors** in `anchors.md`.
7. **Record it** as `SKILL.md` says.

## Level: what you know today

| Level | You have | Base method | Range around the number |
|---|---|---|---|
| epic | a goal, a PRD section or a capability list; no stories yet | size each capability with the ladder below | 0.5 times to 2 times |
| story | acceptance criteria written | points per criterion, or the closest anchor | 0.7 times to 1.5 times |
| story, code read | the criteria plus the code it will change | points per criterion, adjusted by what the code already does | 0.8 times to 1.3 times |
| retrospective | the finished diff | the line rates in `anchors.md` | 0.85 times to 1.2 times |

The ranges are judgements. Replace them when the retrospective deltas in `anchors.md` show how wide the misses really are.
Record the level with every estimate. An epic-level number and a story-level number for the same work are two original estimates.

## Base points

**By acceptance criteria (story level).** Count the Given/When/Then blocks. Each distinct behaviour is worth about 2.25 points for its implementation and its own tests, within a range of 0.6 to 3. The floor is 2 points.
The forecasts for the verify track, Epic 3 and Epic 3.5 used 1.5 points for each distinct behaviour, and that weight is the one to use when comparing with them.
Evidence: in Epic 1, six stories map one to one to a plan story. Measured points per criterion were 2.6, 2.3, 2.9, 2.5, 2.3 and 0.6 (stories 1.3, 1.4, 1.6, 1.9, 1.10 and 1.7). That is six data points.
The miss is 1.7: its four criteria describe one small guard, so they restate each other. When criteria overlap, count the distinct behaviours, not the blocks.

**By analogy.** Find the closest story in `anchors.md`, then move up or down for the differences. Use this for a forecast whenever the criteria are thin.

**By the capability ladder (epic level).** Size each capability, not each story:

| Size | Points | A capability like |
|---|---|---|
| XS | 2 | one guard or one flag |
| S | 3 | one small command or one rule set |
| M | 6 | one command with its output and tests |
| L | 10 | a command with real logic and several refusal paths |
| XL | 15 | a subsystem such as staging and write-across under a lock |
| XXL | 24 | split it before estimating |

**By measured diff (retrospective only).** Use the line rates in `anchors.md` as a cross-check, never as the forecast method.

## Factors: points added on top of the base

Apply a factor only when it is real for this story, and only when the base does not already include it. If a criterion already says "a compatibility test covers version 1", the compatibility factor is inside the base.
The ranges are starting values from judgement. The right-hand column says which have evidence.

### Interfaces and compatibility

| Factor | Ask | Add points | Evidence |
|---|---|---|---|
| Changing an existing API | Do you change a function, command, flag, file format or schema that other code in the repository already uses? | 1.5 for each API changed (callers and their tests) | Story 2-7 changed `runInstall` and about 900 tests pin it. Judgement. |
| Changing a public or external API | Do consumers outside the repository or team depend on it? | 3 to 9 (contract tests, consumer review, changelog) | Judgement. |
| Versioning an API | Must the old and new versions run side by side? | 6 to 15 | Judgement. |
| Backward-compatibility testing | Must old inputs, old records or old clients keep working, and do you have to prove it? | 3 to 9, or 1.5 to 3 for each supported old version | Story 2-6 (detect an Alpha install) is the nearest case. Judgement. |
| Data or schema migration | Does stored data change shape? | 3 to 12 (the migration, a rollback path, a test on realistic data) | Judgement. |
| Deprecation path | Do you have to warn, document and later remove the old behaviour? | 1.5 to 3 | Judgement. |

### Coordination across repositories, services and teams

Count effort, not waiting. Time lost waiting for a reviewer is not part of an estimate.

| Factor | Ask | Add points | Evidence |
|---|---|---|---|
| Each extra repository changed | Separate pull request, CI, review and release order? | 3 for each repository beyond the first | Judgement. |
| Each service or team coordinated with | Do you agree a contract, review a design or answer questions? | 3 to 6 for each | Judgement. |
| Release sequencing | Feature flag, staged rollout or ordered deploys? | 1.5 to 4.5 | Judgement. |
| Cross-repository or end-to-end test | Do you need a test that spans the boundary? | 3 to 9 | Judgement. |
| Dependency on unreleased work | Does this story need another story or team to land first? | none: record the dependency, do not add points | |

### Complexity in the code

| Factor | Ask | Add points | Evidence |
|---|---|---|---|
| Concurrency, locking, atomicity, recovery from partial failure | Can two things run at once, or can the work stop halfway? | 3 to 9 | Stories 1-8 (stage, lock, write-across) and 1-12 (record) measured about 13 and 5 points in total. |
| Many failure modes | How many distinct refusals or error paths does the criteria list? | 1.5 to 6 | Story 1-6 (a gate with many refusals) measured about 15 points in total. |
| A large existing test surface | Do hundreds of tests pin the code you change? | 1.5 to 6 | Story 2-7. Judgement. |
| Legacy or untested code | Must you write characterization tests before changing it? | 3 to 9 | Judgement. |
| Security, permissions, secrets | | 3 to 6 | Judgement. |
| Performance or scale requirement | | 3 to 9 | Judgement. |
| Unfamiliar technology or a spike | Name the unknown. | 3 to 9 | Judgement. |
| Several tools, platforms or operating systems | How many do you support and test? | 1.5 to 6 | Story 1-4 places content for four coding tools. |
| A user interface with states | | 3 to 9 | Judgement. |

### Work around the code

| Factor | Add points | Evidence |
|---|---|---|
| Documentation, runbooks, migration notes | 0.75 to 3 | Judgement. |
| CI, build, packaging, publish workflows | 1.5 to 6 | Story 1.1 had all four. |
| Logging, metrics, alerts | 1.5 to 3 | Judgement. |
| Test data and fixtures | 1.5 to 3 | Judgement. |

### Uncertainty: widen the range, do not add points

Ambiguous or missing acceptance criteria, an unclear contract, or an open design question moves the estimate to the wide end of its level's range. Ask the question or split the story. Do not add contingency points.

## Limits

- If the factor points add up to more than the base, check the base. Either the base is too small, or the story is two stories.
- A story over 15 points should be split before it is estimated, unless it cannot be split.
- Sum the stories into an epic total. Do not add a contingency. The epic's range is the sum of the story ranges, widened to the epic-level range when the stories are still thin.

## Epic-level estimates (when you cannot count lines or criteria)

1. List the capabilities the epic delivers, from the PRD or the epic's goal.
2. Size each with the capability ladder, by analogy to an anchor.
3. Apply the factors once for the capability they affect. Factors such as extra repositories and API versioning usually apply to the epic as a whole.
4. Write the total with the epic-level range (0.5 times to 2 times) and `level: epic`.
5. When the stories exist, estimate them again at story level. Keep the epic estimate as first written, and compare the two totals. The gap measures how much the plan changed.

## How the rubric fits the Epic 1 numbers

This table is a fit, not a test. The factors were chosen after the measured numbers were known, so it shows that the rubric can express them. The real test is the next epics.

| Story | Criteria | Base points (2.25 each) | Factors applied | Rubric points | Measured points |
|---|---|---|---|---|---|
| 1-3 list | 4 | 9 | documentation 0.75 | 10 | 10 |
| 1-4 placement | 6 | 13.5 | four coding tools 3 | 16.5 | 14 |
| 1-6 gate | 5 | 11.25 | many refusal paths 3 | 14.25 | 15 |
| 1-9 choose | 5 | 11.25 | interactive screens and a flag twin 1.5 | 12.75 | 13 |
| 1-10 docs | 4 | 9 | none | 9 | 9 |
| 1-7 guard | 4 | 9 | none | 9 | 2 |

Five of six land within about 20 percent. Story 1-7 misses by a wide margin because its criteria restate one guard.

## Review and calibration

A person reviews the estimates, and the rubric changes only by recalibration.

1. **Before the baseline,** a reviewer's comment can change an estimate. The baseline is the moment the work starts, or the moment the estimate is committed as the baseline. Log each change in the estimate's review notes: the date, the reviewer, the comment and the outcome (accepted, changed or kept).
2. **After the baseline,** a review comment is recorded and the original stays. An accepted change goes through "Recalibrating" in `SKILL.md`, and it is applied to the whole set.
3. **A review comment names a story and a direction:** "1-4: lower, the four tools are already in the base" or "2-2: higher, the lock interacts with record rewriting". Name the factor to add or remove when you can.
4. **After each epic,** compare estimates with the retrospective line-rate points for every story. Write the deltas in `anchors.md`. When three or more stories miss in the same direction by more than 30 percent, change the base or the factor that explains them, as a recalibration.
