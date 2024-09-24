import React, { forwardRef } from 'react';

import classNames from 'classnames';
import { isValid } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '../font_awesome/regular';

type PickerEnforcedInputProps = {
  disabled?: boolean;
  inputClassName?: string;
  name?: string;
  startDate?: string;
  value?: string;
  onClick?: (...args: unknown[]) => unknown;
};

export const PickerEnforcedInput = forwardRef<HTMLInputElement, PickerEnforcedInputProps>(({
  disabled = false,
  inputClassName = '',
  name = '',
  onClick,
  startDate = '',
  value = '',
}, ref) => {
  const startDateIsValid = () => isValid(startDate);

  return (
    <div className="input-group">
      <input
        className={classNames(inputClassName, { 'is-invalid': startDateIsValid() })}
        disabled={disabled}
        id={name}
        name={name}
        readOnly
        ref={ref}
        title={name}
        value={value}
        onClick={onClick}
      />
      <button
        aria-label="Open date picker"
        className="input-group-text"
        type="button"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faCalendarAlt} />
      </button>
    </div>
  );
});
