import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
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

const Option = forwardRef(({ indeterminate, ...props }, ref) => (
  <components.Option {...props}>
    <div className="Option">
      <div className="CheckboxContainer">
        <CheckboxButton
          checked={props.isSelected}
          className="Checkbox"
          id={props.label}
          indeterminate={indeterminate}
          ref={ref}
          onChange={() => null}
        />
      </div>
      <div className="TitleDescriptionContainer">
        <label
          className={classNames({
            'Label--bold': props.boldLabel,
          })}
        >
          {props.label}
        </label>
        {props.description && <span className="Description">{props.description}</span>}
      </div>
    </div>
  </components.Option>
));

Option.propTypes = {
  boldLabel: PropTypes.bool,
  description: PropTypes.string,
  indeterminate: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

Option.defaultProps = {
  boldLabel: false,
  description: undefined,
  indeterminate: false,
};

export default Option;
