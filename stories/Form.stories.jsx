import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';

import Form from '../src/Form/Form';
import FormControlLabel from '../src/FormControlLabel/FormControlLabel';
import FormGroup from '../src/FormGroup/FormGroup';
import RadioButton from '../src/RadioButton/RadioButton';
import RadioButtonGroup from '../src/RadioButtonGroup/RadioButtonGroup';

import { withPadding } from './decorators';

export default {
  title: 'Design System/Form',
  component: Form,
  decorators: [withA11y, withPadding],
};

const onSubmit = (event) => {
  event.preventDefault();
  action('form submitted')(event);
};

export const Default = () => (
  <Form id="form" onSubmit={onSubmit}>
    <FormGroup id="first-name" label="First name" labelHtmlFor="first-name">
      <input className="form-control" id="first-name" type="text" />
    </FormGroup>
    <FormGroup id="last-name" label="Last name" labelHtmlFor="last-name" required>
      <input className="form-control" id="last-name" type="text" />
    </FormGroup>
    <FormGroup id="email" label="Email" labelHtmlFor="email">
      <input className="form-control" id="email" type="text" />
    </FormGroup>
    <FormGroup
      errors={{ phone: 'Invalid phone number' }}
      id="phone"
      inputKey="phone"
      label="Phone"
      labelHtmlFor="phone"
      required
    >
      <input className="form-control" id="phone" type="text" />
    </FormGroup>
    <RadioButtonGroup name="radio-buttons">
      <FormControlLabel
        for="first"
        text="first choice"
      >
        <RadioButton id="first" name="radio-buttons" />
      </FormControlLabel>

      <FormControlLabel
        for="second"
        text="second choice"
      >
        <RadioButton id="second" name="radio-buttons" />
      </FormControlLabel>
    </RadioButtonGroup>
    <button className="btn btn-primary" type="submit">Save</button>
  </Form>
);

export const Inline = () => (
  <Form id="form" inline onSubmit={onSubmit}>
    <FormGroup id="first-name" label="First name" labelHtmlFor="first-name">
      <input className="form-control" id="first-name" type="text" />
    </FormGroup>
    <FormGroup id="last-name" label="Last name" labelHtmlFor="last-name" required>
      <input className="form-control" id="last-name" type="text" />
    </FormGroup>
    <FormGroup id="description" label="Description" labelHtmlFor="description">
      <textarea className="form-control" id="description" type="text" />
    </FormGroup>
    <button className="btn btn-primary" type="submit">Save</button>
  </Form>
);
