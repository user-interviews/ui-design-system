import React from 'react';
import classNames from 'classnames';

import TableLoadingSkeleton from './TableLoadingSkeleton';

type TableElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>

export type TableProps = TableElementProps & {
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  loadingColumns?: number[];
  loadingRows?: number;
};

function Table({
  children,
  className,
  isLoading,
  loadingColumns,
  loadingRows,
  ...props
}: TableProps) {
  return !isLoading ? (
    <table
      className={classNames(
        'Table',
        className,
        )}
      {...props}
    >
      {children}
    </table>
  ) : (
    <TableLoadingSkeleton columns={loadingColumns} rows={loadingRows} />
  );
}

export default Table;
