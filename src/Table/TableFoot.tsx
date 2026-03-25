import classNames from 'classnames';
import React from 'react';

import './TableFoot.scss';

type TableElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

type TableFootProps = TableElementProps & {
  children?: React.ReactNode;
  className?: string;
  stickyRow?: boolean;
};

function TableFoot({
  children,
  className,
  stickyRow,
  ...props
}: TableFootProps) {
  return (
    <tfoot
      className={classNames('TableFoot', className, {
        [`TableFoot--sticky-row`]: !!stickyRow,
      })}
      {...props}
    >
      {children}
    </tfoot>
  );
}

export default TableFoot;
