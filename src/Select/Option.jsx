import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { components } from 'react-select';

import CheckboxButton from 'src/CheckboxButton';
import './Option.scss';

// Replaceable Components
// Option: Component responsible for displaying an option in the menu with a Checkbox.
//
// This is a replaceable component. If you need to deviate from this replaceable component,
// reach out to the DS team first before creating your own replaceable component.
//
// See: https://react-select.com/components#replaceable-components

/* eslint-disable react/prop-types */
const Option = forwardRef(({ indeterminate, ...props }, ref) => (
  <components.Option {...props}>
    <div className="Option">
      <CheckboxButton
        checked={props.isSelected}
        className="Checkbox"
        id={props.label}
        indeterminate={indeterminate}
        ref={ref}
        onChange={() => null}
      />
      <div className="TitleDescriptionContainer">
        <label
          className={classNames({
            'Label--bold': props.boldLabel,
          })}
        >
          {props.label}
        </label>
        { props.description && (
          <span className="Description">{ props.description }</span>
        )}
      </div>
    </div>
  </components.Option>
));
/* eslint-enable react/prop-types */

export default Option;
