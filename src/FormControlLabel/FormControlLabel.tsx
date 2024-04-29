import React from 'react';
import classnames from 'classnames';

import 'scss/forms/form_control_label.scss';

type FormControlLabelProps = {
  bordered?: boolean;
  checked?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Control: React.ComponentType<any>;
  children?: React.ReactNode;
  disabled?: boolean;
  helperText?: string;
  id: string;
  text: React.ReactNode;
  value?: string;
  name?: string;
  onChange?: React.ChangeEventHandler;
  onClick?: (event: MouseEvent) => void;
};

const FormControlLabel = React.forwardRef<HTMLElement, FormControlLabelProps>(({
  bordered,
  checked,
  children,
  className,
  Control,
  disabled,
  helperText,
  id,
  text,
  ...controlProps
}, ref) => (
  <label
    className={classnames(
      'FormControlLabel',
      className,
      {
        'FormControlLabel--bordered': bordered,
        'FormControlLabel--active': checked,
        'FormControlLabel--with-children': !!children,
        'FormControlLabel--disabled': bordered && disabled,
      },
    )}
    htmlFor={id}
  >
    <span className="FormControlLabel__label">
      <Control
        checked={checked}
        className="FormControlLabel__control"
        disabled={disabled}
        id={id}
        ref={ref}
        {...controlProps}
      />
      {text}
      { helperText && <span className="FormControlLabel__helper-text">&nbsp;({helperText})</span> }
    </span>
    {children && (
      <span className="FormControlLabel__children">
        {children}
      </span>
    )}
  </label>
));

export default FormControlLabel;
