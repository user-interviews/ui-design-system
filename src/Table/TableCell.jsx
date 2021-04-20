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
  stickyColumn,
  stickyRow,
  ...props
}) => (
  <td
    className={classNames(
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
    )}
    {...props}
  >
    {children}
  </td>
);

export default TableCell;

TableCell.propTypes = {
  alignRight: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  compact: PropTypes.bool,
  header: PropTypes.bool,
  stickyColumn: PropTypes.bool,
  stickyRow: PropTypes.bool,
};

TableCell.defaultProps = {
  alignRight: undefined,
  children: undefined,
  className: undefined,
  compact: undefined,
  header: undefined,
  stickyColumn: undefined,
  stickyRow: undefined,
};
