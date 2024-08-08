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

export function Default() {
  return <LoadingSkeleton />;
}

export function MultiLine() {
  return <LoadingSkeleton count={3} />;
}

export function HeightAndWidth() {
  return <LoadingSkeleton height="44px" width="200px" />;
}

export function Circle() {
  return <LoadingSkeleton circle height={44} width={44} />;
}
