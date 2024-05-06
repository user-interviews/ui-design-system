import React from 'react';
import classNames from 'classnames';

type TableElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>

type TableHeadProps = TableElementProps & {
  children?: React.ReactNode;
  className?: string;
};

const TableHead = ({
  children,
  className,
  ...props
}: TableHeadProps) => (
  <thead
    className={classNames(
    'TableHead',
    className,
    )}
    {...props}
  >
    {children}
  </thead>
);

export default TableHead;
