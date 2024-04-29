import React from 'react';
import classNames from 'classnames';
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Input.scss';

type InputElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type InputProps = InputElementProps & {
  disabled?: boolean;
  id: string;
  leadingIcon?: IconDefinition;
  name: string;
  placeholder?: string;
  trailingIcon?: IconDefinition;
  trailingIconLabel?: string;
  trailingIconOnClick?: (...args: unknown[]) => unknown;
  trailingIconOnClickSubmit?: boolean;
  trailingText?: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    disabled,
    id,
    leadingIcon,
    name,
    placeholder,
    trailingIcon,
    trailingIconLabel,
    trailingIconOnClick,
    trailingIconOnClickSubmit,
    trailingText,
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
      {trailingText && (
        <span className={`input-trailing-text ${type === 'number' ? 'input-trailing-text--input-type-number' : ''}`}>
          {trailingText}
        </span>
      )}
      {(trailingIcon && trailingIconOnClick) && (
        <button
          aria-label={trailingIconLabel}
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

export default Input;
