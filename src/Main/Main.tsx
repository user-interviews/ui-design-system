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

const Main = ({
  as = 'main',
  className,
  children,
  fluid,
  id,
  ...props
}: MainProps) => (
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

export default Main;
