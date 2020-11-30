import React from 'react';
import PropTypes from 'prop-types';

const CheckboxButton = ({
  checked,
  className,
  disabled,
  id,
  indeterminate,
  name,
  value,
  onChange,
  ...rest
}) => (
  <input
    checked={checked}
    className={className}
    disabled={disabled}
    id={id}
    indeterminate={indeterminate}
    name={name}
    type="checkbox"
    value={value}
    onChange={onChange}
    {...rest}
  />
);

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

export default CheckboxButton;
