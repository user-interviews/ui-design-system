import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isValid } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/pro-regular-svg-icons';

export const PickerEnforcedInput = forwardRef(({
  disabled,
  inputClassName,
  name,
  onClick,
  startDate,
  value,
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

PickerEnforcedInput.propTypes = {
  disabled: PropTypes.bool,
  inputClassName: PropTypes.string,
  name: PropTypes.string,
  startDate: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
};

PickerEnforcedInput.defaultProps = {
  disabled: false,
  value: '',
  onClick: undefined,
  inputClassName: '',
  startDate: '',
  name: '',
};
