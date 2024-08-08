import React, { Children, cloneElement } from 'react';
import classNames from 'classnames';

import './TableRow.scss';

type TableElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>

type TableRowProps = TableElementProps & {
  children?: React.ReactNode;
  className?: string;
  clickable?: boolean;
  removeHover?: boolean;
  selected?: boolean;
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
      className={classNames(
    'TableRow',
    className,
    {
      [`TableRow--selected`]: !!selected,
      [`TableRow--clickable`]: !!clickable,
      [`TableRow--remove-hover`]: !!removeHover,
    },
    )}
      {...props}
    >
      {Children.map(children, addStickyRowProp)}
    </tr>
  );
}

export default TableRow;

TableRow.defaultProps = {
  children: undefined,
  className: undefined,
  clickable: undefined,
  removeHover: undefined,
  selected: undefined,
  stickyRow: undefined,
};
