import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableCell.scss';

const TableCell = ({
  alignRight,
  children,
  className,
  compact,
  header,
  maxWidth,
  minWidth,
  stickyColumn,
  stickyColumnOffsetX,
  stickyLeft,
  stickyRight,
  stickyRow,
  ...props
}) => {
  const getTableCellClassName = () => classNames(
      'TableCell',
      className,
      {
        [`TableCell--compact`]: !!compact,
        [`TableCell__header`]: !!header,
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
    return null;
  };

  const getStickyStyling = () => {
    if (stickyColumn && stickyLeft) {
      return { left: `${stickyColumnOffsetX}px` };
    }
    if (stickyColumn && stickyRight) {
      return { right: `${stickyColumnOffsetX}px` };
    }
    return null;
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

TableCell.propTypes = {
  alignRight: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  compact: PropTypes.bool,
  header: PropTypes.bool,
  maxWidth: PropTypes.number,
  minWidth: PropTypes.number,
  stickyColumn: PropTypes.bool,
  stickyColumnOffsetX: PropTypes.number,
  stickyLeft: PropTypes.bool,
  stickyRight: PropTypes.bool,
  stickyRow: PropTypes.bool,
};

TableCell.defaultProps = {
  alignRight: undefined,
  children: undefined,
  className: undefined,
  compact: undefined,
  header: undefined,
  maxWidth: undefined,
  minWidth: undefined,
  stickyColumn: undefined,
  stickyColumnOffsetX: undefined,
  stickyLeft: undefined,
  stickyRight: undefined,
  stickyRow: undefined,
};
