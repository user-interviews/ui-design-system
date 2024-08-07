import React from 'react';
import classNames from 'classnames';
import {
  type ContainerProps as ReactBootstrapContainerProps,
} from 'react-bootstrap';
import { Container } from '../Container';

import './Main.scss';

type ElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>

type MainProps = ElementProps & {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
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
