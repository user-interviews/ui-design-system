import React, { useState } from 'react';
import RadioButton from '.';
import FormControlLabel from '../FormControlLabel';

import mdx from './RadioButton.mdx';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export function Default() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <RadioButton
      checked={isChecked}
      disabled={false}
      id="1"
      value={1}
      onChange={handleChange}
    />
  );
}

export function WithDescription() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <FormControlLabel
      bordered
      checked={isChecked}
      Control={RadioButton}
      id="value-2"
      text="Label 2"
      value="2"
      onChange={handleChange}
    >
      This is where the description goes
    </FormControlLabel>
  );
}
