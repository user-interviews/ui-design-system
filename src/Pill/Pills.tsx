import React from 'react';
import classNames from 'classnames';

import './Pills.scss';

type PillsProps = {
  className?: string;
  children?: React.ReactNode;
};

function Pills({
  children,
  className,
  ...props
}: PillsProps) {
  return (
    <div
      className={classNames('Pills', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Pills;
