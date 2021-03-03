import React from 'react';
import PropTypes from 'prop-types';
import './ModalBody.scss';

// This component only provides a class wrapper (with a single CSS property!),
// but:
//
// 1. Keeps the API consistent w/ <ModalHeader> and <ModalFooter>.
// 2. The old modal had <ModalBody>, so transitioning may be easier.

const ModalBody = ({ children, className }) => (
  <div className={`ModalBody ${className}`}>
    {children}
  </div>
);

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ModalBody.defaultProps = {
  className: '',
};

export default ModalBody;
