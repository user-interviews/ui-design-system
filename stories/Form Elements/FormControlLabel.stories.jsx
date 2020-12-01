import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import FormControlLabel from 'src/FormControlLabel';
import CheckboxButton from 'src/CheckboxButton';
import RadioButton from 'src/RadioButton/RadioButton';
import { colors } from 'src/Styles';

export default {
  title: 'Design System/Form Elements/Form Control Label',
  component: FormControlLabel,
  decorators: [withKnobs()],
};

const FormControlLabelComponent = (props) => {
  const [value, setValue] = useState(false);
  const onChange = (e) => {
    setValue(e.target.checked);
    action('Control onChange')(e);
  };

  return (
    <FormControlLabel
      {...props}
      checked={value}
      onChange={onChange}
    />
  );
};

export const Checkbox = () => (
  <FormControlLabelComponent
    bordered={boolean('Bordered button', false)}
    Control={CheckboxButton}
    id="checkbox"
    name="checkbox"
    text="Labeled checkbox"
    type="checkbox"
    value="1"
  />
);

export const Radio = () => (
  <FormControlLabelComponent
    bordered={boolean('Border', false)}
    Control={RadioButton}
    disabled={boolean('Disabled', false)}
    id="default"
    text={text('Label', 'label')}
  />
);

export const RadioButtonWithChildren = () => (
  <FormControlLabelComponent
    bordered
    Control={RadioButton}
    id="default"
    text="Option with child"
  >
    <span style={{ color: colors.uxGray500 }}>Some descriptive text for the option above</span>
  </FormControlLabelComponent>
);
