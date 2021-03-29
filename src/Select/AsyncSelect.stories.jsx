import React, { Fragment } from 'react';

import AsyncSelect from 'src/Select/AsyncSelect';

export default {
  title: 'Design System/Selects/Async',
  component: AsyncSelect,
};

const options = [
  { label: 'Bob', value: 1 },
  { label: 'Dave', value: 2 },
  { label: 'Jeff', value: 3 },
  { label: 'Dennis', value: 4 },
  { label: 'Basel', value: 5 },
];

async function loadOptions(search) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!search || !search.length) { return options; }

  return options.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase()));
}

export const Default = () => (
  <AsyncSelect
    aria-label="Async select"
    getOptionLabel={({ label }) => label}
    getOptionValue={({ value }) => value}
    loadOptions={loadOptions}
    noOptionsMessage={({ inputValue }) => inputValue.length ? 'No results!' : 'Type to search...'}
  />
);

export const Labeled = () => (
  <Fragment>
    <label htmlFor="async-select" id="async-label">A labeled select</label>
    <AsyncSelect
      aria-labelledby="async-label"
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      id="async-select"
      loadOptions={loadOptions}
      noOptionsMessage={({ inputValue }) => inputValue.length ? 'No results!' : 'Type to search...'}
    />
  </Fragment>
);
