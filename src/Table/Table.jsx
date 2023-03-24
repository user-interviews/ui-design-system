import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableLoadingSkeleton from './TableLoadingSkeleton';

const Table = ({
  children,
  className,
  isLoading,
  loadingColumns,
  loadingRows,
  ...props
}) => (
  <>
    {!isLoading ? (
      <table
        className={classNames(
        'Table',
        className,
        )}
        {...props}
      >
        {children}
      </table>
    ) : (
      <TableLoadingSkeleton columns={loadingColumns} rows={loadingRows} />
    )}
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
