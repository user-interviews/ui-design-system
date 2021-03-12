import React from 'react';
import PropTypes from 'prop-types';
import './ModalBody.scss';

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
  className: undefined,
};

export default ModalBody;
