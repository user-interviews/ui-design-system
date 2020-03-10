import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './FormLabel.scss';

export default function FormLabel(props) {
  return (
    <label
      className={classNames('FormLabel', props.className)}
      htmlFor={props.labelHtmlFor}
    >
      {props.text}
      {props.required && <span className="FormLabel__helper-text">&nbsp;(required)</span>}
    </label>
  );
}

FormLabel.propTypes = {
  className: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  required: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

FormLabel.defaultProps = {
  className: '',
  labelHtmlFor: '',
  required: false,
};
