import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { LoadingSkeleton } from 'src/LoadingSkeleton';

import './TableRow.scss';

const TableRow = ({
  children,
  className,
  clickable,
  selected,
  stickyRow,
  ...props
}) => {
  const addStickyRowProp = (child) => {
    if (!stickyRow) {
      return child;
    }
    return cloneElement(child, { stickyRow });
  };

  return (
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
      <LoadingSkeleton />
      {Children.map(children, addStickyRowProp)}
    </tr>
);
};

export default TableRow;

TableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  clickable: PropTypes.bool,
  selected: PropTypes.bool,
  stickyRow: PropTypes.bool,
};

TableRow.defaultProps = {
  children: undefined,
  className: undefined,
  clickable: undefined,
  selected: undefined,
  stickyRow: undefined,
};
