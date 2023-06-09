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
