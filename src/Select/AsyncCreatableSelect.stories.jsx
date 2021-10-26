import React from 'react';

import AsyncCreatableSelect from 'src/Select/AsyncCreatableSelect';

export default {
  title: 'Design System/Selects/AsyncCreatable',
  component: AsyncCreatableSelect,
};

const options = [
  { label: 'Red', value: 1 },
  { label: 'Green', value: 2 },
  { label: 'Blue', value: 3 },
];

async function loadOptions(search) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!search || !search.length) { return options; }

  return options.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()));
}

export const Default = () => {
  const handleChange = () => {};
  const handleInputChange = () => {};

  return (
    <AsyncCreatableSelect
      aria-label="Async creatable select"
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      isClearable
      loadOptions={loadOptions}
      onChange={handleChange}
      onInputChange={handleInputChange}
    />
  );
};
