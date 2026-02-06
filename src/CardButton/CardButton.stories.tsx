import React, { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { CardButton } from './CardButton';

type CardButtonProps = ComponentProps<typeof CardButton>;

const alignmentOptions: Array<NonNullable<CardButtonProps['alignment']>> = [
  'left',
  'center',
  'right',
];
const asOptions: Array<CardButtonProps['as']> = ['a', 'button'];
const sizeOptions: Array<NonNullable<CardButtonProps['size']>> = [
  'xs',
  'sm',
  'md',
  'lg',
  'full',
];

const meta: Meta<typeof CardButton> = {
  title: 'Components/CardButton',
  component: CardButton,
  tags: ['autodocs'],
  args: {
    alignment: 'center',
    as: 'button',
    size: 'md',
    children: (
      <>
        <strong>Start a project</strong>
        <div>Create a study in minutes</div>
      </>
    ),
  },
  argTypes: {
    alignment: {
      control: 'inline-radio',
      options: alignmentOptions,
    },
    as: {
      control: 'inline-radio',
      options: asOptions,
    },
    size: {
      control: 'select',
      options: sizeOptions,
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CardButton renders as either a link or button and is best used for ' +
          'navigation or short call-to-action cards.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardButton>;

export const Default: Story = {};

