import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TableBody = ({
  children,
  className,
  ...props
}) => (
  <tbody
    className={classNames(
    'TableBody',
    className,
    )}
    {...props}
  >
    {children}
  </tbody>
);

export default TableBody;

TableBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableBody.defaultProps = {
  children: undefined,
  className: undefined,
};
