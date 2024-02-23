import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FixedSizeList } from 'react-window';
import TableLoadingSkeleton from './TableLoadingSkeleton';

const Item = ({ index, style }) => (
  <div style={style}>hey{index}
  </div>
);

const Table = ({
  className,
  isLoading,
  loadingColumns,
  loadingRows,
  renderRow,
}) => (
  <>
    <FixedSizeList
      height={500}
      itemCount={100}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{renderRow && renderRow({ index })}</div>
      )}
    </FixedSizeList>

    {/* <FixedSizeList
      className={classNames('Table', className)}
      height={800}
      itemCount={1000}
      itemSize={150}
      width="100%"
    >
      {Item}
    </FixedSizeList> */}
  </>
);

export default Table;

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingColumns: PropTypes.arrayOf(PropTypes.number),
  loadingRows: PropTypes.number,
};

Table.defaultProps = {
  children: undefined,
  className: undefined,
  isLoading: false,
  loadingColumns: undefined,
  loadingRows: undefined,
};
