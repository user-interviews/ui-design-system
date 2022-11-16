import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Container, containerSizes } from '../Container';

import './Main.scss';

const Main = ({
 as, className, children, fluid, id, ...props
}) => (
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
  as: PropTypes.elementType,
  className: PropTypes.string,
  fluid: containerSizes,
  id: PropTypes.string,
};

Main.defaultProps = {
  as: 'main',
  className: undefined,
  fluid: true,
  id: undefined,
};
export default Main;
