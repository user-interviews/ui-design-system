import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import FormControlLabel from 'src/FormControlLabel';
import CheckboxButton from 'src/CheckboxButton';

export default {
  title: 'Design System/Form Elements/Form Control Label',
  component: FormControlLabel,
  decorators: [withKnobs()],
};

const FormControlLabelCheckboxComponent = (props) => {
  const [value, setValue] = useState(false);
  const onChange = (e) => {
    setValue(e.target.checked);
    action('Checkbox onChange')(e);
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
  <FormControlLabelCheckboxComponent
    bordered={boolean('Bordered button', false)}
    Control={CheckboxButton}
    id="checkbox"
    name="checkbox"
    text="Labeled checkbox"
    type="checkbox"
    value="1"
  />
);

export const CheckboxWithChildren = () => (
  <FormControlLabelCheckboxComponent
    bordered
    Control={CheckboxButton}
    id="checkbox"
    name="checkbox"
    text="Labeled checkbox"
    type="checkbox"
    value="1"
  >
    <div>This checkbox has some helper text too!</div>
  </FormControlLabelCheckboxComponent>
);
