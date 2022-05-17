import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tooltip from 'src/Tooltip';

import 'scss/forms/input_label.scss';

const InputLabel = ({
  className,
  labelHtmlFor,
  text,
  required,
  labelHelperText,
  tooltipText,
  ...props
}) => (
  <label
    className={classNames('InputLabel', className)}
    htmlFor={labelHtmlFor}
    {...props}
  >
    {text}
    {required && <span className="InputLabel__helper-text">&nbsp;(Required)</span>}
    {labelHelperText && <span className="InputLabel__helper-text">&nbsp;({labelHelperText})</span>}
    {tooltipText && <Tooltip iconClasses="Tooltip__icon--gray" placement="right" text={tooltipText} />}
  </label>
  );

InputLabel.propTypes = {
  className: PropTypes.string,
  labelHelperText: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  required: PropTypes.bool,
  text: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
};

InputLabel.defaultProps = {
  className: '',
  labelHelperText: undefined,
  labelHtmlFor: '',
  required: false,
  tooltipText: undefined,
};

export default InputLabel;
