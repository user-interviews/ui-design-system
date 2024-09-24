import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from 'src/font_awesome/regular';

import Button from '../Button';

import ProfileSearchImage from './profile_search.png';

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
    primaryAction: <Button leadingIcon={faPlus as IconDefinition} variant="primary">New project</Button>,
    subtitle: 'Launch your first project to start conducting research! Source from a pool of 2.4 million participants to reach nearly any target audience.',
    title: 'You have no projects',
  },
};

export const Image: Story = {
  args: {
    image: ProfileSearchImage,
    primaryAction: <Button variant="primary">Start recruiting</Button>,
    subtitle: `Start recruiting from User Interviews' panel of 6M+ users and kick off your research!`,
    title: 'No participants to display',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    primaryAction: <Button leadingIcon={faPlus as IconDefinition} variant="primary">New project</Button>,
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
