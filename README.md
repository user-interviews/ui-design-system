# 🌤️ What is the goal of the design system?

The goal of the design system is to achieve visual and experiential consistency throughout the app while streamlining the design and implementation process. The design system should contain all reusable components, one-off variations, and guidelines that are used to build up the existing and future screens of our application. It should direct us to be mindful of when we're consciously diverging from the established system.

## References and inspiration
- [Carbon - IBM](https://www.carbondesignsystem.com/)
- [Material Design](https://material.io/design)
- [Primer - Github](https://primer.style/)
- [Ant Design](https://ant.design/)

# Updating

## 🕰️ When do we update the design system?

💚 **Scenario: We need a new component in the design system that is already in the Figma DS, and adding the new component is straightforward and will not significantly affect timeline of the effort.**

We should go ahead and add the new component into Storybook and use the new component in the design.

⏲️ **Scenario: We need a new component in the design system that is already in the Figma DS, but adding the new component will affect timeline for the effort.**

We should build the component in a way that will allow for simple transfer into the design system.  Adding the component into the design system should be a follow-on task immediately after the effort.

🧠 **Scenario: We have a situation where a new component would improve the usability of our design, but it is not yet defined in the Figma DS or in Storybook.**

These often pop up in the #design-review channel and decisions will depend on designer and development bandwidth. We should strive to make considered designs that continue to push the usability of our app forward while building brand consistency. If there is alignment on a design need, we should add the new component or variation to the Figma DS and add the new component into the design system. If we do not have bandwidth to align on a new design and add the variation to the design system, we should do the best we can with existing patterns.

## Who makes design system decisions?

Designers can make proposals to update the design system at any point. These changes are submitted to #design-review, and other designers can weigh in with thoughts. There should be a general consensus on why and how the design system should be changed to better suit our needs. Wen is responsible for weighing input and proposing a path forward, looping in JH when necessary.

On the development side, Dave and Rachel oversee how components are organized and implemented to be put into use most effectively.

## How do we decide whether something is one-off or when the component should be updated universally?

Development-wise, I think we should always strive for universal changes if components are being updated. However, some changes are easily made with confidence that we won't cause issues with the app, while others will require more QA.

### Safe to update:

- Colors
- Elevation
- Icon changes of the same size

### Need to QA

- Margins and padding
- Font spacing
- Component sizes

## How can we include time for updating components during cycle work?

Keeping the design system relevant is important for consistency in our app. Core product requirements should still take priority, but we should make the design system updates necessary for each effort before tackling nice-to-haves.

## ✏️ How do we write stories and documentation?

- For every component, we typically separate each variant out into its own story that gets exported.
- Documentation lives in `Component.mdx` which references stories defined in `Component.stories.jsx`. See documentation style here in [Stories with arbitrary MDX](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx).
- See our [Storybook Notion Doc](https://www.notion.so/userinterviews1/Storybook-9a3585db57514ec783e39c78518ad5e6) for examples. You can find our current documentation template that we try to follow for all of our `mdx` files in that Notion doc. 

## Who can update documentation?

- Anyone! We encourage all contributors to the Design System (engineers, designers, product) to add to our documentation. 

## Steps to update any documentation file

After cloning the repo, obtain a `.npmrc` file from another developer. This file contains authorization tokens for any private
node packages.

### `git checkout -b chore/UIDS-###-update-some-component-documentation`

In your terminal, check out a new branch locally for you to make changes. You should have a Github issue to track that corresponds to the branch name. 

### `yarn install`

Installs all yarn dependencies

### `yarn storybook`

Launches the Storybook server.<br />

- In the code editor of your choice, navigate to the Component library found under src `ui-design-system/src` 
- Open any `Component.mdx` file (e.g. `Alert.mdx`) that you want to edit. These are markdown files. See [markdown docs](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) for additional how-to.
- While Storybook is running, you should be able to view any changes you make to the `mdx` file after saving your changes. 
- Push your changes to Github and submit for a review / pull request. 

If you need any help with setup or have questions about the process of writing documentation, feel free to reach out to a developer or a member of the Design System team. 

# Future additions to this document

## ⚙️ How do we update the design system?

This would include technical details on best practices for updating the design system

## 🚪 How do we plan design releases?

How do we document what's in each release?

How do we determine whether it's a major, minor, or patch release?


# Developer Resources

## Initial Setup
After cloning the repo, obtain a `.npmrc` file from another developer. This file contains authorization tokens for any private
node packages.

## Available Scripts
In the project directory, you can run:

### `yarn storybook`

Launches the Storybook server.

### `yarn install`

Installs all yarn dependencies

### `yarn test`

Runs the jest test suite

### `yarn lint`

Runs ESLint to report on any style violations

### `yarn rs:link`

Creates symlinks for packages needed to develop/debug against our `rails-server` repository.

### `yarn rs:link:watch`

Trigger a production build when files are changed.

### `yarn rs:unlink`

Remove symlinked packages.

## Chromatic visual testing & live feedback
We use [Chromatic](https://www.chromatic.com/) for visual testing and gathering UI feedback. 

To join Chromatic for 'ui-design-system', ask Jason for the join link.

If you are a Product Designer or wanting to view changes on a particular feature branch, a developer can provide a link to that specific Chromatic build. 

If you are a Developer and want to trigger a Chromatic build,
  1. Join Chromatic for the 'ui-design-system' (ask Jason for the join link).
  2. Go to the Manage tab for 'ui-design-system' > Configure > Find the project token.
  3. In your terminal, run `npx chromatic --project-token <projectToken>`. Use this command when you want to create a build and share with a stakeholder to gather UI feedback. You will be able to find the build on the Chromatic builds dashboard. We currently run automatic nightly builds for Chromatic via Github Actions. 

## Pull requests

Our branch names consist of 3 parts:
1. The type of task we are working on (one of the list below)
    * bug
    * chore
    * feature
    * hotfix
    * research
1. The Github issue number prefixed with UIDS (e.g. UIDS-123)
1. A short description of the task to be done (e.g. improve-documentation)

An example of this would be `feature/UIDS-123-improve-documentation`

When you are ready for feedback:
 * Request a review from at least one senior developer.
 * Request a review from at least one designer if your PR has user-facing changes.
 * Anyone should feel free to leave feedback on any PR, even if your review was not specifically requested.
 * As the developer who opened the PR, please be sure to respond to all feedback, even if just to say that you had considered it but did not make a corresponding change.

## Merge process

Once your pull request has been approved by all parties, you may begin the merge process:
* Merge in the latest `master` and resolve any conflicts if needed.
* Run `yarn lint` to ensure no new styling errors are returned.
* Run `yarn test` to ensure tests are passing.
* Click the Squash and merge button on your pull request and edit your commit message to a concise description of your changes.

## Release process

This repository follows the [git flow release process](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).
* Each new feature branch uses develop as its parent branch and is merged back into develop upon completion.
* Each new hotfix branch uses main as its parent branch and is merged directly into main.

This package uses [Semantic versioning](https://semver.org/), which requires version numbers in MAJOR.MINOR.PATCH format. Any breaking changes to the API require an update to the MAJOR version. Backwards compatible changes only require an update to the MINOR version. Hotfixes and patches need only update the PATCH version.

To create a new release off of the current develop:
* Run the "Prepare release" github action which will
  * Create a new release branch off of the latest develop and increment package.json
  * Create a pull request of the release branch against main
  * Create a pull request of the release branch against develop
  * From there the developer can merge the PRs via github
* Run the "Create new release" github action which will build the project and create a new release off of the latest main

To create a patch release for a hotfix off the current main:
* Run the "Prepare hotfix" github action which will
  * Create a hotfix off the latest main and increment package.json
  * Create a pull request of the hotfix branch against main
  * Create a pull request of the release branch against develop
  * From there the developer can merge the PRs via github
* Run the "Create new release" github action which will build the project and create a new release off of the latest main

## Manual Release steps

If you are not able to or choose not to use the github actions described above, the following is the process to manually create a new release. Once you have commits ready to bundle you may begin the release process:
* Update the "version" field in package.json.
* Run `yarn build` to compile the source files and write out to the lib directory.
* Run `npm pack` to archive all of the source files. Note: you can run `npm pack --dry-run` to see a list of files that will be included in the package. This is useful to double check a new component is being added or to see the size of the package/individual files.
* Run `npm publish` to publish the package to Github's registry.
* Draft a new release in the Github [repo](https://github.com/user-interviews/ui-design-system/releases).
* Use the version number from package.json in the "Tag version" field.
* Run `git log $(git describe --tags --abbrev=0)..HEAD --oneline` to get a list of all commits since the latest release and copy these into the "Describe this release" field.
* Upload the binary that was created from running `npm pack`.
* Publish release.

## Developing against the Rails Server repo

### Starting up development
1. run these commands inside the root of the DS repo:
````bash
  yarn rs:link && yarn rs:link:watch
````
💡 at this point you should see a nodemon process running

2. run these commands inside the root of the RS repo:
````bash
  bin/link-ds
````
### Wrapping up development
1. run these commands inside the root of the RS repo:
````bash
  bin/unlink-ds
````
2. run these commands inside the root of the DS repo:
````bash
  yarn rs:unlink
````

#### 🤔 Snags
- you'll have to manually refresh your browser tab, after the automatic refresh, to see your expected changes.
