import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TableHead = ({
  children,
  className,
  ...props
}) => (
  <thead
    className={classNames(
    'TableHead',
    className,
    )}
    {...props}
  >
    {children}
  </thead>
);

export default TableHead;

TableHead.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableHead.defaultProps = {
  children: undefined,
  className: undefined,
};
