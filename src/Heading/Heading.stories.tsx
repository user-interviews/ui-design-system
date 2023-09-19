import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Heading from './Heading';

const meta: Meta<typeof Heading> = {
  component: Heading,
  parameters: {
    docs: {
      description: {
        component: 'Headings are used as the titles of each major section of a page in the interface.'
      },
    }
  },
  title: 'Components/Heading',
};

export default meta;
type Story = StoryObj<typeof Heading>;

/** 
  A default `Heading` as a level `2` with size `xxl` and weight `bold`
*/ 
export const Default: Story = {
  args: {
    children: 'The fastest way to recruit research participants'
  },
};

/** 
  Use the appropriate heading level to create hierarchy on the page.

  Adjust the font `size` with the available sizes:

  `xxxl`, `xxl`, `xl`, `lg`, `md`, `sm`, `xs` 

  #### Best practices:

  **DO**
  - Use one unique `h1` per page that describes what that page is about, preferably starts just above the main content.

  **DON'T**
  - Do not choose a heading by its size, but by its level in the context of the content.
  - Do not skip a heading level from the top down. 

  #### Accessibility

  **Summary:** 
  - Use headings to describe content and use them consistently and semantically. This will help all users to better find the content they are looking for.
  - Font weight and size may be changed from `Heading` defaults as long as the semantic hierarchy is correct.


  **WCAG2 AA success criteria:**

  - [Success Criterion: 2.4.6 Headings and labels.](https://www.w3.org/WAI/WCAG21/quickref/#headings-and-labels) Provide ways to help users navigate, find content, and determine where they are. Headings and labels describe topic or purpose.
  - [Success Criterion: 3.2.3 Consistent Navigation Level.](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=246#consistent-navigation) Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.
  - [Success Criterion: 1.3.1 Info and Relationships.](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=246#info-and-relationships) Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text. In other words: if it looks like a heading, it should be a heading in the HTML (and not for example text made bold).
*/ 
export const Levels: Story = {
  render: () => (
    <>
      <Heading level={1} size="xxxl" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={2} size="xxl" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={3} size="xl" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={4} size="lg" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={5} size="md" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={6} size="sm" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={6} size="xs" weight="bold">The fastest way to recruit research participants</Heading>
    </>
  )
}

/**
  Use to give heading one of the supported font weights:

  `bold`, `medium`, or `regular`
*/
export const Weights: Story = {
  render: () => (
    <>
      <Heading level={2} size="xxl" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={2} size="xxl" weight="medium">The fastest way to recruit research participants</Heading>
      <Heading level={2} size="xxl" weight="regular">The fastest way to recruit research participants</Heading>
    </>
  )
}

/**
  Use to set heading alignment:

  `left`, `center`, or `right`
*/
export const Alignment: Story = {
  render: () => (
    <>
      <Heading level={2} size="xxl" textAlign="left" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={2} size="xxl" textAlign="center" weight="bold">The fastest way to recruit research participants</Heading>
      <Heading level={2} size="xxl" textAlign="right" weight="bold">The fastest way to recruit research participants</Heading>
    </>
  )
}
