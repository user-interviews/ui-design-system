import React from 'react';

import { Flex } from '../Flex';
import { LoadingSkeleton } from '../LoadingSkeleton';

import './TableLoadingSkeleton.scss';

type TableLoadingSkeletonProps = {
  columns?: number[];
  rows?: number;
};

const TableLoadingSkeleton = ({
  columns = [75, 75, 150, 150, 250, 250, 250],
  rows = 7,
}: TableLoadingSkeletonProps) => [...Array(rows)].map((_, rowIndex) => (
  (
    // eslint-disable-next-line react/no-array-index-key
    <Flex className="TableLoadingSkeleton" container flexDirection="row" key={rowIndex}>
      {columns.map((width, index) => (
      // eslint-disable-next-line react/no-array-index-key
      (<LoadingSkeleton className="TableLoadingSkeleton__row" key={index} width={width} />)
    ))}
    </Flex>
)
));

export default TableLoadingSkeleton;
