import React from 'react';

import LoadingOverlay from '.';

import mdx from './LoadingOverlay.mdx';

export default {
  title: 'Components/LoadingOverlay',
  component: LoadingOverlay,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export function Default() {
  return <LoadingOverlay visible />;
}
