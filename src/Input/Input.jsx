import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Input.scss';

const Input = React.forwardRef((props, ref) => {
  const {
    disabled,
    id,
    leadingIcon,
    name,
    placeholder,
    trailingIcon,
    trailingIconOnClick,
    trailingIconOnClickSubmit,
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
        <div className="input-group-text">
          <FontAwesomeIcon icon={leadingIcon} />
        </div>
      )}

      <input
        className={inputClasses}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {(trailingIcon && trailingIconOnClick) && (
        <button
          className="trailing-icon-button"
          type={trailingIconOnClickSubmit ? 'submit' : 'button'}
          onClick={trailingIconOnClick}
        >
          <div className="input-group-text">
            <FontAwesomeIcon icon={trailingIcon} />
          </div>
        </button>
      )}
      {(trailingIcon && !trailingIconOnClick) && (
        <div className="input-group-text">
          <FontAwesomeIcon icon={trailingIcon} />
        </div>
      )}
    </div>
  );
});

Input.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  leadingIcon: PropTypes.object,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  trailingIcon: PropTypes.object,
  trailingIconOnClick: PropTypes.func,
  trailingIconOnClickSubmit: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  disabled: false,
  leadingIcon: undefined,
  placeholder: '',
  trailingIcon: undefined,
  trailingIconOnClick: undefined,
  trailingIconOnClickSubmit: false,
  type: 'text',
  value: undefined,
  onChange: undefined,
};

Input.displayName = 'Input';

export default Input;
