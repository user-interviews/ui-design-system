import React, { useState } from 'react';
import { ORIENTATIONS } from '../ControlButtonGroup';
import RadioButtonGroup from './index';
import RadioButton from '../RadioButton';
import FormControlLabel from '../FormControlLabel';
import FormGroup from '../FormGroup/FormGroup';
import mdx from './RadioButtonGroup.mdx';

export default {
  title: 'Components/Form Elements/RadioButtonGroup',
  component: RadioButtonGroup,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

/* eslint-disable react/prop-types */
function RadioButtonGroupComponent({
  bordered,
  children,
  defaultValue,
  elementType,
  fullWidth = false,
  id,
  inline = false,
  label,
  labelHelperText,
  orientation,
  labelHtmlFor,
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <FormGroup
      bordered={bordered}
      elementType={elementType}
      id={id}
      inline={inline}
      label={label}
      labelHelperText={labelHelperText}
      labelHtmlFor={labelHtmlFor}
    >
      <RadioButtonGroup
        fullWidth={fullWidth}
        orientation={orientation}
        value={value}
        onChange={setValue}
      >
        { children }
      </RadioButtonGroup>
    </FormGroup>
  );
}
/* eslint-enable react/prop-types */

export function Default() {
  const orientation = ORIENTATIONS.COLUMN;
  const bordered = false;

  return (
    <RadioButtonGroupComponent
      bordered={false}
      defaultValue={null}
      elementType="fieldset"
      fullWidth={false}
      id="with-radio-button-group"
      label="Legend"
      labelHelperText=""
      labelHtmlFor="radio-button-group"
      orientation={orientation}
    >
      <FormControlLabel
        bordered={bordered}
        Control={RadioButton}
        id="value-1"
        text="Value 1"
        value="1"
      />
      <FormControlLabel
        bordered={bordered}
        Control={RadioButton}
        id="value-2"
        text="Value 2"
        value="2"
      />
      <FormControlLabel
        bordered={bordered}
        Control={RadioButton}
        id="value-3"
        text="Value 3"
        value="3"
      />
    </RadioButtonGroupComponent>
  );
}

export function Row() {
  return (
    <RadioButtonGroupComponent
      bordered={false}
      defaultValue={null}
      elementType="fieldset"
      fullWidth={false}
      id="with-radio-button-group-2"
      inline
      label="Legend"
      labelHelperText="helper text"
      labelHtmlFor="radio-button-group"
      orientation={ORIENTATIONS.ROW}
    >
      <FormControlLabel
        bordered={false}
        Control={RadioButton}
        id="value-1-2"
        text="Label 1"
        value="1"
      />
      <FormControlLabel
        bordered={false}
        Control={RadioButton}
        id="value-2-2"
        text="Label 2"
        value="2"
      />
      <FormControlLabel
        bordered={false}
        Control={RadioButton}
        id="value-3-2"
        text="Label 3"
        value="3"
      />
    </RadioButtonGroupComponent>
  );
}

export function BorderedRow() {
  return (
    <RadioButtonGroupComponent
      bordered={false}
      defaultValue={null}
      elementType="fieldset"
      fullWidth={false}
      id="with-radio-button-group-3"
      label="Legend"
      labelHelperText="helper text"
      labelHtmlFor="radio-button-group"
      orientation={ORIENTATIONS.ROW}
    >
      <FormControlLabel
        bordered
        Control={RadioButton}
        id="value-1-3"
        text="Label 1"
        value="1"
      />
      <FormControlLabel
        bordered
        Control={RadioButton}
        id="value-2-3"
        text="Label 2"
        value="2"
      />
      <FormControlLabel
        bordered
        Control={RadioButton}
        id="value-3-3"
        text="Label 3"
        value="3"
      />
    </RadioButtonGroupComponent>
  );
}

export function DescriptionColumn() {
  return (
    <RadioButtonGroupComponent
      bordered={false}
      defaultValue={null}
      elementType="fieldset"
      id="with-radio-button-group-4"
      label="Legend"
      labelHelperText="helper text"
      labelHtmlFor="radio-button-group"
      orientation={ORIENTATIONS.COLUMN}
    >
      <FormControlLabel
        bordered
        Control={RadioButton}
        helperText="helper text"
        id="value-1-4"
        text="Label 1"
        value="1"
      >
        This is where the description goes
      </FormControlLabel>
      <FormControlLabel
        bordered
        Control={RadioButton}
        helperText="helper text"
        id="value-2-4"
        text="Label 2"
        value="2"
      >
        This is where the description goes
      </FormControlLabel>
      <FormControlLabel
        bordered
        Control={RadioButton}
        helperText="helper text"
        id="value-3-4"
        text="Label 3"
        value="3"
      >
        This is where the description goes
      </FormControlLabel>
    </RadioButtonGroupComponent>
  );
}

export function DescriptionRow() {
  return (
    <RadioButtonGroupComponent
      bordered={false}
      defaultValue={null}
      elementType="fieldset"
      fullWidth
      id="with-radio-button-group-5"
      label="Legend"
      labelHelperText="helper text"
      labelHtmlFor="radio-button-group"
      orientation={ORIENTATIONS.ROW}
    >
      <FormControlLabel
        bordered
        Control={RadioButton}
        helperText="helper text"
        id="value-1-5"
        text="Label 1"
        value="1"
      >
        This is where the description goes
      </FormControlLabel>
      <FormControlLabel
        bordered
        Control={RadioButton}
        helperText="helper text"
        id="value-2-5"
        text="Label 2"
        value="2"
      >
        This is where the description goes
      </FormControlLabel>
      <FormControlLabel
        bordered
        Control={RadioButton}
        helperText="helper text"
        id="value-3-5"
        text="Label 3"
        value="3"
      >
        This is where the description goes
      </FormControlLabel>
    </RadioButtonGroupComponent>
  );
}

export function BorderedColumnFullWidth() {
  return (
    <RadioButtonGroupComponent
      bordered={false}
      defaultValue={null}
      elementType="fieldset"
      fullWidth
      id="with-radio-button-group-5"
      label="Legend"
      labelHelperText="helper text"
      labelHtmlFor="radio-button-group"
      orientation={ORIENTATIONS.COLUMN}
    >
      <FormControlLabel
        bordered
        Control={RadioButton}
        helperText="helper text"
        id="value-1-6"
        text="Label 1"
        value="1"
      >
        This is where the description goes
      </FormControlLabel>
      <FormControlLabel
        bordered
        Control={RadioButton}
        helperText="helper text"
        id="value-2-6"
        text="Label 2"
        value="2"
      >
        This is where the description goes
      </FormControlLabel>
      <FormControlLabel
        bordered
        Control={RadioButton}
        helperText="helper text"
        id="value-3-6"
        text="Label 3"
        value="3"
      >
        This is where the description goes
      </FormControlLabel>
    </RadioButtonGroupComponent>
  );
}
