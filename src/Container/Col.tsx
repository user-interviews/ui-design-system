import React from 'react';
import {
  Col as ReactBootstrapCol,
  type ColProps as ReactBootstrapColProps,
} from 'react-bootstrap';

import { useDeprecationWarning } from '../utils';

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

export function Col({
  as,
  children,
  className,
  lg,
  md,
  sm,
  xl,
  xs,
  xxl,
  bsPrefix = 'col',
  ...props
}: ColProps) {
  useDeprecationWarning({ componentName: 'Col', message: 'Please use FlexContainer instead.' });

  return (
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
      {children}
    </ReactBootstrapCol>
  );
}
