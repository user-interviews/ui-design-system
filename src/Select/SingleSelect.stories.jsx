import React, { Fragment } from 'react';

import { components } from 'react-select';
import CheckboxButton from 'src/CheckboxButton';
import SingleSelect from 'src/Select/SingleSelect';

const onChange = () => {};

export default {
  title: 'Design System/Selects/Single',
  component: SingleSelect,
};

const options = [
  { label: 'White', value: 1 },
  { label: 'Black / African American', value: 2 },
  { label: 'American Indian / Alaska Native', value: 3 },
  { label: 'Asian', value: 4 },
  { label: 'Native Hawaiian / Pacific Islander', value: 5 },
  { label: 'Hispanic / Latinx', value: 6 },
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

export const MultiSelect = () => (
  <Fragment>
    <label htmlFor="multi-select" id="select-label">Multi select</label>
    <SingleSelect
      aria-labelledby="select-label"
      id="multi-select"
      isMulti
      options={options}
      onChange={onChange}
    />
  </Fragment>
);

// Custom option with checkbox example
/* eslint-disable react/prop-types */
const Option = (props) => (
  <div>
    <components.Option {...props}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label>{props.label}</label>
        <CheckboxButton
          checked={props.isSelected}
          id={props.label}
          onChange={() => null}
        />
      </div>
    </components.Option>
  </div>
  );
/* eslint-enable react/prop-types */

export const MultiSelectWithCheckboxOption = () => (
  <Fragment>
    <label htmlFor="multi-select" id="select-label">Multi select with checkbox option</label>
    <SingleSelect
      aria-labelledby="select-label"
      closeMenuOnSelect={false}
      components={{
        Option,
      }}
      hideSelectedOptions={false}
      id="multi-select"
      isMulti
      options={options}
      onChange={onChange}
    />
  </Fragment>
);
