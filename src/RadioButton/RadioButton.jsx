import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import styles from './RadioButton.module.scss';

const RadioButton = React.forwardRef(({
  checked,
  className,
  disabled,
  id,
  name,
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
    value={value}
    onChange={onChange}
    {...rest}
  />
));

RadioButton.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func,
};

RadioButton.defaultProps = {
  checked: undefined,
  className: undefined,
  disabled: false,
  name: '',
  value: undefined,
  onChange: undefined,
};

RadioButton.displayName = 'RadioButton';

export default RadioButton;
