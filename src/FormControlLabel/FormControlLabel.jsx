import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './FormControlLabel.scss';

export default function FormControlLabel(props) {
  return (
    <label
      className={classnames('FormControlLabel', props.className)}
      htmlFor={props.labelHtmlFor}
    >
      <span className="FormControlLabel__control">
        {props.children}
      </span>

      {props.text}
    </label>
  );
}

FormControlLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  text: PropTypes.string.isRequired,
};

FormControlLabel.defaultProps = {
  className: undefined,
  labelHtmlFor: '',
};
