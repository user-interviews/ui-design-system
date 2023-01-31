import React from 'react';

import {
  withKnobs, boolean, number, text,
} from '@storybook/addon-knobs';

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
  <LoadingSkeleton height={text('height', '44px')} width={text('width', '200px')} />
);

export const Circle = () => (
  <LoadingSkeleton circle={boolean('circle', true)} height={44} width={44} />
);
