import React from 'react';

import AsyncCreatable from 'src/Select/AsyncCreatable';

export default {
  title: 'Design System/Selects/AsyncCreatable',
  component: AsyncCreatable,
};

const onChange = () => {};

const options = [
  { label: 'red', value: 1 },
  { label: 'orange', value: 2 },
  { label: 'yellow', value: 3 },
  { label: 'green', value: 4 },
  { label: 'blue', value: 5 },
];

async function loadOptions(search) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!search || !search.length) { return options; }

  return options.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()));
}

export const Default = () => (
  <AsyncCreatable
    aria-label="Async creatable select"
    getOptionLabel={({ label }) => label}
    getOptionValue={({ value }) => value}
    loadOptions={loadOptions}
    onChange={onChange}
  />
);
