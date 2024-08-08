import React, { useState } from 'react';
import { faSearch } from '@fortawesome/pro-solid-svg-icons';

import { FlexContainer } from 'src/FlexContainer';
import FormGroup from '.';
import Input from '../Input';
import FormControlLabel from '../FormControlLabel';
import RadioButtonGroup from '../RadioButtonGroup';
import { ORIENTATIONS } from '../ControlButtonGroup';
import RadioButton from '../RadioButton';

import mdx from './FormGroup.mdx';

export default {
  title: 'Components/Form Elements/Form Group',
  component: FormGroup,
  parameters: {
    docs: {
      page: mdx,
    },
  },
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
    <FormGroup id="default">
      <InputComponent id="default-input" name="default" placeholder="Placeholder text" />
    </FormGroup>
  );
}

export function WithHelperText() {
  return (
    <FormGroup
      helperText="test helper text"
      id="with-helper-text"
      label="Label"
      labelHtmlFor="input"
    >
      <InputComponent id="input" name="with-helper-text" />
    </FormGroup>
  );
}

export function Required() {
  return (
    <FormGroup
      id="with-required"
      label="Label"
      required
    >
      <InputComponent id="with-required-input" name="required" placeholder="Text is required" />
    </FormGroup>
  );
}

export function NoMargin() {
  return (
    <FlexContainer flexDirection="column" gap={4}>
      <FormGroup
        label="Label"
        labelHtmlFor="no-margin-1-input"
        noMargin
        required
      >
        <InputComponent id="no-margin-1-input" placeholder="This FormGroup has no default margin" />
      </FormGroup>
      <FormGroup
        label="Label"
        labelHtmlFor="no-margin-2-input"
        noMargin
        required
      >
        <InputComponent id="no-margin-2-input" placeholder="This FormGroup has no default margin" />
      </FormGroup>
    </FlexContainer>
  );
}

export function WithLabelTooltip() {
  return (
    <FormGroup
      id="with-label"
      label="Label"
      labelHtmlFor="input"
      labelTooltip="Some tooltip text"
    >
      <InputComponent id="input" name="with-label" />
    </FormGroup>
  );
}

export function WithLeadingIcon() {
  return (
    <FormGroup
      helperText="with leading icon"
      id="with-leading-icon"
      label="Form Group with input leading icon"
      labelHtmlFor="input"
    >
      <InputComponent
        id="input"
        leadingIcon={faSearch}
        name="with-leading-icon"
        placeholder="Placeholder text"
      />
    </FormGroup>
  );
}

export function WithTrailingText() {
  return (
    <FormGroup
      id="with-trailing-text"
      label="Form Group with trailing text"
      labelHtmlFor="trailing-text-input"
    >
      <InputComponent id="trailing-text-input" name="default" placeholder="Session length" trailingText="min" type="number" />
    </FormGroup>
  );
}

export function WithTrailingIcon() {
  return (
    <FormGroup
      helperText="with trailing icon"
      id="with-trailing-icon"
      label="Form Group with input trailing icon"
      labelHtmlFor="input"
    >
      <InputComponent
        id="input"
        name="with-leading-icon"
        placeholder="Placeholder text"
        trailingIcon={faSearch}
      />
    </FormGroup>
  );
}

export function WithTrailingIconAndButton() {
  return (
    <FormGroup
      helperText="with trailing icon and button"
      id="with-trailing-icon-and-button"
      label="Form Group with input trailing icon and button"
      labelHtmlFor="input"
    >
      <InputComponent
        id="input"
        name="with-leading-icon-and-button"
        placeholder="Placeholder text"
        trailingIcon={faSearch}
        trailingIconOnClick={() => alert('Great job!')}
      />
    </FormGroup>
  );
}

export function WithTrailingIconAndButtonWithSubmit() {
  return (
    <FormGroup
      helperText="with trailing icon and button with submit"
      id="with-trailing-icon-and-button-with-submit"
      label="Form Group with input trailing icon and button with submit"
      labelHtmlFor="input"
    >
      <InputComponent
        id="input"
        name="with-leading-icon-and-button"
        placeholder="Placeholder text"
        trailingIcon={faSearch}
        trailingIconOnClick={() => alert('Great job!')}
        trailingIconOnClickSubmit
      />
    </FormGroup>
  );
}

export function WithTrailingIconAndButtonWithSubmitAndLabel() {
  return (
    <FormGroup
      helperText="with trailing icon and button with submit and label"
      id="with-trailing-icon-and-button-with-submit-and-label"
      label="Form Group with input trailing icon and button with submit and label"
      labelHtmlFor="input"
    >
      <InputComponent
        id="input"
        name="with-leading-icon-and-button"
        placeholder="Placeholder text"
        trailingIcon={faSearch}
        trailingIconLabel="label"
        trailingIconOnClick={() => alert('Great job!')}
        trailingIconOnClickSubmit
      />
    </FormGroup>
  );
}

export function WithLeadingAndTrailingIcons() {
  return (
    <FormGroup
      helperText="with leading and trailing icons"
      id="with-leading-and-trailing-icons"
      label="Form Group with input leading and trailing icons"
      labelHtmlFor="input"
    >
      <InputComponent
        id="input"
        leadingIcon={faSearch}
        name="with-leading-and-trailing-icons"
        placeholder="Placeholder text"
        trailingIcon={faSearch}
      />
    </FormGroup>
  );
}

export function WithErrors() {
  return (
    <FormGroup
      displayErrorText
      errors={{ test: [<div>Sorry, we’re not able to accept this type of input. For more information, click <a href="http://www.google.com">here</a></div>] }}
      id="with-errors"
      inputKey="test"
      label="Form Group with errors"
      labelHtmlFor="input"
    >
      <InputComponent
        aria-describedby="form-errors-test"
        aria-invalid
        id="input"
        name="with-errors"
        placeholder="Placeholder text"
      />
    </FormGroup>
  );
}

/* eslint-disable react/prop-types */
function ButtonGroupComponent({
  ButtonGroup,
  bordered,
  children,
  defaultValue,
  elementType,
  fullWidth,
  id,
  label,
  labelHelperText,
  orientation,
  labelHtmlFor,
}) {
  const [value, setValue] = useState(defaultValue);
  const handleChangeValue = (values) => setValue(values);

  return (
    <FormGroup
      bordered={bordered}
      elementType={elementType}
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
}
/* eslint-enable react/prop-types */

export function WithRadioButtonGroup() {
  const orientation = ORIENTATIONS.COLUMN;
  const bordered = true;

  return (
    <ButtonGroupComponent
      bordered
      ButtonGroup={RadioButtonGroup}
      defaultValue="1"
      elementType="fieldset"
      fullWidth={false}
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
        text="Value 1"
        value="1"
      />
      <FormControlLabel
        bordered={bordered}
        Control={RadioButton}
        id="value-2"
        name="choice"
        text="Value 2"
        value="2"
      />
      <FormControlLabel
        bordered={bordered}
        Control={RadioButton}
        id="value-3"
        name="choice"
        text="Value 3"
        value="3"
      />
    </ButtonGroupComponent>
  );
}
