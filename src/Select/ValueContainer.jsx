import React from 'react';
import { components } from 'react-select';
import propTypes from 'prop-types';

// Replaceable Components
//
// Value Container: Container responsible for loading the placeholder value and the input.
//
// This is a replaceable component. If you need to deviate from this replaceable component,
// reach out to the DS team first before creating your own replaceable component.
//
// See: https://react-select.com/components#replaceable-components

/* eslint-disable react/prop-types */
const ValueContainer = ({ children, valueText, ...props }) => {
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
      {`${numValues} ${valueText}`}
    </components.ValueContainer>
  );
};
/* eslint-enable react/prop-types */

export default ValueContainer;

ValueContainer.propTypes = {
  children: propTypes.node,
  valueText: propTypes.string,
};

ValueContainer.defaultProps = {
  children: undefined,
  valueText: 'selected',
};
