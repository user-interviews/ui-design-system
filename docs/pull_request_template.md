[//]: # (
See https://www.notion.so/Expectations-for-Code-Reviews-4c261233caf64f12ab459ba090be2c50 for more best practices around how we do Code Review.
This is a default pull request template that teams can use as a starting point.
You can edit this here: docs/pull_request_template.md
)
### Related Issue(s)

Closes:

### Description
[//]: # (
Provide a brief description of the intent of this pull request.
Example: Allow users to search for a specific product by name.
)


### Reviewers
[//]: # (
Indicate who your primary and secondary reviewers are, and make sure they know.
Do this AFTER you have done your own self-review.
)

Primary:

Secondary:


### Summary of Changes
[//]: # (
Provide a list of the major areas of change or screenshots and provide context that makes it easier to understand what is going on when first reading the code.
Think big picture, don't just replicate the *Files changed* tab or feel the need to have an item for each file changed if there are natural groupings, like adding a controller action and a route, or a view and a component.
The purpose is to call out anything you found confusing while developing, or that might not be obvious. What would you want a heads up about if you were the reviewer? If you were pairing what would you call out at the start of the call?
If there is something you're unsure about or need clarification on, then include your questions alongside the relevant topic.
)


### Manual Test plan
[//]: # (
How did you test this manually? How can your reviewer test the workflow?
If this is a bug, how can you reproduce the bug?
)

### Jest Test Coverage
[//]: # (
If this PR includes frontend changes, please run the tests covering the changes and copy/paste the table from
the console output into the space provided below - our goal is to maintain 80%+ **branch** coverage.
**Example console command** - copy/paste and replace with your component's name and directory:
`yarn test component_name_spec --coverage --collectCoverageFrom=app/javascript/path/to/component_name.tsx`
)
```javascript
# Example output format
---------------------------------------|---------|----------|---------|---------|-------------------
  File                                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------------------------|---------|----------|---------|---------|-------------------
```

### Checklist
[//]: # (
Please review and check off the following items before moving the pull request from draft to ready for review
~~Strike through~~ any items that are not applicable to this pull request.
)

- [ ]  **Perform self review**: Perform a self-review of your pull request and point out concerns and/or questions to reviewers in the summary above or as GitHub comments. Try to do this before tagging people as assignees and reviewers, to reduce Github notification noise.
- [ ]  **Tests**: Ensure that all tests are passing and that new tests have been added to cover any new functionality. See [helpful testing best practices](https://www.notion.so/user-interviews/Helpful-Testing-Tricks-d1d44096d042463a82aff7bc59705ca2?pvs=4).

**Frontend**
- [ ]  **Accessibility**: Check that the application meets accessibility standards, such as proper semantic HTML, keyboard navigation, and screen reader compatibility. See [Accessibility document](https://www.notion.so/user-interviews/Accessibility-3b755f2931ad43a79d40b215f09c8995) for more details.
- [ ]  **Cross-browser compatibility**: Test the application in multiple browsers to ensure consistent behavior and appearance across different platforms. See [Supported browsers document](https://www.notion.so/user-interviews/Supported-browsers-b816bf4f094c4ea981af224f4f85c03d) for more details.
- [ ]  **Mobile responsiveness**: Confirm that the application looks and functions well on various screen sizes and devices, adjusting layout and functionality as needed. See [Mobile responsiveness document](https://www.notion.so/user-interviews/Testing-for-mobile-responsiveness-30399f44c5fb48f9ba443cc00b7a823f) for more details.
