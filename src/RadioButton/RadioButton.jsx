import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './RadioButton.scss';

const RadioButton = React.forwardRef((props, ref) => {
  const classNames = classnames('RadioButton', {
    'RadioButton--bordered': props.bordered,
  });

  return (
    <label className={classNames}>
      <input
        checked={props.checked}
        className="RadioButton__input"
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        ref={ref}
        type="radio"
        value={props.value}
        onChange={props.onChange}
        {...props.radioButtonProps}
      />

      {props.label && (
        <span className="RadioButton__label">{props.label}</span>
      )}

      {props.children && (
        <div className="RadioButton__children">
          {props.children}
        </div>
      )}
    </label>
  );
});

RadioButton.propTypes = {
  bordered: PropTypes.bool,
  checked: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  radioButtonProps: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func,
};

RadioButton.defaultProps = {
  bordered: false,
  checked: undefined,
  children: null,
  disabled: false,
  name: '',
  radioButtonProps: {},
  value: undefined,
  onChange: undefined,
};

RadioButton.displayName = 'RadioButton';

export default RadioButton;
