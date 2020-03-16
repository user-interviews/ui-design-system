import React from 'react';
import PropTypes from 'prop-types';

export default function RadioButtonGroup(props) {
  return (
    <div
      className="RadioButtonGroup"
      name={props.name}
    >
      {props.children}
    </div>
  );
}

RadioButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
};

RadioButtonGroup.defaultProps = {
  name: '',
};
