import React, { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { text, withKnobs } from '@storybook/addon-knobs';

import FormGroup from 'src/FormGroup';
import Input from 'src/Input';

export default {
  title: 'Design System/Form Elements/Form Group',
  component: FormGroup,
  decorators: [withKnobs],
};


const InputComponent = (props) => {
  const [value, setValue] = useState('');
  const handleChangeValue = (event) => setValue(event.target.value);

  return (
    <Input value={value} onChange={handleChangeValue} {...props} />
  );
};

export const Default = () => (
  <FormGroup id="default">
    <InputComponent id="default-input" name="default" placeholder="default" />
  </FormGroup>
);

export const Required = () => (
  <FormGroup
    id="with-required"
    label="Form Group with label"
    required
  >
    <InputComponent id="with-required-input" name="required" placeholder="Text is required" />
  </FormGroup>
);

export const WithLabel = () => (
  <FormGroup
    id="with-label"
    label="Form Group with label"
    labelHtmlFor="input"
  >
    <InputComponent id="input" name="with-label" />
  </FormGroup>
);

export const WithLabelTooltip = () => (
  <FormGroup
    id="with-label"
    label="Form Group with label and tooltip"
    labelHtmlFor="input"
    labelTooltip={text('Tooltip', 'Some tooltip text')}
  >
    <InputComponent id="input" name="with-label" />
  </FormGroup>
);

export const WithHelperText = () => (
  <FormGroup
    helperText="test helper text"
    id="with-helper-text"
    label="Form Group with helper text"
    labelHtmlFor="input"
  >
    <InputComponent id="input" name="with-helper-text" />
  </FormGroup>
);

export const WithErrors = () => (
  <FormGroup
    displayErrorText
    errors={{ test: ['invalid input!'] }}
    id="with-errors"
    inputKey="test"
    label="Form Group with errors"
    labelHtmlFor="input"
  >
    <InputComponent id="input" name="with-errors" />
  </FormGroup>
);

export const WithLeadingIcon = () => (
  <FormGroup
    helperText="with leading icon"
    id="with-leading-icon"
    label="Form Group with input leading icon"
    labelHtmlFor="input"
  >
    <InputComponent id="input" leadingIcon={faSearch} name="with-leading-icon" />
  </FormGroup>
);

export const WithTrailingIcon = () => (
  <FormGroup
    helperText="with trailing icon"
    id="with-trailing-icon"
    label="Form Group with input trailing icon"
    labelHtmlFor="input"
  >
    <InputComponent id="input" name="with-leading-icon" trailingIcon={faSearch} />
  </FormGroup>
);

export const WithLeadingAndTrailingIcons = () => (
  <FormGroup
    helperText="with leading and trailing icons"
    id="with-trailing-icon"
    label="Form Group with input leading and trailing icons"
    labelHtmlFor="input"
  >
    <InputComponent id="input" leadingIcon={faSearch} name="with-leading-and-trailing-icons" trailingIcon={faSearch} />
  </FormGroup>
);
