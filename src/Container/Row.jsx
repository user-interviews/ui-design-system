import React from 'react';
import PropTypes from 'prop-types';
import { Row as ReactBootstrapRow } from 'react-bootstrap';

const Row = ({
  as,
  children,
  lg,
  md,
  sm,
  xl,
  xs,
  xxl,
  bsPrefix,
  ...props
}) => (
  <ReactBootstrapRow
    as={as}
    bsPrefix={bsPrefix}
    lg={lg}
    md={md}
    sm={sm}
    xl={xl}
    xs={xs}
    xxl={xxl}
    {...props}
  >
    { children }
  </ReactBootstrapRow>
  );

const rowColWidth = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

const rowColumns = PropTypes.oneOfType([
  rowColWidth,
  PropTypes.shape({
    cols: rowColWidth,
  }),
]);

Row.propTypes = {
  /**
   You can use a custom element for this component
  */
  as: PropTypes.elementType,
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
   This is an escape hatch for working with heavily customized bootstrap css.
  */
  bsPrefix: PropTypes.string,
  /**
   The number of columns that will fit next to each other on large devices (≥992px).
   Use auto to give columns their natural widths.
   `number | 'auto' | { cols: number | 'auto' }`
  */
  lg: rowColumns,
  /**
   The number of columns that will fit next to each other on medium devices (≥768px).
   Use auto to give columns their natural widths.
   `number | 'auto' | { cols: number | 'auto' }`
  */
  md: rowColumns,
  /**
   The number of columns that will fit next to each other on small devices (≥576px).
   Use auto to give columns their natural widths.
   `number | 'auto' | { cols: number | 'auto' }`
  */
  sm: rowColumns,
  /**
    The number of columns that will fit next to each other on extra large devices (≥1200px).
    Use auto to give columns their natural widths.
    `number | 'auto' | { cols: number | 'auto' }`
  */
  xl: rowColumns,
  /**
    The number of columns that will fit next to each other on extra small devices (<576px).
    Use auto to give columns their natural widths.
    `number | 'auto' | { cols: number | 'auto' }`
  */
  xs: rowColumns,
  /**
    The number of columns that will fit next to each other on extra extra large devices (≥1400px).
    Use auto to give columns their natural widths.
    `number | 'auto' | { cols: number | 'auto' }`
  */
  xxl: rowColumns,
};

Row.defaultProps = {
  as: undefined,
  bsPrefix: 'row',
  lg: undefined,
  md: undefined,
  sm: undefined,
  xl: undefined,
  xs: undefined,
  xxl: undefined,
};

export default Row;
