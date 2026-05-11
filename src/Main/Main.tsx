import React from 'react';
import { type ContainerProps as ReactBootstrapContainerProps } from 'react-bootstrap';

import classNames from 'classnames';

import { Container } from '../Container';

import './Main.scss';

type ElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

type MainProps = ElementProps & {
  /** Root element type (`main` default). */
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  /** Forwarded to React Bootstrap `Container` (`true` default). */
  fluid?: ReactBootstrapContainerProps['fluid'];
  id?: string;
};

function Main({
  as = 'main',
  className,
  children,
  fluid = true,
  id,
  ...props
}: MainProps) {
  return (
    <Container
      as={as}
      className={classNames(className, 'Main')}
      fluid={fluid}
      id={id}
      {...props}
    >
      {children}
    </Container>
  );
}

export default Main;
