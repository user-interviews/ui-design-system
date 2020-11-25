import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FormControlLabel from '../FormControlLabel';

import './CheckboxButton.scss';

const CheckboxButton = ({
  bordered,
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
  <FormControlLabel
    className={classnames('CheckboxButton', {
      'CheckboxButton--bordered': bordered,
      'CheckboxButton--active': bordered && checked,
    })}
    htmlFor={id}
    labelHtmlFor={id}
    text={label}
  >
    <input
      checked={checked}
      className={className}
      disabled={disabled}
      id={id}
      name={name}
      type="checkbox"
      value={value}
      onChange={onChange}
      {...rest}
    />
  </FormControlLabel>
);

CheckboxButton.propTypes = {
  bordered: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onChange: PropTypes.func,
};

CheckboxButton.defaultProps = {
  bordered: false,
  checked: undefined,
  className: undefined,
  disabled: undefined,
  name: undefined,
  value: undefined,
  onChange: undefined,
};

export default CheckboxButton;
