# Synthesis Design System 

![Synthesis Design System](https://github.com/user-attachments/assets/28a8a899-c05e-48f6-ab15-f17d6414d868)


Synthesis is the official design system of [User Interviews](https://www.userinterviews.com/). It offers design guidelines and reusable components to streamline the creation of product features, focusing on usability, accessibility, and efficiency while enhancing teamwork. 

[Public Storybook Documentation](https://docs.userinterviews.com/)

[Synthesis Figma](https://www.figma.com/design/dmmTbSjuPXqt9m82YaewXO/Synthesis-Design-System?node-id=5-3&t=ohykAoJ8olM5Y95z-0)

## Table of Contents
- [Getting started](#getting-started)
  - [Initial setup](#initial-setup)
  - [Available scripts](#available-scripts)
  - [Developing against rails-server](#developing-against-rails-server)
  - [Pull requests](#pull-requests)
- [Contributing](#contributing)
  - [Slack channels](#slack-channels)
  - [Open a Linear issue](#open-a-linear-issue)
  - [Flag @user-interviews/design-system](#flag-user-interviews/design-system)
- [Storybook development (Under construction 🚧)](#storybook-development)
- [Chromatic visual testing (Under construction 🚧)](#chromatic-visual-testing)
- [Release process](#release-process)

## Getting started

### Initial Setup
After cloning the repo, obtain a `.npmrc` file from another developer. This file contains authorization tokens for any private
node packages.

### Available Scripts
_In the project directory, you can run:_

`yarn storybook`
_Launches the Storybook server._

`yarn install`
_Installs all yarn dependencies._

`yarn test`
_Runs the jest test suite._

`yarn lint`
_Runs ESLint to report on any style violations._

`bin/migrate-stack`
_Installs specific Node.js and Yarn versions with Volta, creates a .env file, and adds an FONTAWESOME_NPM_AUTH_TOKEN to it._

### Developing against `rails-server`

It is often helpful to see how new updates on the design system are consumed in-app by locally linking the two repositories.

Add `RAILS_SERVER_PATH` to a `.env` of this application
_This will be the path to rails-server in your local machine._

`yarn rs:link`
_Creates symlinks for packages needed to develop/debug against our `rails-server` repository._

`yarn rs:link:watch`
_Trigger a production build when files are changed._

`yarn rs:unlink`
_Remove symlinked packages when you're finished._

### Pull requests

We merge directly into `main` and your branch name should correspond to a Linear issue on the [UI Design System Updates](https://linear.app/user-interviews/project/ui-design-system-updates-4cb25d4fd32e/overview) project. You will need at least 1 approval from a senior engineer or an engineer on the core team. Be sure to also loop in your product designer if there are user facing changes.


## Contributing

The design system teams consists of engineers and product designers work together to make decisions and implement changes for Synthesis. We meet regularly to continuously prioritize updates while also supporting the needs of our product teams. We welcome everyone to share their feedback about the design system and make contributions to this repository. Below are some ways you can help!

### How you can help

#### Slack channels

We have a couple Slack channels where you can discuss all things design system or share your feedback
- [#dev-design-system](https://userinterviews.slack.com/archives/C06J56K92EL) _General channel for design system topics_
- [#ds-gardening](https://userinterviews.slack.com/archives/G01P02LNJTF) _Core design system team channel. All are welcome!_

#### Open a Linear issue

We use Linear as our project management tool to track all our design system issues.

Whether you're adding an issue to our [UI Design System Updates](https://linear.app/user-interviews/project/ui-design-system-updates-4cb25d4fd32e/overview) Linear board, or any other project on Linear, be sure to add the tag `Design system` on any issue you open up so that our team has visibility and can provide guidance if needed.

#### Flag @user-interviews/design-system

If you want to flag anything design system related on any PR you're working on or have questions/suggestions, you can tag @user-interviews/design-system and we will help out!


## Storybook development (Under construction 🚧)

<a href='https://docs.userinterviews.com/?path=/docs/intro--docs'>
  <img src='https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white' alt='Storybook logo'/>
</a>

## Chromatic visual testing (Under construction 🚧)

We use [Chromatic](https://www.chromatic.com/) for visual testing and gathering UI feedback.

To join Chromatic for 'ui-design-system', ask the design system lead for the join link.

If you are a Product Designer or wanting to view changes on a particular feature branch, a developer can provide a link to that specific Chromatic build.

If you are a Developer and want to trigger a Chromatic build,
  1. Join Chromatic for the 'ui-design-system' (ask Jason for the join link).
  2. Go to the Manage tab for 'ui-design-system' > Configure > Find the project token.
  3. In your terminal, run `npx chromatic --project-token <projectToken>`. Use this command when you want to create a build and share with a stakeholder to gather UI feedback. You will be able to find the build on the Chromatic builds dashboard. We currently run automatic nightly builds for Chromatic via Github Actions.


## Release process

This package uses [Semantic versioning](https://semver.org/), which requires version numbers in MAJOR.MINOR.PATCH format. Any breaking changes to the API require an update to the MAJOR version. Backwards compatible changes only require an update to the MINOR version. Hotfixes and patches need only update the PATCH version.

To create a new release off of `main`:
* Run the "Create new release" github action found under "Actions"
* Click "Run workflow" and select the following:
  * Choose `main` as the branch
  * Select the version you want to release
* This will build the project and create a new release off of the latest `main`

By this point, the updates should be published to Storybook and you will be able to consume the package on `rails-server`. You can grab the package by clicking on "Releases" tab and double-clicking on the package (e.g. user-interviews-ui-design-system-3.5.0.tgz) and copying the link.
