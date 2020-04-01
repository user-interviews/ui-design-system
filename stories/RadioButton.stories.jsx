import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import RadioButton from 'src/RadioButton/RadioButton';

import { withPadding } from 'stories/decorators';
import { palette } from 'src/Styles';

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

export const WithChildren = () => (
  <RadioButton
    label="Option with child"
    bordered
    id="default"
  >
    <span style={{ color: palette.uxGray500 }}>Some descriptive text for the option above</span>
  </RadioButton>
);
