import React from 'react';

import {
  withKnobs, boolean, number,
} from '@storybook/addon-knobs';

import Card from 'src/Card';

import LoadingSkeleton from './LoadingSkeleton';
import mdx from './LoadingSkeleton.mdx';

export default {
  title: 'Components/LoadingSkeleton',
  component: LoadingSkeleton,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <LoadingSkeleton />
);

export const MultiLine = () => (
  <LoadingSkeleton count={number('count', 3)} />
);

export const HeightAndWidth = () => (
  <LoadingSkeleton height={number('height', 44)} width={number('width', 200)} />
);

export const Circle = () => (
  <LoadingSkeleton circle={boolean('circle', true)} height={44} width={44} />
);

export const CardContent = () => (
  <Card size="md" subTitle={`Research is better together 🕵️🕵. Invite as many team members as you'd like so they can view and copy any project.`} title="Invite Team members">
    <LoadingSkeleton count={3} />
    <br />
    <LoadingSkeleton count={2.5} />
  </Card>
);
