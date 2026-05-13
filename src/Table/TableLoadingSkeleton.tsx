import React from 'react';

import { FlexContainer } from '../FlexContainer';
import { LoadingSkeleton } from '../LoadingSkeleton';

import './TableLoadingSkeleton.scss';

type TableLoadingSkeletonProps = {
  /** Skeleton bar widths in px per column (built-in default array when unset). */
  columns?: number[];
  /** Number of skeleton rows (`7` default). */
  rows?: number;
};

function TableLoadingSkeleton({
  columns = [75, 75, 150, 150, 250, 250, 250],
  rows = 7,
}: TableLoadingSkeletonProps) {
  return (
    <>
      {[...Array(rows)].map((_, rowIndex) => (
        // oxlint-disable-next-line react/no-array-index-key
        <FlexContainer
          className="TableLoadingSkeleton"
          flexDirection="row"
          key={rowIndex}
        >
          {columns.map((width, index) => (
            // oxlint-disable-next-line react/no-array-index-key
            <LoadingSkeleton
              className="TableLoadingSkeleton__row"
              key={index}
              width={width}
            />
          ))}
        </FlexContainer>
      ))}
    </>
  );
}

export default TableLoadingSkeleton;
