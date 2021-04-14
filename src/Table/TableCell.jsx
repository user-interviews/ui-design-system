import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableCell.scss';

const TableCell = ({
  alignRight,
  children,
  className,
  header,
  compact,
  ...props
}) => (
  <td
    className={classNames(
    'TableCell',
    className,
    { [`TableCell__header`]: !!header },
    { [`TableCell--right`]: !!alignRight },
    { [`TableCell--compact`]: !!compact },
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
};

TableCell.defaultProps = {
  alignRight: undefined,
  children: undefined,
  className: undefined,
  compact: undefined,
  header: undefined,
};
