import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';

import Form from '../src/Form/Form';
import FormControl from '../src/FormControl/FormControl';
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
      <FormControl description="Enter your first name">
        <input className="form-control" id="first-name" type="text" />
      </FormControl>
    </FormGroup>
    <FormGroup label="Last name" labelHtmlFor="last-name" required>
      <FormControl description="Enter your last name">
        <input className="form-control" id="last-name" type="text" />
      </FormControl>
    </FormGroup>
    <FormGroup label="Email" labelHtmlFor="email">
      <FormControl
        description="Enter your email address"
        errors={{ email: 'invalid email' }}
        inputKey="email"
      >
        <input className="form-control" id="email" type="text" />
      </FormControl>
    </FormGroup>
    <button className="btn btn-primary" type="submit">Save</button>
  </Form>
);

export const Inline = () => (
  <Form id="form" inline onSubmit={onSubmit}>
    <FormGroup label="First name" labelHtmlFor="first-name">
      <FormControl description="Enter your first name">
        <input className="form-control" id="first-name" type="text" />
      </FormControl>
    </FormGroup>
    <FormGroup label="Last name" labelHtmlFor="last-name" required>
      <FormControl description="Enter your last name">
        <input className="form-control" id="last-name" type="text" />
      </FormControl>
    </FormGroup>
    <button className="btn btn-primary" type="submit">Save</button>
  </Form>
);
