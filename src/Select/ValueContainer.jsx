import React from 'react';
import { components } from 'react-select';

import propTypes from 'prop-types';
import propTypes from 'prop-types';

// Replaceable Components
//
// Value Container: Container responsible for loading the placeholder value and the input.
//
// This is a replaceable component. If you need to deviate from this replaceable component,
// reach out to the DS team first before creating your own replaceable component.
//
// See: https://react-select.com/components#replaceable-components

function ValueContainer({ children, valueText = 'selected', ...props }) {
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
    <components.ValueContainer
      {...props}
    >{`${numValues} ${valueText}`}</components.ValueContainer>
  );
}

export default ValueContainer;

ValueContainer.propTypes = {
  children: propTypes.node,
  getValue: propTypes.func.isRequired,
  hasValue: propTypes.bool.isRequired,
  valueText: propTypes.string,
};

ValueContainer.defaultProps = {
  children: undefined,
  valueText: 'selected',
};
