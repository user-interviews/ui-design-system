# User Interviews Design System

![User Interviews Logo](https://user-images.githubusercontent.com/37383785/214649126-a2d75ddc-cf6d-4be0-8636-5f6182a3bc41.png)


# 🌤️ What is the goal of the design system?

The goal of the design system is to achieve visual and experiential consistency throughout the User Interviews app while streamlining the design and implementation process. The design system should contain all reusable components, one-off variations, and guidelines that are used to build up the existing and future screens of our application. It should direct us to be mindful of when we're consciously diverging from the established system.


## Contributing

The Design System tech lead and Product Designers are the main decision makers & implementers for the system, but we welcome everyone's contributions or suggestions. We meet on a weekly basis and are continuously prioritizing updates while also supporting the needs of our product teams.

## Storybook Documentation

<a href='https://docs.userinterviews.com/?path=/story/intro--page'>
  <img src='https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white' alt='Storybook logo'/>
</a>

- For every component, we typically illustrate common use cases for different variants or states of a component.
- Documentation lives in `Component.mdx` which references stories defined in `Component.stories.jsx`. See documentation style here in [Stories with arbitrary MDX](https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/recipes.md#csf-stories-with-arbitrary-mdx).
- Check out our [Storybook Notion Doc](https://www.notion.so/userinterviews1/Storybook-9a3585db57514ec783e39c78518ad5e6) for examples. You can find our current documentation template that we try to follow for all of our `mdx` files in that Notion doc.
-  We encourage all contributors to the Design System (engineers, designers, product) to add to our documentation.


## Steps to update any documentation file

### `yarn install`

Installs all yarn dependencies

### `git checkout -b chore/UIDS-###-update-some-component-documentation`

In your terminal, check out a new branch locally for you to make changes. You should have a Github issue to track that corresponds to the branch name.

### `yarn storybook`

Launches the Storybook server.<br />

- In the code editor of your choice, navigate to the Component library found under src `ui-design-system/src`
- Open any `Component.mdx` file (e.g. `Alert.mdx`) that you want to edit. These are markdown files. See [markdown docs](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) for additional how-to.
- While Storybook is running, you should be able to view any changes you make to the `mdx` file after saving your changes.
- Push your changes to Github and submit for a review / pull request.

If you need any help with setup or have questions about the process of writing documentation, feel free to reach out to a developer or a member of the Design System team.


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

1. Add `RAILS_SERVER_PATH` to a `.env` of this application
  *this will be the path to rails-server in your local machine*
1. Run these commands inside the root of the DS repo:

````bash
  yarn rs:link
  # or using nodemon
  yarn rs:link:watch
````

💡 at this point you should see a nodemon process running

### Wrapping up development

1. Run these commands inside the root of the DS repo:

````bash
  yarn rs:unlink
````
