import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Avatar from '.';

const colorIds: Array<number | undefined> = [undefined, 1, 2, 3, 4, 5, 6];

const renderColorVariants = (args: React.ComponentProps<typeof Avatar>) => (
  <div>
    {colorIds.map((colorId) => (
      <Avatar
        key={`color-${colorId ?? 'default'}`}
        {...args}
        colorId={colorId}
      />
    ))}
  </div>
);

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays a user\'s initials or profile photo.',
      },
    },
  },
  argTypes: {
    colorId: {
      control: { type: 'number', min: 0, step: 1 },
    },
    image: {
      control: 'text',
    },
    initials: {
      control: 'text',
    },
    large: {
      control: 'boolean',
    },
    showAlert: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Small: Story = {
  args: {
    initials: 'RR',
  },
  render: (args) => renderColorVariants(args),
};

export const Large: Story = {
  args: {
    initials: 'RR',
    large: true,
  },
  render: (args) => renderColorVariants(args),
};

export const WithAlert: Story = {
  args: {
    initials: 'RR',
    showAlert: true,
  },
  render: (args) => (
    <div>
      <Avatar {...args} large />
      <Avatar {...args} />
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    image: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_6.png',
    initials: 'RR',
  },
  render: (args) => (
    <div>
      <Avatar {...args} large />
      <Avatar {...args} />
    </div>
  ),
};
