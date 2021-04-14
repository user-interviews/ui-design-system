import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableRow.scss';

const TableRow = ({
  children,
  className,
  ...props
}) => (
  <tr
    className={classNames(
    'TableRow',
    className,
    )}
    {...props}
  >
    {children}
  </tr>
);

export default TableRow;

TableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableRow.defaultProps = {
  children: undefined,
  className: undefined,
};
