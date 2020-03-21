import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './FadeTransition.scss';

const FadeTransition = ({ children, ...props }) => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <CSSTransition {...props} classNames="fade-transition" timeout={{ enter: 300, exit: 200 }}>
    {children}
  </CSSTransition>
);

FadeTransition.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FadeTransition;
