import React from 'react';
import classNames from 'classnames';
import ReactModal, { type ReactModalProps } from 'react-modal';

import './Modal.scss';

export const MODAL_SIZES = { SMALL: 'small', MEDIUM: 'medium', LARGE: 'large' } as const;

type ModalProps = {
  className?: string;
  size?: typeof MODAL_SIZES[keyof typeof MODAL_SIZES];
} & ReactModalProps;

const Modal = ({
  size = 'small',
  className,
  ...props
}: ModalProps) => {
  let componentClassName = '';

  if (size === MODAL_SIZES.MEDIUM) {
    componentClassName = classNames(className, 'ReactModal--medium');
  } else if (size === MODAL_SIZES.LARGE) {
    componentClassName = classNames(className, 'ReactModal--large');
  }

  return (
    <ReactModal {...props} className={componentClassName} />
  );
};

export default Modal;
