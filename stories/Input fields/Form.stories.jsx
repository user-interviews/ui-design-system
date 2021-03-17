import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import Form from 'src/Form';
import FormControlLabel from 'src/FormControlLabel';
import FormGroup from 'src/FormGroup';
import Input from 'src/Input';
import RadioButton from 'src/RadioButton';
import RadioButtonGroup from 'src/RadioButtonGroup';

export default {
  title: 'Design System/Input fields',
  component: Form,
};

const onSubmit = (event) => {
  event.preventDefault();
  action('form submitted')(event);
};

const InputComponent = (props) => {
  const [value, setValue] = useState('');
  const handleChangeValue = (event) => setValue(event.target.value);

  return (
    <Input value={value} onChange={handleChangeValue} {...props} />
  );
};

export const Default = () => (
  <Form id="form" onSubmit={onSubmit}>
    <FormGroup id="first-name" label="First name" labelHtmlFor="first-name">
      <InputComponent id="first-name-input" name="first-name" type="text" />
    </FormGroup>
    <FormGroup id="last-name" label="Last name" labelHtmlFor="last-name" required>
      <InputComponent id="last-name-input" name="last-name" type="text" />
    </FormGroup>
    <FormGroup id="email" label="Email" labelHtmlFor="email">
      <InputComponent id="email-input" name="email" type="text" />
    </FormGroup>
    <FormGroup
      errors={{ phone: 'Invalid phone number' }}
      id="phone"
      inputKey="phone"
      label="Phone"
      labelHtmlFor="phone"
      required
    >
      <InputComponent id="phone-input" name="phone" type="text" />
    </FormGroup>
    <RadioButtonGroup name="radio-buttons">
      <FormControlLabel
        Control={RadioButton}
        id="first-radio"
        name="radio-buttons"
        text="first choice"
      />
      <FormControlLabel
        Control={RadioButton}
        id="second-radio"
        name="radio-buttons"
        text="second choice"
      />
    </RadioButtonGroup>
    <button className="btn btn-primary" type="submit">Save</button>
  </Form>
);
