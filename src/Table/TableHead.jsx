import React from 'react';
import PropTypes from 'prop-types';

const TableHead = ({
  children,
}) => (
  <thead className="TableHead">
    {children}
  </thead>
);

export default TableHead;

TableHead.propTypes = {
  children: PropTypes.node,
};

TableHead.defaultProps = {
  children: undefined,
};
