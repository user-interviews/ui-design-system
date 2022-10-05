import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tooltip from 'src/Tooltip';

import 'scss/forms/input_label.scss';

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
  const inputLabelChildren = (
    <>
      {text}
      {required && <span className="InputLabel__helper-text">&nbsp;(Required)</span>}
      {labelHelperText && <span className="InputLabel__helper-text">&nbsp;({labelHelperText})</span>}
      {tooltipText && <Tooltip iconClasses="Tooltip__icon" placement="right" text={tooltipText} />}
    </>
  );

  return (
    <label
      className={classNames('InputLabel', className)}
      htmlFor={labelHtmlFor}
      {...props}
    >
      {inputLabelChildren}
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
