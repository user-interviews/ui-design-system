import React, { Fragment } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import SingleSelect from '../src/Select/SingleSelect';

import { withPadding } from './decorators';

const onChange = () => {};

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
  <SingleSelect aria-label="Default select" options={options} onChange={onChange} />
);

export const Searchable = () => (
  <SingleSelect aria-label="Searchable select" isSearchable options={options} onChange={onChange} />
);

export const Loading = () => (
  <SingleSelect aria-label="Loading select" isLoading options={options} onChange={onChange} />
);

export const Labeled = () => (
  <Fragment>
    <label htmlFor="labeled-select" id="select-label">Labeled select</label>
    <SingleSelect
      aria-labelledby="select-label"
      id="labeled-select"
      options={options}
      onChange={onChange}
    />
  </Fragment>
);
