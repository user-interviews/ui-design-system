import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tooltip from 'src/Tooltip';

import 'scss/forms/input_label.scss';
import './InputLabel.scss';

const InputLabel = ({
  className,
  elementType,
  labelHtmlFor,
  text,
  required,
  labelHelperText,
  tooltipText,
  ...props
}) => {
  const renderInputLabelChildren = () => (
    <>
      {text}
      {required && <span className="InputLabel__helper-text">&nbsp;(Required)</span>}
      {labelHelperText && <span className="InputLabel__helper-text">&nbsp;({labelHelperText})</span>}
      {tooltipText && <Tooltip iconClasses="Tooltip__icon--gray" placement="right" text={tooltipText} />}
    </>
  );

  const isLegendNeeded = elementType === 'radio' || elementType === 'checkbox';

  // For accessibility purposes, InputLabels with radio or checkbox inputs
  // will render as a <legend>
  if (isLegendNeeded) {
    return (
      <legend
        className={classNames('InputLabel', className)}
        htmlFor={labelHtmlFor}
        {...props}
      >
        {renderInputLabelChildren()}
      </legend>
    );
  }

  return (
    <label
      className={classNames('InputLabel', className)}
      htmlFor={labelHtmlFor}
      {...props}
    >
      {renderInputLabelChildren()}
    </label>
  );
};

InputLabel.propTypes = {
  className: PropTypes.string,
  elementType: PropTypes.string,
  labelHelperText: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  required: PropTypes.bool,
  text: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
};

InputLabel.defaultProps = {
  className: '',
  elementType: undefined,
  labelHelperText: undefined,
  labelHtmlFor: '',
  required: false,
  tooltipText: undefined,
};

export default InputLabel;
