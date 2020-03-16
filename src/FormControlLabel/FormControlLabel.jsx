import React from 'react';
import PropTypes from 'prop-types';

import './FormControlLabel.scss';

export default function FormControlLabel(props) {
  return (
    <label
      className="FormControlLabel"
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
  labelHtmlFor: PropTypes.string,
  text: PropTypes.string.isRequired,
};

FormControlLabel.defaultProps = {
  labelHtmlFor: '',
};
