import { boolean, radios, text, withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';
import { ORIENTATIONS } from '../ControlButtonGroup';
import CheckboxButtonGroup from './index';
import FormControlLabel from '../FormControlLabel';
import CheckboxButton from '../CheckboxButton';
import FormGroup from '../FormGroup/FormGroup';

export default {
  title: 'Design System/Form Elements/CheckboxButtonGroup',
  component: CheckboxButtonGroup,
  decorators: [withKnobs()],
};

const CheckboxButtonGroupComponent = ({
  bordered,
  children,
  defaultValue,
  fullWidth,
  id,
  inline,
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
      inline={inline}
      label={label}
      labelHelperText={labelHelperText}
      labelHtmlFor={labelHtmlFor}
    >
      <CheckboxButtonGroup
        fullWidth={fullWidth}
        id="button-group"
        orientation={orientation}
        value={value}
        onChange={handleChangeValue}
      >
        { children }
      </CheckboxButtonGroup>
    </FormGroup>
  );
};

export const Default = () => {
  const orientation = radios(
    'Orientation',
    Object.values(ORIENTATIONS),
    ORIENTATIONS.COLUMN,
  );
  const bordered = boolean('Bordered buttons (only applicable on column orientation)', false);

  return (
    <CheckboxButtonGroupComponent
      bordered={boolean('Bordered Form Group', false)}
      defaultValue={[]}
      fullWidth={boolean('Full width', false)}
      id="with-checkbox-button-group"
      label="Form Group with checkbox button group"
      labelHelperText="use the knobs to try out different variations"
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
    </CheckboxButtonGroupComponent>
  );
};

export const ColumnCheckboxButtonGroup = () => (
  <CheckboxButtonGroupComponent
    bordered={false}
    defaultValue={[]}
    fullWidth={false}
    id="with-checkbox-button-group"
    label="Form Group with checkbox button group"
    labelHelperText="with some helper text"
    labelHtmlFor="checkbox-button-group"
    orientation={ORIENTATIONS.COLUMN}
  >
    <FormControlLabel
      Control={CheckboxButton}
      id="value-1"
      text="Label 1"
      value="1"
    />
    <FormControlLabel
      Control={CheckboxButton}
      id="value-2"
      text="Label 2"
      value="2"
    />
    <FormControlLabel
      Control={CheckboxButton}
      id="value-3"
      text="Label 3"
      value="3"
    />
  </CheckboxButtonGroupComponent>
  );

export const BorderedCheckboxButtonGroup = () => (
  <CheckboxButtonGroupComponent
    defaultValue={[]}
    fullWidth
    id="with-checkbox-button-group"
    label="Form Group with checkbox button group"
    labelHelperText="with some helper text"
    labelHtmlFor="checkbox-button-group"
    orientation={ORIENTATIONS.ROW}
  >
    <FormControlLabel
      Control={CheckboxButton}
      id="value-1"
      text="Label 1"
      value="1"
    />
    <FormControlLabel
      Control={CheckboxButton}
      id="value-2"
      text="Label 2"
      value="2"
    />
    <FormControlLabel
      Control={CheckboxButton}
      id="value-3"
      text="Label 3"
      value="3"
    />
  </CheckboxButtonGroupComponent>
  );

export const RowCheckboxButtonGroup = () => (
  <CheckboxButtonGroupComponent
    bordered={false}
    defaultValue={[]}
    fullWidth={false}
    id="with-checkbox-button-group"
    inline={true}
    label="Inline checkbox button group"
    labelHtmlFor="checkbox-button-group"
    orientation={ORIENTATIONS.ROW}
  >
    <FormControlLabel
      bordered={false}
      Control={CheckboxButton}
      id="value-1"
      text="Label 1"
      value="1"
    />
    <FormControlLabel
      bordered={false}
      Control={CheckboxButton}
      id="value-2"
      text="Label 2"
      value="2"
    />
    <FormControlLabel
      bordered={false}
      Control={CheckboxButton}
      id="value-3"
      text="Label 3"
      value="3"
    />
  </CheckboxButtonGroupComponent>
);

export const BorderedRowCheckboxButtonGroup = () => (
  <CheckboxButtonGroupComponent
    bordered={false}
    defaultValue={[]}
    fullWidth={false}
    id="with-checkbox-button-group"
    label="Form Group with checkbox button group"
    labelHelperText="with some helper text"
    labelHtmlFor="checkbox-button-group"
    orientation={ORIENTATIONS.ROW}
  >
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      id="value-1"
      text="Label 1"
      value="1"
    />
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      id="value-2"
      text="Label 2"
      value="2"
    />
    <FormControlLabel
      bordered
      Control={CheckboxButton}
      id="value-3"
      text="Label 3"
      value="3"
    />
  </CheckboxButtonGroupComponent>
);
