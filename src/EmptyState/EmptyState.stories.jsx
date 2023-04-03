import React from 'react';

import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Button from 'src/Button';

import EmptyState from './EmptyState';
import mdx from './EmptyState.mdx';
import documentIcon from './document-icon.png';

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <EmptyState
    subtitle="Launch your first project to start conducting research!"
    title="You have no projects"
  />
);

export const Illustrations = () => (
  <EmptyState
    imageSrc={documentIcon}
    subtitle="Launch your first project to start conducting research!"
    title="You have no projects"
  />
);

export const PrimaryAction = () => (
  <EmptyState
    imageSrc={documentIcon}
    primaryAction={<Button leadingIcon={faPlus} variant="primary">New project</Button>}
    subtitle="Launch your first project to start conducting research!"
    title="You have no projects"
  />
);

export const SecondaryAction = () => (
  <EmptyState
    imageSrc={documentIcon}
    primaryAction={<Button leadingIcon={faPlus} variant="primary">New project</Button>}
    secondaryAction={<Button variant="transparent">See projects</Button>}
    subtitle="Launch your first project to start conducting research!"
    title="You have no projects"
  />
);

export const FullWidth = () => (
  <EmptyState
    fullWidth={boolean('fullWidth', true)}
    imageSrc={documentIcon}
    primaryAction={<Button leadingIcon={faPlus} variant="primary">New project</Button>}
    subtitle="Launch your first project to start conducting research! Source from a pool of 2.4 million participants to reach nearly any target audience."
    title="You have no projects"
  />
);
