import React from 'react';

import CreatableSelect from 'src/Select/CreatableSelect';

export default {
  title: 'Design System/Selects/Creatable',
  component: CreatableSelect,
  parameters: {
    a11y: {},
  }
};

const options = [
  { label: 'Red', value: 1 },
  { label: 'Green', value: 2 },
  { label: 'Blue', value: 3 },
];

export const Default = () => {
  const handleChange = () => {};
  const handleInputChange = () => {};

  return (
    <CreatableSelect
      isClearable
      options={options}
      onChange={handleChange}
      onInputChange={handleInputChange}
    />
  );
};
