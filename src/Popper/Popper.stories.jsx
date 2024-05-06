import React from 'react';

import Popper from '.';
import mdx from './Popper.mdx';

export default {
  title: 'Components/Popper',
  component: Popper,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Popper text="Default Popper" visible>
    <p>reference element</p>
  </Popper>
);

export const Dark = () => (
  <Popper dark text="Dark Popper" visible>
    <p>reference element</p>
  </Popper>
);
