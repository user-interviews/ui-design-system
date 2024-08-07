import React, { useState } from 'react';
import { ToggleInput } from '.';

import mdx from './ToggleInput.mdx';

export default {
  title: 'Components/ToggleInput',
  component: ToggleInput,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export function Default() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <ToggleInput
      id="1"
      isChecked={isChecked}
      labelLeft={false}
      labelText="Label"
      onToggle={handleChange}
    />
  );
}

export function Checked() {
  const [isChecked, setIsChecked] = useState(true);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <ToggleInput
      id="1"
      isChecked={isChecked}
      labelLeft={false}
      labelText="Label"
      onToggle={handleChange}
    />
  );
}

export function LabelLeft() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <ToggleInput
      id="1"
      isChecked={isChecked}
      labelLeft
      labelText="Label"
      onToggle={handleChange}
    />
  );
}

export function Disabled() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <ToggleInput
      disabled
      id="2"
      isChecked={isChecked}
      labelLeft={false}
      labelText="Label"
      onToggle={handleChange}
    />
  );
}
