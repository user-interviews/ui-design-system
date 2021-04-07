import React from 'react';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import './Modal.scss';

export const MODAL_SIZES = { SMALL: 'small', MEDIUM: 'medium', LARGE: 'large' };

const Modal = (props) => {
  const { size } = props;
  let { className } = props;

  if (size === MODAL_SIZES.MEDIUM) {
    className = classNames(className, 'ReactModal--medium');
  } else if (size === MODAL_SIZES.LARGE) {
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
  size: MODAL_SIZES.SMALL,
  className: undefined,
};

export default Modal;
