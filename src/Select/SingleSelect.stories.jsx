import React, { Fragment } from 'react';

import SingleSelect from 'src/Select/SingleSelect';

import Option from './Option';
import ValueContainer from './ValueContainer';

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

export const CustomOptionWithCheckbox = () => (
  <Fragment>
    <label htmlFor="multi-select" id="select-label-custom-option">Custom option with checkbox</label>
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

export const CustomValueContainer = () => (
  <Fragment>
    <label htmlFor="custom-value-container-select" id="select-label-custom-value-container">
      Custom value container
    </label>
    <SingleSelect
      aria-labelledby="select-label"
      closeMenuOnSelect={false}
      components={{
        Option,
        ValueContainer: (props) => (
          <ValueContainer
            {...props}
            /* eslint-disable react/prop-types */
            valueText={`participant${props.getValue().length > 1 ? 's' : ''} selected`}
            /* eslint-enable react/prop-types */
          />
        ),
      }}
      hideSelectedOptions={false}
      id="custom-value-container-select"
      isMulti
      options={options}
      onChange={onChange}
    />
  </Fragment>
);
