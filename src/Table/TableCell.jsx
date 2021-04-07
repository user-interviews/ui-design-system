import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableCell.scss';

const TableCell = ({
  children,
  header,
}) => (
  <td className={classNames(
    'TableCell',
    { [`TableCell__header`]: !!header },
    )}
  >
    {children}
  </td>
);

export default TableCell;

TableCell.propTypes = {
  children: PropTypes.node,
  header: PropTypes.bool,
};

TableCell.defaultProps = {
  children: undefined,
  header: undefined,
};
