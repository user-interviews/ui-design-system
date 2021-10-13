import React from 'react';

import LoadingOverlay from 'src/LoadingOverlay';

import mdx from './LoadingOverlay.mdx';

export default {
  title: 'Design System/LoadingOverlay',
  component: LoadingOverlay,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <LoadingOverlay visible />
);