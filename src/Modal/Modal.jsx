import React from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

export const MODAL_SIZES = { SMALL: 'small', LARGE: 'large' };

const Modal = (props) => {
  const { size } = props;
  let { className } = props;

  if (size === MODAL_SIZES.LARGE) {
    className = classNames(className, 'ReactModal--large');
  }

  return (
    <ReactModal {...props} className={className} />
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(MODAL_SIZES)),
};

Modal.defaultProps = {
  size: MODAL_SIZES.small,
  className: '',
};

export default Modal;
