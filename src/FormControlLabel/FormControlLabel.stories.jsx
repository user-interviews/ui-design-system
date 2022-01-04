import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import FormControlLabel from 'src/FormControlLabel';
import CheckboxButton from 'src/CheckboxButton';
import RadioButton from 'src/RadioButton';

export default {
  title: 'Design System/Form Elements/Form Control Label',
  component: FormControlLabel,
  decorators: [withKnobs()],
  parameters: {
    a11y: {},
  },
};

const FormControlLabelControlComponent = (props) => {
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
  <FormControlLabelControlComponent
    bordered={boolean('Bordered button', false)}
    Control={CheckboxButton}
    disabled={boolean('Disabled', false)}
    id="checkbox"
    name="checkbox"
    text="Labeled checkbox"
    value="1"
  />
);

export const CheckboxWithChildren = () => (
  <FormControlLabelControlComponent
    bordered={boolean('Bordered button', true)}
    Control={CheckboxButton}
    id="checkbox"
    name="checkbox"
    text="Labeled checkbox"
    value="1"
  >
    <div>This checkbox has some helper text too!</div>
  </FormControlLabelControlComponent>
);

export const Radio = () => (
  <FormControlLabelControlComponent
    bordered={boolean('Bordered radio', false)}
    Control={RadioButton}
    id="radio"
    name="radio"
    text="Labeled radio"
    value="1"
  />
);

export const RadioWithChildren = () => (
  <FormControlLabelControlComponent
    bordered={boolean('Bordered radio', true)}
    Control={RadioButton}
    id="radio"
    name="radio"
    text="Labeled radio"
    value="1"
  >
    <div>This radio button has some helper text too!</div>
  </FormControlLabelControlComponent>
);
