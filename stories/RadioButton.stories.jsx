import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import RadioButton from '../src/RadioButton/RadioButton';

import { withPadding } from './decorators';

export default {
  title: 'Design System/Buttons/Radio Button',
  component: RadioButton,
  decorators: [withA11y, withPadding],
};

export const Default = () => (
  <RadioButton
    id="default"
  />
);

export const Disabled = () => (
  <RadioButton
    disabled
    id="disabled"
  />
);
