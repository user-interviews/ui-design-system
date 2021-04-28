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
        [`TableCell--sticky-column--corner`]: header && stickyColumn,
        [`TableCell--sticky-column`]: !!stickyColumn,
        [`TableCell--sticky-row`]: !!stickyRow,
      },
    );

  const maxWidthObj = { maxWidth };
  const minWidthObj = { minWidth };

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

  if (header) {
    return (
      <th
        className={getTableCellClassName()}
        {...props}
      >
        {children}
      </th>
    );
  }

  return (
    <td
      className={getTableCellClassName()}
      style={getWidthStyling()}
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
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  stickyColumn: PropTypes.bool,
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
  stickyRow: undefined,
};
