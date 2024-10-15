import React from 'react';

import classNames from 'classnames';

import styles from './RadioButton.module.scss';

type RadioButtonProps = {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  id: string;
  name?: string;
  value?: number | string | boolean;
  onChange?: (...args: unknown[]) => unknown;
};

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(({
  checked,
  className,
  disabled = false,
  id,
  name = '',
  value,
  onChange,
  ...rest
}, ref) => (
  <input
    checked={checked}
    className={classNames(className, styles.radioButton)}
    disabled={disabled}
    id={id}
    name={name}
    ref={ref}
    type="radio"
    value={value?.toString()}
    onChange={onChange}
    {...rest}
  />
));

RadioButton.displayName = 'RadioButton';

export default RadioButton;
