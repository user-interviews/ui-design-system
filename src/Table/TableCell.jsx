import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableCell.scss';

const TableCell = ({
  alignRight,
  children,
  header,
  compact,
}) => (
  <td className={classNames(
    'TableCell',
    { [`TableCell__header`]: !!header },
    { [`TableCell--right`]: !!alignRight },
    { [`TableCell--compact`]: !!compact },
    )}
  >
    {children}
  </td>
);

export default TableCell;

TableCell.propTypes = {
  alignRight: PropTypes.bool,
  children: PropTypes.node,
  compact: PropTypes.bool,
  header: PropTypes.bool,
};

TableCell.defaultProps = {
  alignRight: undefined,
  children: undefined,
  compact: undefined,
  header: undefined,
};
