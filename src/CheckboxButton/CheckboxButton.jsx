import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const CHECKED_STATES = {
  CHECKED: true,
  UNCHECKED: false,
  INDETERMINATE: 'indeterminate',
};

const CheckboxButton = React.forwardRef(({
  checked,
  className,
  disabled,
  id,
  indeterminate,
  name,
  value,
  onChange,
  ...rest
}, ref) => {
  useEffect(() => {
    if (ref && ref.current) {
      const checkboxRef = ref.current;
      checkboxRef.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);

  return (
    <input
      checked={checked}
      className={className}
      disabled={disabled}
      id={id}
      name={name}
      ref={ref}
      type="checkbox"
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
});

CheckboxButton.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  indeterminate: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func,
};

CheckboxButton.defaultProps = {
  checked: undefined,
  className: undefined,
  disabled: undefined,
  indeterminate: undefined,
  name: undefined,
  value: undefined,
  onChange: undefined,
};

CheckboxButton.displayName = 'CheckboxButton';

export default CheckboxButton;
