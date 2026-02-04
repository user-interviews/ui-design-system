import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import uiLogo from './ui_logo.svg';
import { Logo } from './Logo';
import * as styles from './Logo.stories.module.css';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={styles.alignmentFrame}>
        <Story />
      </div>
    ),
  ],
  args: {
    alt: 'User Interviews',
    alignment: 'center',
    src: uiLogo,
  },
  argTypes: {
    alignment: {
      control: 'inline-radio',
      options: ['center', 'flex-start', 'flex-end'],
      description: 'Alignment of the logo within the container.',
    },
    alt: {
      control: 'text',
      description: 'Accessible text for the image.',
    },
    src: {
      control: 'text',
      description: 'Image source URL or data URI.',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Brand mark used in headers, email templates, and product surfaces. ' +
          'Provide an accessible `alt` value that matches the usage context.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LeftAligned: Story = {
  args: {
    alignment: 'flex-start',
  },
};

export const RightAligned: Story = {
  args: {
    alignment: 'flex-end',
  },
};

export const CustomAltText: Story = {
  args: {
    alt: 'User Interviews logo, light background',
  },
};

