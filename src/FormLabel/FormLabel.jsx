import React from 'react';
import PropTypes from 'prop-types';

import './FormLabel.scss';

export default function FormLabel(props) {
  const {
    labelHtmlFor,
    required,
    text,
  } = props;

  return (
    <label className="FormLabel" htmlFor={labelHtmlFor}>
      {text}
      {required && <span className="helper-text">&nbsp;(required)</span>}
    </label>
  );
}

FormLabel.propTypes = {
  labelHtmlFor: PropTypes.string,
  required: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

FormLabel.defaultProps = {
  labelHtmlFor: '',
  required: false,
};
