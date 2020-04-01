import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Popper from 'src/Popper';

export default {
  title: 'Design System/Popper',
  component: Popper,
  decorators: [withKnobs],
};

export const Default = () => <Popper visible text={text('Popper Text', 'Default Popper')} />;

export const Dark = () => <Popper dark visible text={text('Popper Text', 'Dark Popper')} />;
