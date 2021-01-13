# 🌤️ What is the goal of the design system?

The goal of the design system is to achieve visual and experiential consistency throughout the app while streamlining the design and implementation process. The design system should contain all reusable components, one-off variations, and guidelines that are used to build up the existing and future screens of our application. It should direct us to be mindful of when we're consciously diverging from the established system. 

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

# Future additions to this document

## ⚙️ How do we update the design system?

This would include technical details on best practices for updating the design system

## 🚪 How do we plan design releases?

How do we document what's in each release?

How do we determine whether it's a major, minor, or patch release?


# Developer Resources

## Available Scripts
In the project directory, you can run:

### `yarn storybook`

Launches the Storybook server.<br />

### `yarn install`

Installs all yarn dependencies

### `yarn test`

Runs the jest test suite

### `yarn lint`

Runs ESLint to report on any style violations

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
 * Request a review from at least one designer.
 * Anyone should feel free to leave feedback on any PR, even if your review was not specifically requested.
 * As the developer who opened the PR, please be sure to respond to all feedback, even if just to say that you had considered it but did not make a corresponding change.

## Merge process

Once your pull request has been approved by all parties, you may begin the merge process:
* Merge in the latest `master` and resolve any conflicts if needed.
* Run `yarn lint` to ensure no new styling errors are returned.
* Run `yarn test` to ensure tests are passing.
* Click the Squash and merge button on your pull request and edit your commit message to a concise description of your changes.
