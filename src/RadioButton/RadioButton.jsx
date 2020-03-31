import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './RadioButton.scss';

export default function RadioButton(props) {
  const classNames = classnames('RadioButton', {
    'RadioButton--bordered': props.bordered,
  });

  return (
    <label className={classNames}>
      <input
        className="RadioButton__input"
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        type="radio"
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
}

RadioButton.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  radioButtonProps: PropTypes.object,
};

RadioButton.defaultProps = {
  bordered: false,
  children: null,
  disabled: false,
  name: '',
  radioButtonProps: {},
};
