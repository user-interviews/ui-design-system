import React from 'react';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import './Input.scss';

type InputElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type InputProps = InputElementProps & {
  disabled?: boolean;
  /** Required `id` on the native `<input>`. */
  id: string;
  /** Icon in the leading `input-group-text`. */
  leadingIcon?: IconDefinition;
  /** Required `name` on the native `<input>`. */
  name: string;
  placeholder?: string;
  /** Icon after the field; pair with `trailingIconOnClick` for a button, otherwise decorative. */
  trailingIcon?: IconDefinition;
  /** `aria-label` on the trailing icon button when `trailingIconOnClick` is set. */
  trailingIconLabel?: string;
  /** When set with `trailingIcon`, wraps the icon in a clickable trailing control. */
  trailingIconOnClick?: (...args: unknown[]) => unknown;
  /** `type` on that trailing control (`button` vs `submit`; default `button`). */
  trailingIconOnClickSubmit?: boolean;
  /** Static suffix text after the input (layout class adjusts for `type="number"`). */
  trailingText?: string;
  type?: string;
  value?: string;
  min?: string | number;
  max?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    disabled,
    id,
    leadingIcon,
    name,
    placeholder = '',
    trailingIcon,
    trailingIconLabel = '',
    trailingIconOnClick,
    trailingIconOnClickSubmit,
    trailingText,
    type = 'text',
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
        <span
          className={`input-trailing-text ${type === 'number' ? 'input-trailing-text--input-type-number' : ''}`}
        >
          {trailingText}
        </span>
      )}
      {trailingIcon && trailingIconOnClick && (
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
      {trailingIcon && !trailingIconOnClick && (
        <div className="input-group-text">
          <FontAwesomeIcon icon={trailingIcon} />
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
