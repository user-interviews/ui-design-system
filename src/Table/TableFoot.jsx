import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TableFoot.scss';

const TableFoot = ({
  children,
  className,
  stickyRow,
  ...props
}) => (
  <tfoot
    className={classNames(
    'TableFoot',
    className,
    {
      [`TableFoot--sticky-row`]: !!stickyRow,
    },
    )}
    {...props}
  >
    {children}
  </tfoot>
);

TableFoot.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  stickyRow: PropTypes.bool,
};

TableFoot.defaultProps = {
  children: undefined,
  className: undefined,
  stickyRow: undefined,
};

export default TableFoot;
