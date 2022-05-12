import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tooltip from 'src/Tooltip';

import 'scss/forms/input_label.scss';
import './InputLabel.scss';

export default function InputLabel(props) {
  return (
    <legend
      className={classNames('InputLabel', props.className)}
      htmlFor={props.labelHtmlFor}
    >
      {props.text}
      {props.required && <span className="InputLabel__helper-text">&nbsp;(Required)</span>}
      {props.labelHelperText && <span className="InputLabel__helper-text">&nbsp;({props.labelHelperText})</span>}
      {props.tooltipText && <Tooltip iconClasses="Tooltip__icon--gray" placement="right" text={props.tooltipText} />}
    </legend>
  );
}

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
