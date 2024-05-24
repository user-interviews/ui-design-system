import React, { useState } from 'react';

import FormGroup from '../FormGroup';
import { Heading } from '../Heading';
import MoneyInput from './MoneyInput';

import mdx from './MoneyInput.mdx';

export default {
  title: 'Components/MoneyInput',
  component: MoneyInput,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  const [value, setValue] = useState<number | null>(1250.99);

  const handleOnValueChange = (val) => {
    if (!val) {
      setValue(null);
      return;
    }
    setValue(val);
  };

  return (
    <>
      <FormGroup label="Incentive amount" labelHtmlFor="money-input-1">
        <MoneyInput
          value={value}
          onValueChange={handleOnValueChange}
          {...args}
        />
        <br />
        <Heading level={1} size="md">Value: {value}</Heading>
      </FormGroup>
    </>
  );
};

Default.args = {
  id: 'money-input-1',
  placeholder: 'Please enter a number',
  decimalsLimit: 2,
};

export const Step = (args) => {
  const [value, setValue] = useState<number | null>(200);

  const handleOnValueChange = (val) => {
    if (!val) {
      setValue(null);
      return;
    }
    setValue(val);
  };

  return (
    <>
      <FormGroup
        helperText="Use the Up Arrow (↑) or Down Arrow (↓) to adjust the incremental value change"
        label="Incentive amount"
        labelHtmlFor="money-input-2"
      >
        <MoneyInput
          value={value}
          onValueChange={handleOnValueChange}
          {...args}
        />
        <br />
        <Heading level={1} size="md">Value: {value}</Heading>
      </FormGroup>
    </>
  );
};

Step.args = {
  decimalsLimit: 2,
  id: 'money-input-2',
  placeholder: 'Please enter a number',
  step: 1,
};

export const Prefix = (args) => {
  const [value, setValue] = useState<number | null>(500);

  const handleOnValueChange = (val) => {
    if (!val) {
      setValue(null);
      return;
    }
    setValue(val);
  };

  return (
    <>
      <FormGroup
        helperText="Change the prefix"
        label="Incentive amount"
        labelHtmlFor="money-input-3"
      >
        <MoneyInput
          value={value}
          onValueChange={handleOnValueChange}
          {...args}
        />
        <br />
        <Heading level={1} size="md">Value: {value}</Heading>
      </FormGroup>
    </>
  );
};

Prefix.args = {
  decimalsLimit: 2,
  id: 'money-input-3',
  placeholder: 'Please enter a number',
  prefix: 'USD$ ',
  step: 1,
};
