import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import styled, { ThemeProvider } from 'styled-components';

import Button from 'src/Button';
import { participantTheme } from '../Theming/theme';

import mdx from './Button.mdx';

export default {
  title: 'Design System/Button',
  component: Button,
  decorators: [withKnobs({ escapeHTML: false })],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const StyledH3 = styled.h3`
    margin: 2rem 0;
    padding-bottom: .5rem;
    border-bottom: 1px solid #000;
`;

export const Default = () => (
  <>
    <StyledH3>Button Types</StyledH3>

    <h4 style={{ marginBottom: '2rem' }}>Primary aka Default</h4>

    <p>Very important actions that usually trigger a longer workflow.</p>

    <p>This button changes color based on set theme. All other buttons stay the same.</p>

    <br />
    <p><b>Base/researcherTheme Primary Button</b></p>

    <Button variant="primary">Primary</Button>
    <Button variant="outline-primary">Primary Outline</Button>
    <Button variant="ghost-primary">Primary Ghost</Button>
    <Button variant="embedded-primary">Primary Embedded</Button>

    <ThemeProvider theme={participantTheme}>
      <br />
      <br />
      <p><b>participantTheme Primary Button</b></p>

      <Button theme={participantTheme} variant="primary">Participant Primary</Button>
      <Button theme={participantTheme} variant="outline-primary">Participant Primary Outline</Button>
      <Button theme={participantTheme} variant="ghost-primary">Participant Primary Ghost</Button>
      <Button theme={participantTheme} variant="embedded-primary">Participant Primary Embedded</Button>
    </ThemeProvider>

    <h4 style={{ margin: '2rem 0' }}>Secondary used to be Tertiary Button</h4>

    <p>Currently only used for managing project drafts.</p>

    <Button variant="secondary">Secondary</Button>
    <Button variant="outline-secondary">Secondary Outline</Button>
    <Button variant="ghost-secondary">Secondary Ghost</Button>
    <Button variant="embedded-secondary">Secondary Embedded</Button>

    <h4 style={{ margin: '2rem 0' }}>Tertiary was Quatenary Button</h4>

    <p>Less important actions that are usually paired with Primary or Secondary buttons.</p>

    <Button variant="tertiary">Tertiary</Button>
    <Button variant="outline-tertiary">Tertiary Outline</Button>
    <Button variant="ghost-tertiary">Tertiary Ghost</Button>
    <Button variant="embedded-tertiary">Tertiary Embedded</Button>

    <h4 style={{ margin: '2rem 0' }}>Delete Button</h4>

    <p>Used to indicate destructive actions.</p>

    <Button variant="delete">Delete</Button>
    <Button variant="outline-delete">Delete Outline</Button>
    <Button variant="ghost-delete">Delete Ghost</Button>
    <Button variant="embedded-delete">Delete Embedded</Button>

    <StyledH3>Button Styles</StyledH3>

    <h4 style={{ margin: '2rem 0' }}>Default</h4>

    <p>Indicates a high emphasis action.</p>

    <Button variant="primary">Researcher Primary</Button>
    <Button theme={participantTheme} variant="primary">Participant Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
    <Button variant="delete">Delete</Button>

    <h4 style={{ margin: '2rem 0' }}>Outline</h4>

    <p>Indicates a medium-emphasis action that is usually paired with a Default button.</p>

    <Button variant="outline-primary">Primary Outline</Button>
    <Button theme={participantTheme} variant="outline-primary">Participant Primary Outline</Button>
    <Button variant="outline-secondary">Secondary Outline</Button>
    <Button variant="outline-tertiary">Tertiary Outline</Button>
    <Button variant="outline-delete">Delete Outline</Button>

    <h4 style={{ margin: '2rem 0' }}>Ghost</h4>

    <p>Indicates a low-emphasis action that is usually paired with a Default or Outline button.</p>

    <Button variant="ghost-primary">Primary Ghost</Button>
    <Button theme={participantTheme} variant="ghost-primary">Participant Primary Ghost</Button>
    <Button variant="ghost-secondary">Secondary Ghost</Button>
    <Button variant="ghost-tertiary">Tertiary Ghost</Button>
    <Button variant="ghost-delete">Delete Ghost</Button>

    <h4 style={{ margin: '2rem 0' }}>Embedded</h4>

    <p>Indicates a low-emphasis action that is usually paired with a Default or Outline button.</p>

    <Button variant="embedded-primary">Primary Embedded</Button>
    <Button theme={participantTheme} variant="embedded-primary">Participant Primary Embedded</Button>
    <Button variant="embedded-secondary">Secondary Embedded</Button>
    <Button variant="embedded-tertiary">Tertiary Embedded</Button>
    <Button variant="embedded-delete">Delete Embedded</Button>
  </>
);
