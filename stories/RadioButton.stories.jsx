import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import RadioButton from '../src/RadioButton/RadioButton';

import { withPadding } from './decorators';

export default {
  title: 'Design System/Form Elements/Radio Button',
  component: RadioButton,
  decorators: [withA11y, withPadding, withKnobs],
};

export const Default = () => (
  <RadioButton
    bordered={boolean('Border', false)}
    disabled={boolean('Disabled', false)}
    id="default"
    label={text('Label', 'label')}
  />
);
