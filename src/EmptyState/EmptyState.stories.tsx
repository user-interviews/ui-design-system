import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { faPlus } from '@fortawesome/pro-regular-svg-icons';

import Button from 'src/Button';

import EmptyState from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  title: 'Components/EmptyState',
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    subtitle: 'Launch your first project to start conducting research!',
    title: 'You have no projects',
  },
};

export const PrimaryAction: Story = {
  args: {
    primaryAction: <Button leadingIcon={faPlus} variant="primary">New project</Button>,
    subtitle: 'Launch your first project to start conducting research! Source from a pool of 2.4 million participants to reach nearly any target audience.',
    title: 'You have no projects',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    primaryAction: <Button leadingIcon={faPlus} variant="primary">New project</Button>,
    subtitle: 'Launch your first project to start conducting research! Source from a pool of 2.4 million participants to reach nearly any target audience.',
    title: 'You have no projects',
  },
};

export const MarginTop: Story = {
  args: {
    marginTop: 'sm',
    subtitle: 'Add a new participant segment above',
    title: 'No segments created',
  },
};
