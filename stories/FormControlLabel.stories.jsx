import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import FormControlLabel from '../src/FormControlLabel/FormControlLabel';
import RadioButton from '../src/RadioButton/RadioButton';

import { withPadding } from './decorators';

export default {
  title: 'Design System/Form Control Label',
  component: FormControlLabel,
  decorators: [withA11y, withPadding],
};

export const Radio = () => (
  <FormControlLabel
    labelHtmlFor="radio"
    text="Labeled radio button"
  >
    <RadioButton id="radio" name="radio" />
  </FormControlLabel>
);
