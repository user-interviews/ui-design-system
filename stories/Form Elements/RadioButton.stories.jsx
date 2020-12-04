import React from 'react';
import {
  withKnobs,
  text,
  boolean,
  radios,
} from '@storybook/addon-knobs';

import RadioButtonGroup from 'src/RadioButtonGroup';
import RadioButton from 'src/RadioButton';
import { ORIENTATIONS } from 'src/RadioButtonGroup/RadioButtonGroup';
import { colors } from 'src/Styles';

export default {
  title: 'Design System/Form Elements/Radio Button',
  component: RadioButton,
  decorators: [withKnobs],
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
    bordered
    id="default"
    label="Option with child"
  >
    <span style={{ color: colors.uxGray800 }}>Some descriptive text for the option above</span>
  </RadioButton>
);

export const WithRadioButtonGroup = () => (
  <RadioButtonGroup
    orientation={radios(
      'Orientation',
      Object.values(ORIENTATIONS),
      ORIENTATIONS.COLUMN,
    )}
  >
    <RadioButton
      bordered
      id="radio-1"
      label={text('First Label', 'First option with child')}
    >
      <span style={{ color: colors.uxGray800 }}>Some descriptive text for the option above</span>
    </RadioButton>
    <RadioButton
      bordered
      id="radio-2"
      label={text('Second Label', 'Second option with child')}
    >
      <span style={{ color: colors.uxGray800 }}>And another option to choose from</span>
    </RadioButton>
  </RadioButtonGroup>
);
