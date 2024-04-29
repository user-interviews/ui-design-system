import React from 'react';
import classNames from 'classnames';

import { Container, containerSizes } from '../Container';

import './Main.scss';

type ElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>

type MainProps = ElementProps & {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  fluid?: boolean;
  id?: string;
};

const Main = ({
  as,
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

Main.propTypes = {
  fluid: containerSizes,
};

Main.defaultProps = {
  as: 'main',
  className: undefined,
  fluid: true,
  id: undefined,
};
export default Main;
