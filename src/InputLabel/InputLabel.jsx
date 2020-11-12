import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tooltip from 'src/Tooltip';

import './InputLabel.scss';

export default function InputLabel(props) {
  return (
    <label
      className={classNames('InputLabel', props.className)}
      htmlFor={props.labelHtmlFor}
    >
      {props.text}
      {props.required && <span className="InputLabel__helper-text">&nbsp;(Required)</span>}
      {props.tooltipText && <Tooltip iconClasses="Tooltip__icon--gray" placement="right" text={props.tooltipText} />}
    </label>
  );
}

InputLabel.propTypes = {
  className: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  required: PropTypes.bool,
  text: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
};

InputLabel.defaultProps = {
  className: '',
  labelHtmlFor: '',
  required: false,
  tooltipText: undefined,
};
