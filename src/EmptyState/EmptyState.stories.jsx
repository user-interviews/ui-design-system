import React from 'react';

import { faPlus } from '@fortawesome/pro-regular-svg-icons';

import Button from 'src/Button';

import EmptyState from './EmptyState';
import mdx from './EmptyState.mdx';

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => <EmptyState {...args} />;

Default.args = {
  subtitle: 'Launch your first project to start conducting research!',
  title: 'You have no projects',
};

export const PrimaryAction = (args) => <EmptyState {...args} />;

PrimaryAction.args = {
  primaryAction: <Button leadingIcon={faPlus} variant="primary">New project</Button>,
  subtitle: 'Launch your first project to start conducting research! Source from a pool of 2.4 million participants to reach nearly any target audience.',
  title: 'You have no projects',
};

export const FullWidth = (args) => <EmptyState {...args} />;

FullWidth.args = {
  fullWidth: true,
  primaryAction: <Button leadingIcon={faPlus} variant="primary">New project</Button>,
  subtitle: 'Launch your first project to start conducting research! Source from a pool of 2.4 million participants to reach nearly any target audience.',
  title: 'You have no projects',
};

export const MarginTop = (args) => <EmptyState {...args} />;

MarginTop.args = {
  marginTop: 'sm',
  subtitle: 'Add a new participant segment above',
  title: 'No segments created',
};
