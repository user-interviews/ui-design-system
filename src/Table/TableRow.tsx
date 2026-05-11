import React, { Children, cloneElement } from 'react';

import classNames from 'classnames';

import './TableRow.scss';

type TableElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

type TableRowProps = TableElementProps & {
  children?: React.ReactNode;
  className?: string;
  /** Pointer/hover affordance for interactive rows. */
  clickable?: boolean;
  /** Suppresses hover styling. */
  removeHover?: boolean;
  /** Selected row highlight. */
  selected?: boolean;
  /** When true, each child receives `stickyRow` via `cloneElement`. */
  stickyRow?: boolean;
};

function TableRow({
  children,
  className,
  clickable,
  removeHover,
  selected,
  stickyRow,
  ...props
}: TableRowProps) {
  const addStickyRowProp = (child) => {
    if (stickyRow) {
      return cloneElement(child, { stickyRow });
    }
    return child;
  };

  return (
    <tr
      className={classNames('TableRow', className, {
        [`TableRow--selected`]: !!selected,
        [`TableRow--clickable`]: !!clickable,
        [`TableRow--remove-hover`]: !!removeHover,
      })}
      {...props}
    >
      {Children.map(children, addStickyRowProp)}
    </tr>
  );
}

export default TableRow;
