import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './FormLabel.scss';

export default function FormLabel(props) {
  const {
    className,
    labelHtmlFor,
    legend,
    required,
    text,
  } = props;

  const label = labelHtmlFor ? <label htmlFor={labelHtmlFor}>{text}</label> : <span>{text}</span>;

  return (
    <div className={classNames('FormLabel', className)}>
      {label}
      {required && <span className="helper-text">&nbsp;(required)</span>}
      {legend}
    </div>
  );
}

FormLabel.propTypes = {
  className: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  legend: PropTypes.node,
  required: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

FormLabel.defaultProps = {
  className: '',
  labelHtmlFor: '',
  legend: undefined,
  required: false,
};
