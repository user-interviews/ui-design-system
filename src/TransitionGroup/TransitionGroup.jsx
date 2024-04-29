import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup as ReactTransitionGroup } from 'react-transition-group';

export const TransitionGroup = ({ children, className }) => (
  <ReactTransitionGroup
    aria-live="polite"
    className={className}
  >
    {children}
  </ReactTransitionGroup>
);

TransitionGroup.defaultProps = {
  className: '',
};

TransitionGroup.propTypes = {
  className: PropTypes.string,
};
