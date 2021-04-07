import React from 'react';
import PropTypes from 'prop-types';

const Table = ({
  children,
}) => (
  <table className="Table">
    {children}
  </table>
);

export default Table;

Table.propTypes = {
  children: PropTypes.node,
};

Table.defaultProps = {
  children: undefined,
};
