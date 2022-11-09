import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Container, containerSizes } from '../Container';

import './Main.scss';

const Main = ({
 as, className, children, fluid, ...props
}) => (
  <Container
    as={as}
    className={classNames(className, 'Main')}
    fluid={fluid}
    {...props}
  >
    {children}
  </Container>
  );

Main.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  fluid: containerSizes,
};

Main.defaultProps = {
  as: 'main',
  className: undefined,
  fluid: true,
};
export default Main;
