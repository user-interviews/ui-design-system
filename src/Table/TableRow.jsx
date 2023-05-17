import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableRow.scss';

const TableRow = ({
  children,
  className,
  clickable,
  removeHover,
  selected,
  stickyRow,
  ...props
}) => {
  const addStickyRowProp = (child) => {
    if (stickyRow) {
      return cloneElement(child, { stickyRow });
    }
    return child;
  };

  return (
    <tr
      className={classNames(
    'TableRow',
    className,
    {
      [`TableRow--selected`]: !!selected,
      [`TableRow--clickable`]: !!clickable,
      [`TableRow--remove-hover`]: !!removeHover,
    },
    )}
      {...props}
    >
      {Children.map(children, addStickyRowProp)}
    </tr>
);
};

export default TableRow;

TableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  clickable: PropTypes.bool,
  removeHover: PropTypes.bool,
  selected: PropTypes.bool,
  stickyRow: PropTypes.bool,
};

TableRow.defaultProps = {
  children: undefined,
  className: undefined,
  clickable: undefined,
  removeHover: undefined,
  selected: undefined,
  stickyRow: undefined,
};
