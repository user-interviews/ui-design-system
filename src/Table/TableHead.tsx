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

function TableHead({
  children,
  className,
  ...props
}: TableHeadProps) {
  return (
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
}

export default TableHead;
