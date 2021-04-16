import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableRow.scss';

const TableRow = ({
  children,
  className,
  selected,
  ...props
}) => (
  <tr
    className={classNames(
    'TableRow',
    className,
    { [`TableRow--selected`]: !!selected },
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
  selected: PropTypes.bool,
};

TableRow.defaultProps = {
  children: undefined,
  className: undefined,
  selected: undefined,
};
