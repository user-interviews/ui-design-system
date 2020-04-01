import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import FormGroup from 'src/FormGroup';

export default {
  title: 'Design System/Form Elements/Form Group',
  component: FormGroup,
  decorators: [withKnobs],
};

export const Default = () => (
  <FormGroup id="default">
    <input className="form-control" type="text" />
  </FormGroup>
);

export const Required = () => (
  <FormGroup
    id="with-required"
    label="Form Group with label"
    required
  >
    <input className="form-control" type="text" />
  </FormGroup>
);

export const WithLabel = () => (
  <FormGroup
    id="with-label"
    label="Form Group with label"
    labelHtmlFor="input"
  >
    <input className="form-control" id="input" type="text" />
  </FormGroup>
);

export const WithDescription = () => (
  <FormGroup
    description="test description"
    id="with-description"
    label="Form Group with description"
    labelHtmlFor="input"
  >
    <input className="form-control" id="input" type="text" />
  </FormGroup>
);

export const WithErrors = () => (
  <FormGroup
    displayErrorText
    errors={{ test: ['invalid input!'] }}
    id="with-errors"
    inputKey="test"
    label="Form Group with errors"
  >
    <input className="form-control" type="text" />
  </FormGroup>
);

export const WithDescriptionAndErrors = () => (
  <FormGroup
    description="test description"
    displayErrorText
    errors={{ test: ['invalid input!'] }}
    id="with-description-and-errors"
    inputKey="test"
    label="Form Group with description and errors"
  >
    <input className="form-control" type="text" />
  </FormGroup>
);
