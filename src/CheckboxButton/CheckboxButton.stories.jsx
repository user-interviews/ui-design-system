/* eslint-disable react/prop-types */
import React from 'react';
import FormControlLabel from '../FormControlLabel';
import CheckboxButton from './CheckboxButton';

export default {
  title: 'Design System/Form Elements/CheckboxButton',
  component: CheckboxButton,
};

export const Default = () => (
  <FormControlLabel
    Control={CheckboxButton}
    id="value-1"
    text="Label 1"
    value="1"
  />
);

export const Description = () => (
  <FormControlLabel
    bordered
    Control={CheckboxButton}
    id="value-2"
    text="Label 2"
    value="2"
  >
    This is where the description goes
  </FormControlLabel>
);
