import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text } from '@storybook/addon-knobs';

import Popper from '../src/Popper/Popper';

import { withPadding } from './decorators';

export default {
  title: 'Design System/Popper',
  component: Popper,
  decorators: [withA11y, withKnobs, withPadding],
};

export const Default = () => <Popper visible text={text('Popper Text', 'Default Popper')} />;

export const Dark = () => <Popper dark visible text={text('Popper Text', 'Dark Popper')} />;
