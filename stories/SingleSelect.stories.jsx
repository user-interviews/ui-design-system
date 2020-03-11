import React from 'react';
import { withA11y } from '@storybook/addon-a11y';

import SingleSelect from '../src/Select/SingleSelect';

const onChange = () => {};

const withPadding = (story) => <div style={{ padding: '1rem' }}>{story()}</div>;

export default {
  title: 'Design System/Selects/Single',
  component: SingleSelect,
  decorators: [withA11y, withPadding],
};

const options = [
  { label: 'Bob', value: 1 },
  { label: 'Dave', value: 2 },
  { label: 'Jeff', value: 3 },
  { label: 'Dennis', value: 4 },
  { label: 'Basel', value: 5 },
];

export const Default = () => (
  <SingleSelect options={options} onChange={onChange} />
);

export const Searchable = () => (
  <SingleSelect isSearchable options={options} onChange={onChange} />
);

export const Loading = () => (
  <SingleSelect isLoading options={options} onChange={onChange} />
);
