import React, { useState } from 'react';
import { ToggleInput } from 'src/ToggleInput';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';

import mdx from './ToggleInput.mdx';

export default {
  title: 'Components/ToggleInput',
  component: ToggleInput,
  decorators: [withKnobs],
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
      id="1"
      isChecked={boolean('Checked', isChecked)}
      labelLeft={boolean('Label left', false)}
      labelText={text('Label text', 'Label')}
      onToggle={handleChange}
    />
  );
};
