/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import FormControlLabel from '../FormControlLabel';
import CheckboxButton from './CheckboxButton';

export default {
  title: 'Design System/Form Elements/CheckboxButton',
  component: CheckboxButton,
};

export const Default = () => {
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => {
    setChecked(!checked);
  };

  return (
    <FormControlLabel
      checked={checked}
      Control={CheckboxButton}
      id="value-1"
      text="Label 1"
      value="1"
      onClick={toggleChecked}
    />
  );
};

export const Description = () => {
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => {
    setChecked(!checked);
  };

  return (
    <FormControlLabel
      bordered
      checked={checked}
      Control={CheckboxButton}
      id="value-2"
      text="Label 2"
      value="2"
      onClick={toggleChecked}
    >
      This is where the description goes
    </FormControlLabel>
  );
};
