import React from 'react';

import AsyncCreatable from 'src/Select/AsyncCreatable';

export default {
  title: 'Design System/Selects/AsyncCreatable',
  component: AsyncCreatable,
};

const onChange = () => {};

const options = [
  { label: 'Deebee', value: 1 },
  { label: 'Eebee', value: 2 },
  { label: 'Ollie', value: 3 },
  { label: 'Crumpet', value: 4 },
  { label: 'Venne4', value: 5 },
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
