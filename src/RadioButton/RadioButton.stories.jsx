import React, { useState } from 'react';
import RadioButton from 'src/RadioButton';
import FormControlLabel from 'src/FormControlLabel';

import mdx from './RadioButton.mdx';

export default {
  title: 'Design System/RadioButton',
  component: RadioButton,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
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
};

export const WithDescription = () => {
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
};
