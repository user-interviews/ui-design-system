import React from 'react';
import classNames from 'classnames';

import './TableCell.scss';

type TableCellElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>

type TableCellProps = TableCellElementProps & {
  alignRight?: boolean;
  children?: React.ReactNode;
  className?: string;
  compact?: boolean;
  header?: boolean;
  maxWidth?: number;
  minWidth?: number;
  removeBorderBottom?: boolean;
  stickyColumn?: boolean;
  stickyColumnOffsetX?: number;
  stickyLeft?: boolean;
  stickyRight?: boolean;
  stickyRow?: boolean;
};

const TableCell = ({
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
}: TableCellProps) => {
  const getTableCellClassName = () => classNames(
      'TableCell',
      className,
      {
        [`TableCell--compact`]: !!compact,
        [`TableCell__header`]: !!header,
        [`TableCell--remove-border-bottom`]: !!removeBorderBottom,
        [`TableCell--right`]: !!alignRight,
        [`TableCell--sticky-column`]: !!stickyColumn,
        [`TableCell--sticky-column--corner`]: header && stickyColumn,
        [`TableCell--sticky-column--left`]: !!stickyLeft && stickyColumn,
        [`TableCell--sticky-column--right`]: !!stickyRight && stickyColumn,
        [`TableCell--sticky-row`]: !!stickyRow,
      },
    );

  const maxWidthObj = { maxWidth: `${maxWidth}px` };
  const minWidthObj = { minWidth: `${minWidth}px` };

  const getWidthStyling = () => {
    if (maxWidth && minWidth) {
      return { ...maxWidthObj, ...minWidthObj };
    } if (maxWidth && !minWidth) {
      return maxWidthObj;
    } if (!maxWidth && minWidth) {
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
};

export default TableCell;
