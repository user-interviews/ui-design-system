import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Checkbox.scss';

export default function Checkbox(props) {
  const classNames = classnames('Checkbox', {
    'Checkbox--bordered': props.bordered,
  });

  return (
    <label className={classNames}>
      <input
        className="Checkbox__input"
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        type="radio"
        {...props.checkboxProps}
      />

      {props.label && (
        <span className="Checkbox__label">{props.label}</span>
      )}

      {props.children && (
        <div className="Checkbox__children">
          {props.children}
        </div>
      )}
    </label>
  );
}

Checkbox.propTypes = {
  bordered: PropTypes.bool,
  checkboxProps: PropTypes.object,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
};

Checkbox.defaultProps = {
  bordered: false,
  checkboxProps: {},
  children: null,
  disabled: false,
  name: '',
};
