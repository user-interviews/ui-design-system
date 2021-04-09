import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableCell.scss';

const TableCell = ({
  children,
  header,
  compact,
}) => (
  <td className={classNames(
    'TableCell',
    { [`TableCell__header`]: !!header },
    { [`TableCell--compact`]: !!compact },
    )}
  >
    {children}
  </td>
);

export default TableCell;

TableCell.propTypes = {
  children: PropTypes.node,
  compact: PropTypes.bool,
  header: PropTypes.bool,
};

TableCell.defaultProps = {
  children: undefined,
  compact: undefined,
  header: undefined,
};
