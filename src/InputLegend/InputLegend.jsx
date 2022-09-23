import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tooltip from 'src/Tooltip';

import './InputLegend.scss';
import 'scss/forms/input_label.scss';

const InputLegend = ({
  className,
  elementType,
  labelHtmlFor,
  text,
  required,
  labelHelperText,
  tooltipText,
  ...props
}) => {
  const inputLegendChildren = (
    <>
      {text}
      {required && <span className="InputLegend__helper-text">&nbsp;(Required)</span>}
      {labelHelperText && <span className="InputLegend__helper-text">&nbsp;({labelHelperText})</span>}
      {tooltipText && <Tooltip iconClasses="Tooltip__icon--gray" placement="right" text={tooltipText} />}
    </>
  );

  return (
    <legend
      className={classNames('InputLegend', className)}
      htmlFor={labelHtmlFor}
      {...props}
    >
      {inputLegendChildren}
    </legend>
  );
};

InputLegend.propTypes = {
  className: PropTypes.string,
  elementType: PropTypes.string,
  labelHelperText: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  required: PropTypes.bool,
  text: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
};

InputLegend.defaultProps = {
  className: '',
  elementType: undefined,
  labelHelperText: undefined,
  labelHtmlFor: '',
  required: false,
  tooltipText: undefined,
};

export default InputLegend;
