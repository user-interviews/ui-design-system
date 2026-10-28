# The materiality test

The `scan` and `read` modes apply this test to every finding before reporting it.
A finding comes from a local reviewer, a review thread, an inline comment, or a review body.

Ask three questions in order:

1. Does the finding describe behavior that changed because of this diff?
   That includes a changed contract at a call site the diff did not touch, and behavior the diff removed or replaced.
   A condition the diff left alone answers no, and the finding is advisory (pre-existing).
2. Would the described failure produce a wrong output, a crash, a test failure, or a security or data issue if the diff shipped as it is?
   A no makes the finding advisory (cosmetic or speculative).
3. Can you point to, or construct, a concrete input or state that shows the failure?
   A no makes the finding advisory (unconfirmed).

Three yes answers make the finding material.
One no makes it advisory.

Every verdict names the question that decided it.
For a material finding, that is the answer to question 3, with the input or state.
For an advisory finding, that is the first question answered no.

Advisory means the finding may be right and is not part of this diff's defects.
The mode reports it and the human decides what to do with it.

When two reviewers disagree about the same location, apply the three questions yourself.
Disagreement never breaks the tie.

## Check the location against the diff

A reviewer can comment on a file the pull request never touched.
When the input includes `changed_files`, look up each finding's path there before question 1.
A path that is absent from the list cannot describe behavior this diff changed, unless the finding names a changed contract at that call site.
Report `in_changed_files: no` and answer question 1 on that evidence.

## Two worked examples

- **Material.** "This new function has no test covering its error path."
  The function is new code in this diff, so question 1 is yes.
  An unhandled error path can crash or misbehave, so question 2 is yes.
  Calling the function with the error-inducing input demonstrates it now, so question 3 is yes.
  The finding is material.
- **Advisory, unconfirmed.** "This retry loop could spin forever under a pathological network condition nothing here reproduces."
  Question 1 is yes and question 2 is arguably yes.
  Question 3 is no, because no concrete input is named and building one means inventing a scenario.
  The finding is advisory (unconfirmed).
