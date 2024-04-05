import React, {
  forwardRef,
  useEffect,
  InputHTMLAttributes,
  type DetailedHTMLProps,
  type ChangeEventHandler,
} from 'react';

import classNames from 'classnames';

import styles from './CheckboxButton.module.scss';

export const CHECKED_STATES = {
  CHECKED: true,
  UNCHECKED: false,
  INDETERMINATE: 'indeterminate',
};

type CheckboxButtonProps = {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  id: string;
  indeterminate?: boolean;
  name?: string;
  value?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>['value'];
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const CheckboxButton = forwardRef<HTMLInputElement, CheckboxButtonProps>(({
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
    if (ref && 'current' in ref && ref.current) {
      const checkboxRef = ref.current;
      checkboxRef.indeterminate = !!indeterminate;
    }
  }, [indeterminate, ref]);

  return (
    <input
      checked={checked}
      className={classNames(className, styles.checkboxButton)}
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
