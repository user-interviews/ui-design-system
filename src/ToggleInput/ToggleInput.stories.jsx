import React, { useState } from 'react';
import ToggleInput from 'src/ToggleInput';

import mdx from './ToggleInput.mdx';

export default {
  title: 'Design System/ToggleInput',
  component: ToggleInput,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <ToggleInput
      disabled={disabled}
      id="1"
      isChecked={isChecked}
      labelText="Label"
      onToggle={handleChange}
    />
  );
};
