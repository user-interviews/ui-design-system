import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FixedSizeList } from 'react-window';
import TableLoadingSkeleton from './TableLoadingSkeleton';

const Item = ({ index, style, data }) => {
  return (
    <div style={style}>
      {data[index]}
   </div>
  );
};

const Table = ({
  children,
  className,
  isLoading,
  loadingColumns,
  loadingRows,
  ...props
}) => (
  <>
    <FixedSizeList
      className={classNames('Table', className)}
      height={800}
      itemCount={1000}
      itemSize={150}
      width={'100%'}
      itemData={children}
    >
      {Item}
    </FixedSizeList>
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
