import React, { useState } from 'react';
import {
 boolean, radios, text, withKnobs,
} from '@storybook/addon-knobs';
import { ORIENTATIONS } from '../ControlButtonGroup';
import CheckboxButtonGroup from './index';
import CheckboxButton from '../CheckboxButton';
import FormControlLabel from '../FormControlLabel';
import FormGroup from '../FormGroup/FormGroup';
import mdx from './CheckboxButtonGroup.mdx';

export default {
  title: 'Components/Form Elements/CheckboxButtonGroup',
  component: CheckboxButtonGroup,
  decorators: [withKnobs()],
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
  fullWidth,
  id,
  inline,
  inputType,
  label,
  labelHelperText,
  orientation,
  labelHtmlFor,
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <FormGroup
      bordered={bordered}
      id={id}
      inline={inline}
      inputType={inputType}
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
  const orientation = radios(
    'Orientation',
    Object.values(ORIENTATIONS),
    ORIENTATIONS.COLUMN,
  );
  const bordered = boolean('Bordered buttons', false);

  return (
    <CheckboxButtonGroupComponent
      bordered={boolean('Bordered Form Group', false)}
      defaultValue={[]}
      fullWidth={boolean('Full width', false)}
      id="with-checkbox-button-group"
      inputType="checkbox"
      label="Label"
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

export const DefaultRow = () => (
  <CheckboxButtonGroupComponent
    bordered={false}
    defaultValue={[]}
    fullWidth={false}
    id="with-checkbox-button-group-1"
    inline
    inputType="checkbox"
    label="Label"
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
    fullWidth={false}
    id="with-checkbox-button-group-2"
    inputType="checkbox"
    label="Label"
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

export const Description = () => (
  <CheckboxButtonGroupComponent
    bordered={false}
    defaultValue={[]}
    fullWidth
    id="with-checkbox-button-group-3"
    inputType="checkbox"
    label="Label"
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
    fullWidth
    id="with-checkbox-button-group-4"
    inputType="checkbox"
    label="Label"
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
