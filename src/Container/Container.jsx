import React from 'react';
import PropTypes from 'prop-types';
import { Container as ReactBootstrapContainer } from 'react-bootstrap';

const Container = ({
  as,
  children,
  fluid,
  bsPrefix,
  ...props
}) => (
  <ReactBootstrapContainer
    as={as}
    bsPrefix={bsPrefix}
    fluid={fluid}
    {...props}
  >
    { children }
  </ReactBootstrapContainer>
  );

const containerSizes = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'xxl']),
]);

Container.propTypes = {
  /**
   You can use a custom element for this component
  */
  as: PropTypes.elementType,
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
   This is an escape hatch for working with heavily customized bootstrap css.
  */
  bsPrefix: PropTypes.string,
  /**
   Allow the Container to fill all of its available horizontal space.
   `bool | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`
  */
  fluid: containerSizes,
};

Container.defaultProps = {
  as: undefined,
  bsPrefix: 'container',
  fluid: false,
};

export default Container;
