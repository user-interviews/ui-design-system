import React, { useState } from 'react';
import { ORIENTATIONS } from '../ControlButtonGroup';
import CheckboxButtonGroup from './index';
import CheckboxButton from '../CheckboxButton';
import FormControlLabel from '../FormControlLabel';
import FormGroup from '../FormGroup/FormGroup';
import mdx from './CheckboxButtonGroup.mdx';

export default {
  title: 'Components/Form Elements/CheckboxButtonGroup',
  component: CheckboxButtonGroup,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

/* eslint-disable react/prop-types */
const CheckboxButtonGroupComponent = ({
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
}) => {
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
      <CheckboxButtonGroup
        fullWidth={fullWidth}
        id={`${id}-button-group`}
        orientation={orientation}
        value={value}
        onChange={setValue}
      >
        { children }
      </CheckboxButtonGroup>
    </FormGroup>
  );
};
/* eslint-enable react/prop-types */

export const Default = () => {
  const orientation = ORIENTATIONS.COLUMN;
  const bordered = false;

  return (
    <CheckboxButtonGroupComponent
      bordered={false}
      defaultValue={[]}
      elementType="fieldset"
      fullWidth={false}
      id="with-checkbox-button-group"
      label="Legend"
      labelHelperText=""
      labelHtmlFor="checkbox-button-group"
      orientation={orientation}
    >
      <FormControlLabel
        bordered={bordered}
        Control={CheckboxButton}
        id="value-1"
        text="Value 1"
        value="1"
      />
      <FormControlLabel
        bordered={bordered}
        Control={CheckboxButton}
        id="value-2"
        text="Value 2"
        value="2"
      />
      <FormControlLabel
        bordered={bordered}
        Control={CheckboxButton}
        id="value-3"
        text="Value 3"
        value="3"
      />
    </CheckboxButtonGroupComponent>
  );
};

export const Row = () => (
  <CheckboxButtonGroupComponent
    bordered={false}
    defaultValue={[]}
    elementType="fieldset"
    fullWidth={false}
    id="with-checkbox-button-group-1"
    inline
    label="Legend"
    labelHelperText="helper text"
    labelHtmlFor="checkbox-button-group"
    orientation={ORIENTATIONS.ROW}
  >
    <FormControlLabel
      bordered={false}
      Control={CheckboxButton}
      id="value-1-1"
      text="Label 1"
      value="1"
    />
    <FormControlLabel
      bordered={false}
      Control={CheckboxButton}
      id="value-2-1"
      text="Label 2"
      value="2"
    />
    <FormControlLabel
      bordered={false}
      Control={CheckboxButton}
      id="value-3-1"
      text="Label 3"
      value="3"
    />
  </CheckboxButtonGroupComponent>
  );

export const BorderedRow = () => (
  <CheckboxButtonGroupComponent
    bordered={false}
    defaultValue={[]}
    elementType="fieldset"
    fullWidth={false}
    id="with-checkbox-button-group-2"
    label="Legend"
    labelHelperText="helper text"
    labelHtmlFor="checkbox-button-group"
    orientation={ORIENTATIONS.ROW}
  >
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      id="value-1-2"
      text="Label 1"
      value="1"
    />
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      id="value-2-2"
      text="Label 2"
      value="2"
    />
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      id="value-3-2"
      text="Label 3"
      value="3"
    />
  </CheckboxButtonGroupComponent>
);

export const DescriptionColumn = () => (
  <CheckboxButtonGroupComponent
    bordered={false}
    defaultValue={[]}
    elementType="fieldset"
    id="with-checkbox-button-group-3"
    label="Legend"
    labelHelperText="helper text"
    labelHtmlFor="checkbox-button-group"
    orientation={ORIENTATIONS.COLUMN}
  >
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      helperText="helper text"
      id="value-1-3"
      text="Label 1"
      value="1"
    >
      This is where the description goes
    </FormControlLabel>
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      helperText="helper text"
      id="value-2-3"
      text="Label 2"
      value="2"
    >
      This is where the description goes
    </FormControlLabel>
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      helperText="helper text"
      id="value-3-3"
      text="Label 3"
      value="3"
    >
      This is where the description goes
    </FormControlLabel>
  </CheckboxButtonGroupComponent>
);

export const DescriptionRow = () => (
  <CheckboxButtonGroupComponent
    bordered={false}
    defaultValue={[]}
    elementType="fieldset"
    fullWidth
    id="with-checkbox-button-group-4"
    label="Legend"
    labelHelperText="helper text"
    labelHtmlFor="checkbox-button-group"
    orientation={ORIENTATIONS.ROW}
  >
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      helperText="helper text"
      id="value-1-4"
      text="Label 1"
      value="1"
    >
      This is where the description goes
    </FormControlLabel>
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      helperText="helper text"
      id="value-2-4"
      text="Label 2"
      value="2"
    >
      This is where the description goes
    </FormControlLabel>
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      helperText="helper text"
      id="value-3-4"
      text="Label 3"
      value="3"
    >
      This is where the description goes
    </FormControlLabel>
  </CheckboxButtonGroupComponent>
);

export const BorderedColumnFullWidth = () => (
  <CheckboxButtonGroupComponent
    bordered={false}
    defaultValue={[]}
    elementType="fieldset"
    fullWidth
    id="with-checkbox-button-group-5"
    label="Legend"
    labelHelperText="helper text"
    labelHtmlFor="checkbox-button-group"
    orientation={ORIENTATIONS.COLUMN}
  >
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      helperText="helper text"
      id="value-1-5"
      text="Label 1"
      value="1"
    >
      This is where the description goes
    </FormControlLabel>
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      helperText="helper text"
      id="value-2-5"
      text="Label 2"
      value="2"
    >
      This is where the description goes
    </FormControlLabel>
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      helperText="helper text"
      id="value-3-5"
      text="Label 3"
      value="3"
    >
      This is where the description goes
    </FormControlLabel>
  </CheckboxButtonGroupComponent>
);
