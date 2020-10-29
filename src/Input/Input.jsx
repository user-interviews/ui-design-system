import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Input.scss';

export default function Input(props) {
  const {
    disabled,
    id,
    leadingIcon,
    name,
    placeholder,
    trailingIcon,
    type,
    value,
    onChange,
    ...rest
  } = props;

  const inputClasses = classNames('Input form-control', {
    'Input--with-leading-icon': leadingIcon,
    'Input--with-trailing-icon': trailingIcon,
  });

  return (
    <div className="Input input-group">
      {leadingIcon && (
        <div className="input-group-prepend">
          <div className="input-group-text">
            <FontAwesomeIcon icon={leadingIcon} />
          </div>
        </div>
      )}

      <input
        className={inputClasses}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />

      {trailingIcon && (
        <div className="input-group-append">
          <div className="input-group-text">
            <FontAwesomeIcon icon={trailingIcon} />
          </div>
        </div>
      )}
    </div>
  );
}

Input.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  leadingIcon: PropTypes.object,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  trailingIcon: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  disabled: false,
  leadingIcon: undefined,
  placeholder: '',
  trailingIcon: undefined,
  type: 'text',
  value: '',
  onChange: undefined,
};
