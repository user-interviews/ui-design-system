import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Popper from 'src/Popper';
import mdx from './Popper.mdx';

export default {
  title: 'Components/Popper',
  component: Popper,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Popper text={text('Popper Text', 'Default Popper')} visible>
    <p>reference element</p>
  </Popper>
);

export const Dark = () => (
  <Popper dark text={text('Popper Text', 'Dark Popper')} visible>
    <p>reference element</p>
  </Popper>
);
