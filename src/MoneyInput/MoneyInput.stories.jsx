import React, { useState } from 'react';

import FormGroup from 'src/FormGroup';
import { Heading } from 'src/Heading';
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
  const [value, setValue] = useState(1250.99);

  const handleOnValueChange = (val) => {
    if (!val) {
      setValue('');
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
        <Heading>Value: {value}</Heading>
      </FormGroup>
    </>
  );
};

Default.args = {
  id: 'money-input-1',
  placeholder: 'Please enter a number',
  decimalsLimit: 2,
};

export const Prefix = (args) => {
  const [value, setValue] = useState(2500.55);

  const handleOnValueChange = (val) => {
    if (!val) {
      setValue('');
      return;
    }
    setValue(val);
  };

  return (
    <>
      <FormGroup label="Incentive amount" labelHtmlFor="money-input-2">
        <MoneyInput
          value={value}
          onValueChange={handleOnValueChange}
          {...args}
        />
      </FormGroup>
      <br />
      <Heading>Value: {value}</Heading>
    </>
  );
};

Prefix.args = {
  id: 'money-input-2',
  placeholder: 'Please enter incentive amount',
  prefix: '$',
  decimalsLimit: 2,
};
