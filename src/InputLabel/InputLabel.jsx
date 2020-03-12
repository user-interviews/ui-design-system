import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './InputLabel.scss';

export default function InputLabel(props) {
  return (
    <label
      className={classNames('InputLabel', props.className)}
      htmlFor={props.labelHtmlFor}
    >
      {props.text}
      {props.required && <span className="InputLabel__helper-text">&nbsp;(required)</span>}
    </label>
  );
}

InputLabel.propTypes = {
  className: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  required: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

InputLabel.defaultProps = {
  className: '',
  labelHtmlFor: '',
  required: false,
};
