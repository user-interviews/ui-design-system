import classNames from 'classnames';
import React from 'react';

import './ModalBody.scss';

type ModalBodyProps = {
  children: React.ReactNode;
  className?: string;
};

function ModalBody({ children, className }: ModalBodyProps) {
  return <div className={classNames('ModalBody', className)}>{children}</div>;
}

export default ModalBody;
