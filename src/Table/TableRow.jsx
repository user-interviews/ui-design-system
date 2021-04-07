import React from 'react';
import PropTypes from 'prop-types';

import './TableRow.scss';

const TableRow = ({
  children,
}) => (
  <tr className="TableRow">
    {children}
  </tr>
);

export default TableRow;

TableRow.propTypes = {
  children: PropTypes.node,
};

TableRow.defaultProps = {
  children: undefined,
};
