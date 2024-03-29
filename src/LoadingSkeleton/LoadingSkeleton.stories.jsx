import React from 'react';

import LoadingSkeleton from './LoadingSkeleton';
import mdx from './LoadingSkeleton.mdx';

export default {
  title: 'Components/LoadingSkeleton',
  component: LoadingSkeleton,
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
  <LoadingSkeleton count={3} />
);

export const HeightAndWidth = () => (
  <LoadingSkeleton height="44px" width="200px" />
);

export const Circle = () => (
  <LoadingSkeleton circle height={44} width={44} />
);
