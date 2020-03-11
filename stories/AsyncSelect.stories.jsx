import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import AsyncSelect from '../src/Select/AsyncSelect';

const withPadding = (story) => <div style={{ padding: '1rem' }}>{story()}</div>;

export default {
  title: 'Design System/Selects/Async',
  component: AsyncSelect,
  decorators: [withA11y, withPadding],
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
    getOptionLabel={({ label }) => label}
    getOptionValue={({ value }) => value}
    loadOptions={loadOptions}
    noOptionsMessage={(search) => search.length ? 'No results!' : 'Type to search...'}
  />
);
