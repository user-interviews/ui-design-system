import React from 'react';

import classNames from 'classnames';

import './TableCell.scss';

type TableCellElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

type TableCellProps = TableCellElementProps & {
  /** Right-aligns cell content. */
  alignRight?: boolean;
  children?: React.ReactNode;
  className?: string;
  /** Tighter padding preset. */
  compact?: boolean;
  /** Renders `<th>` instead of `<td>` and adjusts sticky corner styling. */
  header?: boolean;
  /** Pixel `max-width` style on `<td>` rows. */
  maxWidth?: number;
  /** Pixel `min-width` style on `<td>` rows. */
  minWidth?: number;
  /** Drops bottom border on the cell. */
  removeBorderBottom?: boolean;
  /** Enables sticky column classes (pair with `stickyLeft` / `stickyRight`). */
  stickyColumn?: boolean;
  /** Pixel offset for left/right sticky positioning. */
  stickyColumnOffsetX?: number;
  /** Sticky column anchored left. */
  stickyLeft?: boolean;
  /** Sticky column anchored right. */
  stickyRight?: boolean;
  /** Sticky row styling (also injected into child cells from `TableRow`). */
  stickyRow?: boolean;
};

function TableCell({
  alignRight,
  children,
  className,
  compact,
  header,
  maxWidth,
  minWidth,
  removeBorderBottom,
  stickyColumn,
  stickyColumnOffsetX,
  stickyLeft,
  stickyRight,
  stickyRow,
  ...props
}: TableCellProps) {
  const getTableCellClassName = () =>
    classNames('TableCell', className, {
      [`TableCell--compact`]: !!compact,
      [`TableCell__header`]: !!header,
      [`TableCell--remove-border-bottom`]: !!removeBorderBottom,
      [`TableCell--right`]: !!alignRight,
      [`TableCell--sticky-column`]: !!stickyColumn,
      [`TableCell--sticky-column--corner`]: header && stickyColumn,
      [`TableCell--sticky-column--left`]: !!stickyLeft && stickyColumn,
      [`TableCell--sticky-column--right`]: !!stickyRight && stickyColumn,
      [`TableCell--sticky-row`]: !!stickyRow,
    });

  const maxWidthObj = { maxWidth: `${maxWidth}px` };
  const minWidthObj = { minWidth: `${minWidth}px` };

  const getWidthStyling = () => {
    if (maxWidth && minWidth) {
      return { ...maxWidthObj, ...minWidthObj };
    }
    if (maxWidth && !minWidth) {
      return maxWidthObj;
    }
    if (!maxWidth && minWidth) {
      return minWidthObj;
    }
    return undefined;
  };

  const getStickyStyling = () => {
    if (stickyColumn && stickyLeft) {
      return { left: `${stickyColumnOffsetX}px` };
    }
    if (stickyColumn && stickyRight) {
      return { right: `${stickyColumnOffsetX}px` };
    }
    return undefined;
  };

  if (header) {
    return (
      <th
        className={getTableCellClassName()}
        style={getStickyStyling()}
        {...props}
      >
        {children}
      </th>
    );
  }

  return (
    <td
      className={getTableCellClassName()}
      style={{ ...getWidthStyling(), ...getStickyStyling() }}
      {...props}
    >
      {children}
    </td>
  );
}

export default TableCell;
