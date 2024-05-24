import React from 'react';
import classNames from 'classnames';
import './ModalBody.scss';

type ModalBodyProps = {
  children: React.ReactNode;
  className?: string;
};

const ModalBody = ({
  children,
  className,
}: ModalBodyProps) => (

  <div className={classNames('ModalBody', className)}>
    {children}
  </div>
);

export default ModalBody;
