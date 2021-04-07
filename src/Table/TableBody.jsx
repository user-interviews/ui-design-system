import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({
  children,
}) => (
  <tbody className="TableBody">
    {children}
  </tbody>
);

export default TableBody;

TableBody.propTypes = {
  children: PropTypes.node,
};

TableBody.defaultProps = {
  children: undefined,
};
