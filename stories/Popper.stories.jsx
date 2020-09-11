import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Popper from 'src/Popper';

export default {
  title: 'Design System/Popper',
  component: Popper,
  decorators: [withKnobs],
};

export const Default = () => <Popper text={text('Popper Text', 'Default Popper')} visible />;

export const Dark = () => <Popper dark text={text('Popper Text', 'Dark Popper')} visible />;
