import React, { useState } from 'react';
import { action } from 'storybook/actions';

import Button from '../Button';
import Form from '.';
import FormControlLabel from '../FormControlLabel';
import FormGroup from '../FormGroup';
import Input from '../Input';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';

import mdx from './Form.mdx';

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const onSubmit = (event) => {
  event.preventDefault();
  action('form submitted')(event);
};

function InputComponent(props) {
  const [value, setValue] = useState('');
  const handleChangeValue = (event) => setValue(event.target.value);

  return (
    <Input value={value} onChange={handleChangeValue} {...props} />
  );
}

export function Default() {
  return (
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
      <RadioButtonGroup>
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
      <Button type="submit" variant="primary">Save</Button>
    </Form>
  );
}
