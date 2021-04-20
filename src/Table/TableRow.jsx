import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableRow.scss';

const TableRow = ({
  children,
  className,
  clickable,
  selected,
  ...props
}) => (
  <tr
    className={classNames(
    'TableRow',
    className,
    {
      [`TableRow--selected`]: !!selected,
      [`TableRow--clickable`]: !!clickable,
    },
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
  clickable: PropTypes.bool,
  selected: PropTypes.bool,
};

TableRow.defaultProps = {
  children: undefined,
  className: undefined,
  clickable: undefined,
  selected: undefined,
};
