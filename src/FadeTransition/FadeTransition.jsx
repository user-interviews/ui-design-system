import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './FadeTransition.scss';

function FadeTransition({ children, ...props }) {
  return (
    <CSSTransition {...props} classNames="FadeTransition" timeout={{ enter: 300, exit: 200 }}>
      {children}
    </CSSTransition>
  );
}

FadeTransition.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FadeTransition;
