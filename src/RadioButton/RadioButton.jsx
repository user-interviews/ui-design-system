import React from 'react';
import PropTypes from 'prop-types';

export default function RadioButton(props) {
  return (
    <input
      className="RadioButton"
      disabled={props.disabled}
      id={props.id}
      name={props.name}
      type="radio"
      {...props.radioButtonProps}
    />
  );
}

RadioButton.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  radioButtonProps: PropTypes.object,
};

RadioButton.defaultProps = {
  disabled: false,
  name: '',
  radioButtonProps: {},
};
