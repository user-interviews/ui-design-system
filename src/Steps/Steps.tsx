import React from 'react';
import classNames from 'classnames';

import './Steps.scss';

type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type StepsProps = DivProps & {
  children?: React.ReactNode;
  className?: string;
};

function Steps({
  children,
  className,
  ...props
}: StepsProps) {
  return (
    <div className={classNames('Steps', className)} {...props}>
      {children}
    </div>
  );
}

export default Steps;
