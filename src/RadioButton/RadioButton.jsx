import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function RadioButton(props) {
  return (
    <Fragment>
      <input
        className={props.className}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        type="radio"
        {...props}
      />
    </Fragment>
  );
}

RadioButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
};

RadioButton.defaultProps = {
  className: undefined,
  disabled: false,
  name: '',
};
