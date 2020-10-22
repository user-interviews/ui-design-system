import React, { Fragment, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Controller } from 'react-hook-form';

import Form from 'src/Form';
import ValidatedForm from 'src/Form/ValidatedForm';
import FormGroup from 'src/FormGroup';
import RadioButton from 'src/RadioButton';
import RadioButtonGroup from 'src/RadioButtonGroup';
import SingleSelect from '../src/Select/SingleSelect';

export default {
  title: 'Design System/Form',
  component: Form,
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
      <RadioButton id="first-radio" label="first choice" name="radio-buttons" />
      <RadioButton id="second-radio" label="second choice" name="radio-buttons" />
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

const options = [
  { label: 'Bob', value: 1 },
  { label: 'Dennis', value: 2 },
  { label: 'Basel', value: 3 },
];

export const Validated = () => {
  const [serverErrors, setServerErrors] = useState({});
  const onSubmitValidated = () => {
    setServerErrors({
      first_name: ['Server-side validation failed!'],
    });
  };

  return (
    <ValidatedForm
      errors={serverErrors}
      id="form"
      onSubmit={onSubmitValidated}
    >
      {(register, errors, control) => (
        <Fragment>
          <FormGroup
            errors={errors}
            id="first_name"
            inputKey="first_name"
            label="First name"
            labelHtmlFor="first_name"
            required
          >
            <input
              className="form-control"
              id="first_name"
              name="first_name"
              ref={register({ required: true })}
              type="text"
            />
          </FormGroup>
          <FormGroup
            errors={errors}
            id="last_name"
            inputKey="last_name"
            label="Last name"
            labelHtmlFor="last_name"
          >
            <input
              className="form-control"
              id="last_name"
              name="last_name"
              ref={register({ minLength: 10, required: true })}
              type="text"
            />
          </FormGroup>
          <FormGroup
            errors={errors}
            id="manager"
            inputKey="manager"
            label="Manager"
            labelHtmlFor="manager"
          >
            <Controller
              aria-labelledby="manager"
              as={SingleSelect}
              control={control}
              id="manager"
              isClearable
              name="manager"
              options={options}
              rules={{ required: true }}
            />
          </FormGroup>
          <button className="btn btn-primary" type="submit">Save</button>
        </Fragment>
    )}
    </ValidatedForm>
  );
};
