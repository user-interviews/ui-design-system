import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TableFoot = ({
  children,
  className,
  ...props
}) => (
  <tfoot
    className={classNames(
    'TableFoot',
    className,
    )}
    {...props}
  >
    {children}
  </tfoot>
);

TableFoot.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableFoot.defaultProps = {
  children: undefined,
  className: undefined,
};

export default TableFoot;
