import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import * as styles from './CheckboxButton.module.scss';

export const CHECKED_STATES = {
  CHECKED: true,
  UNCHECKED: false,
  INDETERMINATE: 'indeterminate',
};

const CheckboxButton = React.forwardRef(({
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
    if (ref && ref.current) {
      const checkboxRef = ref.current;
      checkboxRef.indeterminate = indeterminate;
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
// The rule is configured to not care about default props for function
// components but because this is a forwardRef it is being triggered
/* eslint-disable react/require-default-props */
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
    PropTypes.bool,
  ]),
  onChange: PropTypes.func,
};
/* eslint-enable react/require-default-props */

CheckboxButton.displayName = 'CheckboxButton';

export default CheckboxButton;
