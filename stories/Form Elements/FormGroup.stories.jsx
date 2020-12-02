import React, { useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {
  boolean,
  radios,
  text,
  withKnobs,
} from '@storybook/addon-knobs';

import FormGroup from 'src/FormGroup';
import Input from 'src/Input';
import CheckboxButtonGroup from 'src/CheckboxButtonGroup';
import CheckboxButton from 'src/CheckboxButton';
import FormControlLabel from 'src/FormControlLabel';
import RadioButtonGroup from 'src/RadioButtonGroup';
import { ORIENTATIONS } from 'src/ControlButtonGroup';
import RadioButton from 'src/RadioButton';

export default {
  title: 'Design System/Form Elements/Form Group',
  component: FormGroup,
  decorators: [withKnobs],
};

export const InputComponent = (props) => {
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

/* eslint-disable react/prop-types */
const ButtonGroupComponent = ({
  ButtonGroup,
  bordered,
  children,
  defaultValue,
  fullWidth,
  id,
  label,
  labelHelperText,
  orientation,
  labelHtmlFor,
}) => {
  const [value, setValue] = useState(defaultValue);
  const handleChangeValue = (values) => setValue(values);

  return (
    <FormGroup
      bordered={bordered}
      id={id}
      label={label}
      labelHelperText={labelHelperText}
      labelHtmlFor={labelHtmlFor}
    >
      <ButtonGroup
        fullWidth={fullWidth}
        id="button-group"
        orientation={orientation}
        value={value}
        onChange={handleChangeValue}
      >
        { children }
      </ButtonGroup>
    </FormGroup>
  );
};
/* eslint-enable react/prop-types */

export const WithCheckboxButtonGroup = () => {
  const orientation = radios(
    'Orientation',
    Object.values(ORIENTATIONS),
    ORIENTATIONS.COLUMN,
  );
  let bordered = true;
  if (orientation === ORIENTATIONS.COLUMN) {
    bordered = boolean('Bordered buttons (only applicable on column orientation)', false);
  }
  return (
    <ButtonGroupComponent
      bordered={boolean('Bordered Form Group', true)}
      ButtonGroup={CheckboxButtonGroup}
      defaultValue={[]}
      fullWidth={boolean('Full width', false)}
      id="with-checkbox-button-group"
      label="Form Group with checkbox button group"
      labelHelperText="with some helper text"
      labelHtmlFor="checkbox-button-group"
      orientation={orientation}
    >
      <FormControlLabel
        bordered={bordered}
        Control={CheckboxButton}
        id="value-1"
        text={text('Label 1', 'Value 1')}
        value="1"
      />
      <FormControlLabel
        bordered={bordered}
        Control={CheckboxButton}
        id="value-2"
        text={text('Label 2', 'Value 2')}
        value="2"
      />
      <FormControlLabel
        bordered={bordered}
        Control={CheckboxButton}
        id="value-3"
        text={text('Label 3', 'Value 3')}
        value="3"
      />
    </ButtonGroupComponent>
  );
};

export const WithRadioButtonGroup = () => {
  const orientation = radios(
    'Orientation',
    Object.values(ORIENTATIONS),
    ORIENTATIONS.COLUMN,
  );
  let bordered = true;
  if (orientation === ORIENTATIONS.COLUMN) {
    bordered = boolean('Bordered buttons (only toggleable on column layout)', false);
  }

  return (
    <ButtonGroupComponent
      bordered={boolean('Bordered Form Group', true)}
      ButtonGroup={RadioButtonGroup}
      defaultValue="1"
      fullWidth={boolean('Full width', false)}
      id="with-radio-button-group"
      label="Form Group with radio button group"
      labelHelperText="with some helper text"
      labelHtmlFor="radio-button-group"
      orientation={orientation}
    >
      <FormControlLabel
        bordered={bordered}
        Control={RadioButton}
        id="value-1"
        name="choice"
        text={text('Label 1', 'Value 1')}
        value="1"
      />
      <FormControlLabel
        bordered={bordered}
        Control={RadioButton}
        id="value-2"
        name="choice"
        text={text('Label 2', 'Value 2')}
        value="2"
      />
      <FormControlLabel
        bordered={bordered}
        Control={RadioButton}
        id="value-3"
        name="choice"
        text={text('Label 3', 'Value 3')}
        value="3"
      />
    </ButtonGroupComponent>
  );
};
