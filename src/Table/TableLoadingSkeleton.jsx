import React from 'react';
import PropTypes from 'prop-types';

import { Flex } from 'src/Flex';
import { LoadingSkeleton } from 'src/LoadingSkeleton';

import './TableLoadingSkeleton.scss';

const TableLoadingSkeleton = ({ columns, rows }) => [...Array(rows)].map((_, rowIndex) => (
  // eslint-disable-next-line react/no-array-index-key
  <Flex className="TableLoadingSkeleton" container flexDirection="row" key={rowIndex}>
    {columns.map((width, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <LoadingSkeleton className="TableLoadingSkeleton__row" key={index} width={width} />
    ))}

  </Flex>
));

TableLoadingSkeleton.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.number),
  rows: PropTypes.number,
};

TableLoadingSkeleton.defaultProps = {
  columns: [75, 75, 150, 150, 250, 250, 250],
  rows: 7,
};

export default TableLoadingSkeleton;
