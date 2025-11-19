import React, { useState } from 'react';
import { action } from 'storybook/actions';

import FormControlLabel from '.';
import CheckboxButton from '../CheckboxButton';
import RadioButton from '../RadioButton';

export default {
  title: 'Components/Form Elements/Form Control Label',
  component: FormControlLabel,
};

function FormControlLabelControlComponent(props) {
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
}

export function Checkbox() {
  return (
    <FormControlLabelControlComponent
      bordered={false}
      Control={CheckboxButton}
      disabled={false}
      id="checkbox"
      name="checkbox"
      text="Labeled checkbox"
      value="1"
    />
  );
}

export function CheckboxWithChildren() {
  return (
    <FormControlLabelControlComponent
      bordered
      Control={CheckboxButton}
      id="checkbox"
      name="checkbox"
      text="Labeled checkbox"
      value="1"
    >
      <div>This checkbox has some helper text too!</div>
    </FormControlLabelControlComponent>
  );
}

export function Radio() {
  return (
    <FormControlLabelControlComponent
      bordered={false}
      Control={RadioButton}
      id="radio"
      name="radio"
      text="Labeled radio"
      value="1"
    />
  );
}

export function RadioWithChildren() {
  return (
    <FormControlLabelControlComponent
      bordered
      Control={RadioButton}
      id="radio"
      name="radio"
      text="Labeled radio"
      value="1"
    >
      <div>This radio button has some helper text too!</div>
    </FormControlLabelControlComponent>
  );
}
