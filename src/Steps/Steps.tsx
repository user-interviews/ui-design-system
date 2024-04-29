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

const Steps = ({
  children,
  className,
  ...props
}: StepsProps) => (
  <div className={classNames('Steps', className)} {...props}>
    {children}
  </div>
);

Steps.defaultProps = {
  children: undefined,
  className: undefined,
};

export default Steps;
