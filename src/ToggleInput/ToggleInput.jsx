import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';

import './ToggleInput.scss';

function ToggleInput({
  ariaLabel,
  ariaLabelledBy,
  disabled = false,
  id,
  isChecked = false,
  labelLeft = false,
  labelText,
  name,
  onToggle,
  // eslint-disable-next-line camelcase
  UNSAFE_className,
}) {
  return (
    <label
      className={classNames(
      'ToggleInput__label',
      UNSAFE_className,
      { 'ToggleInput__label--disabled': disabled },
    )}
      htmlFor={id}
    >
      {labelLeft ? <span>{labelText}</span> : null}
      <Toggle
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        checked={isChecked}
        disabled={disabled}
        icons
        id={id}
        name={name}
        value={String(isChecked)}
        onChange={onToggle}
      />
      {!labelLeft ? <span>{labelText}</span> : null}
    </label>
  );
}

ToggleInput.propTypes = {
  /**
   The value of the aria-label attribute of the wrapped `<input>` element.
  */
  ariaLabel: PropTypes.string,
  /**
   The value of the aria-labelledby attribute of the wrapped `<input>` element.
  */
  ariaLabelledBy: PropTypes.string,
  /**
   If true, the toggle is disabled. If false, the toggle is enabled.
  */
  disabled: PropTypes.bool,
  /**
   The value of the id attribute of the wrapped `<input>` element
  */
  id: PropTypes.string.isRequired,
  /**
   If true, the toggle is checked. If false, the toggle is unchecked.
   Use this if you want to treat the toggle as a controlled component.
  */
  isChecked: PropTypes.bool,
  /**
   If true, the input label will be on the left.
  */
  labelLeft: PropTypes.bool,
  labelText: PropTypes.string.isRequired,
  /**
   The value of the name attribute of the wrapped `<input>` element.
  */
  name: PropTypes.string,
  UNSAFE_className: PropTypes.string,
  /**
   Callback function to invoke when the user clicks on the toggle.
   The function signature should be the following: function(e) { }.
   To get the current checked status from the event, use e.target.checked.
  */
  onToggle: PropTypes.func,
};

export default ToggleInput;
