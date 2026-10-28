# Recording estimates in Jira

Read this when the skill says to record in Jira.
The facts below were checked on the UserTesting site (`user-testing.atlassian.net`, project RAD) on 2026-10-04.
Verify a field id with the discovery step before trusting it, because fields change.

## Discover

- Fields on a sub-task: `GET /rest/api/3/issue/<key>/editmeta`. Read the field names. Story Points and Time tracking appear on RAD sub-tasks.
- Field ids: `GET /rest/api/3/field`, filtered to names containing "Story Points", "Estimate" or "Time tracking".
- Several look alike: `customfield_10026` is **Story Points** (use this one), `customfield_10016` is "Story point estimate", `customfield_10452` is "Estimated Size" (a string) and `customfield_13069` is "Original Estimated Points (migrated)". Do not use the others unless a person asks.

## Set the estimate

- Set only the points: `{"customfield_10026": <points>}`. Do not set `timetracking`.
- Why: an Automation for Jira rule sums the sub-tasks' Original estimates into the parent's Original estimate and emails watchers on every change, and a time estimate displays an epic as weeks or months. On 2026-10-05 the author asked for points only, and the estimates already set were cleared with `{"update": {"timetracking": [{"edit": {"originalEstimate": "", "remainingEstimate": ""}}]}}` through `/rest/api/3/issue/<key>`. The parents returned to 0 within seconds.
- The call returns the whole issue, which is long. Read the result back with a small query instead: `GET /rest/api/3/search/jql` with `jql=parent = <parent key>`, `fields=customfield_10026,timetracking`, and a `jq` filter.

## Change a description

- A description update replaces the whole description. Read it first with `getJiraIssue` (`responseContentFormat` markdown), change only the section you mean to, and send it all back with `contentFormat` markdown.
- A description that holds a smart link (an inline card) can lose it in a markdown round trip. For that case send ADF through `jira_put` on `/rest/api/3/issue/<key>`, which keeps the link.

## Comments

- Use `addCommentToJiraIssue` with `contentFormat` markdown. It supports `commentId`, which updates an existing comment in place.
- Keep one living comment per epic for the progress table and update it by id as stories finish. Record its id in the spec folder's `estimates.md`.
- Markdown tables render. Use plain words in headers.
- The Story Points field holds the current number, and the comment holds the same number with the per-story detail. The Original estimate field stays empty.

## Do not

- Do not move an issue through its workflow (status transitions) unless a person asks.
- Do not put estimates on anything but the epic sub-task. Stories in this project have no tickets.
- Do not edit the Story Points or Original estimate of a finished epic, except in a recalibration (see `SKILL.md`). Add a dated comment instead, and keep the earlier version in its comment.
