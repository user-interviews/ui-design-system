import React from 'react';

import TestPill from './TestPill';
// import mdx from './Pill.mdx';

export default {
  title: 'Components/TestPill',
  component: TestPill,
  parameters: {
    docs: {
      //page: mdx,
    },
  },
};

export const Default = () => (
  <div>
    <TestPill color="red" text="text"/>
    <TestPill color="blue" text="text" />
  </div>
);
