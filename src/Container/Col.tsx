import React from 'react';
import PropTypes from 'prop-types';
import {
  Col as ReactBootstrapCol,
  type ColProps as ReactBootstrapColProps,
} from 'react-bootstrap';

export type ColProps = {
  /**
   You can use a custom element for this component
  */
  as?: React.ElementType;
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
   This is an escape hatch for working with heavily customized bootstrap css.
  */
  bsPrefix?: string;
  className?: string;
  /**
   The number of columns to span on large devices (≥992px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  lg?: ReactBootstrapColProps['lg'];
  /**
   The number of columns to span on medium devices (≥768px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  md?: ReactBootstrapColProps['md'];
  /**
   The number of columns to span on small devices (≥576px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  sm?: ReactBootstrapColProps['sm'];
  /**
   The number of columns to span on extra large devices (≥1200px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  xl?: ReactBootstrapColProps['xl'];
  /**
   The number of columns to span on extra small devices (<576px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  xs?: ReactBootstrapColProps['xs'];
  /**
   The number of columns to span on extra extra large devices (≥1400px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  xxl?: ReactBootstrapColProps['xxl'];
} & ReactBootstrapColProps;

export const Col = ({
  as,
  children,
  className,
  lg,
  md,
  sm,
  xl,
  xs,
  xxl,
  bsPrefix,
  ...props
}: ColProps) => (
  <ReactBootstrapCol
    as={as}
    bsPrefix={bsPrefix}
    className={className}
    lg={lg}
    md={md}
    sm={sm}
    xl={xl}
    xs={xs}
    xxl={xxl}
    {...props}
  >
    { children }
  </ReactBootstrapCol>
  );

const colSizePropTypes = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.number,
  PropTypes.string,
  PropTypes.oneOf(['auto']),
]);

const stringOrNumberPropTypes = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

const columnPropTypes = PropTypes.oneOfType([
  colSizePropTypes,
  PropTypes.shape({
    offset: stringOrNumberPropTypes,
    order: stringOrNumberPropTypes,
    size: colSizePropTypes,
  }),
]);

Col.propTypes = {
  /**
   The number of columns to span on large devices (≥992px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  lg: columnPropTypes,

  /**
   The number of columns to span on medium devices (≥768px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  md: columnPropTypes,

  /**
   The number of columns to span on small devices (≥576px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  sm: columnPropTypes,

  /**
   The number of columns to span on extra large devices (≥1200px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  xl: columnPropTypes,

  /**
   The number of columns to span on extra small devices (<576px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  xs: columnPropTypes,

  /**
   The number of columns to span on extra extra large devices (≥1400px)
   `boolean | "auto" | number | { span: boolean | "auto" | number,
   offset: number, order: "first" | "last" | number }`
  */
  xxl: columnPropTypes,
};

Col.defaultProps = {
  as: undefined,
  bsPrefix: 'col',
  className: undefined,
  lg: undefined,
  md: undefined,
  sm: undefined,
  xl: undefined,
  xs: undefined,
  xxl: undefined,
};
