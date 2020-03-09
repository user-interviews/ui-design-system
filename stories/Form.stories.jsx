import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';

import Form from '../src/Form/Form';
import FormGroup from '../src/FormGroup/FormGroup';

const withPadding = (story) => <div style={{ padding: '1rem' }}>{story()}</div>;

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
    <FormGroup label="First name" labelHtmlFor="first-name">
      <input className="form-control" id="first-name" type="text" />
    </FormGroup>
    <FormGroup label="Last name" labelHtmlFor="last-name" required>
      <input className="form-control" id="last-name" type="text" />
    </FormGroup>
    <FormGroup label="Email" labelHtmlFor="email">
      <input className="form-control" id="email" type="text" />
    </FormGroup>
    <FormGroup
      errors={{ phone: 'Invalid phone number' }}
      inputKey="phone"
      label="Phone"
      labelHtmlFor="phone"
      required
    >
      <input className="form-control" id="phone" type="text" />
    </FormGroup>
    <button className="btn btn-primary" type="submit">Save</button>
  </Form>
);

export const Inline = () => (
  <Form id="form" inline onSubmit={onSubmit}>
    <FormGroup label="First name" labelHtmlFor="first-name">
      <input className="form-control" id="first-name" type="text" />
    </FormGroup>
    <FormGroup label="Last name" labelHtmlFor="last-name" required>
      <input className="form-control" id="last-name" type="text" />
    </FormGroup>
    <FormGroup label="Description" labelHtmlFor="description">
      <textarea className="form-control" id="description" type="text" />
    </FormGroup>
    <button className="btn btn-primary" type="submit">Save</button>
  </Form>
);
