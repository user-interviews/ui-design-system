import React from 'react';
import {
  Container as ReactBootstrapContainer,
  type ContainerProps as ReactBootstrapContainerProps,
} from 'react-bootstrap';

export type ContainerProps = {
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
   Allow the Container to fill all of its available horizontal space.
   `bool | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`
  */
  fluid?: ReactBootstrapContainerProps['fluid'];
} & ReactBootstrapContainerProps;

export const Container = ({
  as,
  children,
  className,
  fluid,
  bsPrefix = 'container',
  ...props
}: ContainerProps) => (
  <ReactBootstrapContainer
    as={as}
    bsPrefix={bsPrefix}
    className={className}
    fluid={fluid}
    {...props}
  >
    { children }
  </ReactBootstrapContainer>
);
