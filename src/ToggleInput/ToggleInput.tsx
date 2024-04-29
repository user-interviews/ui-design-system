import React from 'react';
import classNames from 'classnames';
import Toggle from 'react-toggle';

import './ToggleInput.scss';

type ToggleInputProps = {
 /**
  The value of the aria-label attribute of the wrapped `<input>` element.
 */
 ariaLabel?: string;
 /**
  The value of the aria-labelledby attribute of the wrapped `<input>` element.
 */
 ariaLabelledBy?: string;
 /**
  If true, the toggle is disabled. If false, the toggle is enabled.
 */
 disabled?: boolean;
 /**
  The value of the id attribute of the wrapped `<input>` element
 */
 id: string;
 /**
  If true, the toggle is checked. If false, the toggle is unchecked.
  Use this if you want to treat the toggle as a controlled component.
 */
 isChecked?: boolean;
 /**
  If true, the input label will be on the left.
 */
 labelLeft?: boolean;
 labelText: string;
 /**
  The value of the name attribute of the wrapped `<input>` element.
 */
 name?: string;
 // eslint-disable-next-line camelcase
 UNSAFE_className?: string;
 /**
  Callback function to invoke when the user clicks on the toggle.
  The function signature should be the following: function(e) { }.
  To get the current checked status from the event, use e.target.checked.
 */
 onToggle?: (...args: unknown[]) => unknown;
};

const ToggleInput = ({
 ariaLabel,
 ariaLabelledBy,
 disabled,
 id,
 isChecked,
 labelLeft,
 labelText,
 name,
 onToggle,

 // eslint-disable-next-line camelcase
 UNSAFE_className,
}: ToggleInputProps) => (
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

ToggleInput.defaultProps = {
  ariaLabel: undefined,
  ariaLabelledBy: undefined,
  disabled: false,
  isChecked: false,
  labelLeft: false,
  name: undefined,
  UNSAFE_className: undefined,
  onToggle: undefined,
};

export default ToggleInput;
