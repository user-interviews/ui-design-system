import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Table = ({
  children,
  className,
  ...props
}) => (
  <table
    className={classNames(
    'Table',
    className,
    )}
    {...props}
  >
    {children}
  </table>
);

export default Table;

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Table.defaultProps = {
  children: undefined,
  className: undefined,
};
