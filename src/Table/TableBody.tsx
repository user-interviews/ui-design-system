import React from 'react';
import classNames from 'classnames';

type TableElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>

type TableBodyProps = TableElementProps & {
  children?: React.ReactNode;
  className?: string;
};

const TableBody = ({
  children,
  className,
  ...props
}: TableBodyProps) => (
  <tbody
    className={classNames(
    'TableBody',
    className,
    )}
    {...props}
  >
    {children}
  </tbody>
);

export default TableBody;
