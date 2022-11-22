import React from 'react';
import { components } from 'react-select';

import './OptionWithDescription.scss';

// Replaceable Components
// Option: Component responsible for displaying an option in the menu with a description.
//
// This is a replaceable component. If you need to deviate from this replaceable component,
// reach out to the DS team first before creating your own replaceable component.
//
// See: https://react-select.com/components#replaceable-components

/* eslint-disable react/prop-types */
const OptionWithDescription = ({ hideDescription, ...props }) => (
  <components.Option
    innerProps={{ 'aria-label': `${props.label}. ${props.data.description}` }}
    {...props}
  >
    <div className="OptionWithDescription">
      <label className="OptionWithDescription__label">
        {props.label}&nbsp;
        {props.data.labelDescription}
      </label>
      {!hideDescription && (
        <div className="OptionWithDescription__description">
          {props.data.description}
        </div>
      )}
    </div>
  </components.Option>
  );
/* eslint-enable react/prop-types */

export default OptionWithDescription;
