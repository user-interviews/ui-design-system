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

// Replaceable Components
// See: https://react-select.com/components#replaceable-components

/* eslint-disable react/prop-types */

// Option: Component responsible for displaying an option in the menu.

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

// Value Container: Container responsible for loading the placeholder value and the input.

const ValueContainer = ({ children, ...props }) => {
  const { getValue, hasValue } = props;
  const numValues = getValue().length;
  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }
  return (
    <components.ValueContainer {...props}>
      {`${numValues} items selected`}
    </components.ValueContainer>
  );
};
/* eslint-enable react/prop-types */

export const CustomOptionWithCheckbox = () => (
  <Fragment>
    <label htmlFor="multi-select" id="select-label">Custom option with checkbox</label>
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
    <label htmlFor="custom-value-container-select" id="select-label">Custom value container</label>
    <SingleSelect
      aria-labelledby="select-label"
      closeMenuOnSelect={false}
      components={{
        Option,
        ValueContainer,
      }}
      hideSelectedOptions={false}
      id="custom-value-container-select"
      isMulti
      options={options}
      onChange={onChange}
    />
  </Fragment>
);
