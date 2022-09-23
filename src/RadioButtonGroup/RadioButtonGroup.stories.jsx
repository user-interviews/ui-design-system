import React, { useState } from 'react';
import {
  boolean, radios, text, withKnobs,
} from '@storybook/addon-knobs';
import { ORIENTATIONS } from '../ControlButtonGroup';
import RadioButtonGroup from './index';
import RadioButton from '../RadioButton';
import FormControlLabel from '../FormControlLabel';
import FormGroup from '../FormGroup/FormGroup';
import mdx from './RadioButtonGroup.mdx';

export default {
  title: 'Components/Form Elements/RadioButtonGroup',
  component: RadioButtonGroup,
  decorators: [withKnobs()],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

/* eslint-disable react/prop-types */
const RadioButtonGroupComponent = ({
  bordered,
  children,
  defaultValue,
  elementType,
  fullWidth,
  id,
  inline,
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
      <RadioButtonGroup
        fullWidth={fullWidth}
        id="button-group"
        orientation={orientation}
        value={value}
        onChange={setValue}
      >
        { children }
      </RadioButtonGroup>
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
    <RadioButtonGroupComponent
      bordered={boolean('Bordered Form Group', false)}
      defaultValue={null}
      elementType="fieldset"
      fullWidth={boolean('Full width', false)}
      id="with-radio-button-group"
      label="Legend"
      labelHelperText="use the knobs to try out different variations"
      labelHtmlFor="radio-button-group"
      orientation={orientation}
    >
      <FormControlLabel
        bordered={bordered}
        Control={RadioButton}
        id="value-1"
        text={text('Label 1', 'Value 1')}
        value="1"
      />
      <FormControlLabel
        bordered={bordered}
        Control={RadioButton}
        id="value-2"
        text={text('Label 2', 'Value 2')}
        value="2"
      />
      <FormControlLabel
        bordered={bordered}
        Control={RadioButton}
        id="value-3"
        text={text('Label 3', 'Value 3')}
        value="3"
      />
    </RadioButtonGroupComponent>
  );
};

export const Row = () => (
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

export const BorderedRow = () => (
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

export const DescriptionColumn = () => (
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

export const DescriptionRow = () => (
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

export const BorderedColumnFullWidth = () => (
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
