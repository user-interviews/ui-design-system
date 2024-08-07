import React from 'react';
import {
  Row as ReactBootstrapRow,
  type RowProps as ReactBootstrapRowProps,
} from 'react-bootstrap';

export type RowProps = {
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
   The number of columns that will fit next to each other on large devices (≥992px).
   Use auto to give columns their natural widths.
   `number | 'auto' | { cols: number | 'auto' }`
  */
  lg?: ReactBootstrapRowProps['lg'];
  /**
   The number of columns that will fit next to each other on medium devices (≥768px).
   Use auto to give columns their natural widths.
   `number | 'auto' | { cols: number | 'auto' }`
  */
  md?: ReactBootstrapRowProps['md'];
  /**
   The number of columns that will fit next to each other on small devices (≥576px).
   Use auto to give columns their natural widths.
   `number | 'auto' | { cols: number | 'auto' }`
  */
  sm?: ReactBootstrapRowProps['sm'];
  /**
    The number of columns that will fit next to each other on extra large devices (≥1200px).
    Use auto to give columns their natural widths.
    `number | 'auto' | { cols: number | 'auto' }`
  */
  xl?: ReactBootstrapRowProps['xl'];
  /**
    The number of columns that will fit next to each other on extra small devices (<576px).
    Use auto to give columns their natural widths.
    `number | 'auto' | { cols: number | 'auto' }`
  */
  xs?: ReactBootstrapRowProps['xs'];
  /**
    The number of columns that will fit next to each other on extra extra large devices (≥1400px).
    Use auto to give columns their natural widths.
    `number | 'auto' | { cols: number | 'auto' }`
  */
  xxl?: ReactBootstrapRowProps['xxl'];
} & ReactBootstrapRowProps;

export function Row({
  as,
  children,
  className,
  lg,
  md,
  sm,
  xl,
  xs,
  xxl,
  bsPrefix = 'row',
  ...props
}: RowProps) {
  return (
    <ReactBootstrapRow
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
    </ReactBootstrapRow>
  );
}
