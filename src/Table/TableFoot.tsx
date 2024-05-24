import React from 'react';
import classNames from 'classnames';

import './TableFoot.scss';

type TableElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>

type TableFootProps = TableElementProps & {
  children?: React.ReactNode;
  className?: string;
  stickyRow?: boolean;
};

const TableFoot = ({
  children,
  className,
  stickyRow,
  ...props
}: TableFootProps) => (
  <tfoot
    className={classNames(
    'TableFoot',
    className,
    {
      [`TableFoot--sticky-row`]: !!stickyRow,
    },
    )}
    {...props}
  >
    {children}
  </tfoot>
);

export default TableFoot;
