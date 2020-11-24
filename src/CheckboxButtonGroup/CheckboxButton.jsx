import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './CheckboxButton.scss';

const CheckboxButton = ({
  checked,
  className,
  disabled,
  label,
  id,
  name,
  value,
  onChange,
  ...rest
}) => (
  <label
    className={classnames('CheckboxButton', {
      'CheckboxButton--active': checked,
    })}
    htmlFor={id}
  >
    <input
      checked={checked}
      className={classnames('CheckboxButton__input', className)}
      disabled={disabled}
      id={id}
      name={name}
      type="checkbox"
      value={value}
      onChange={onChange}
      {...rest}
    />

    <span className="CheckboxButton__label">{label}</span>
  </label>
);

CheckboxButton.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func,
};

CheckboxButton.defaultProps = {
  checked: false,
  className: undefined,
  disabled: undefined,
  name: undefined,
  onChange: undefined,
};

export default CheckboxButton;
