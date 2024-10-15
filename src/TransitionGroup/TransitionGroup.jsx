import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup as ReactTransitionGroup } from 'react-transition-group';

export function TransitionGroup({ children, className = '' }) {
  return (
    <ReactTransitionGroup
      aria-live="polite"
      className={className}
    >
      {children}
    </ReactTransitionGroup>
  );
}

TransitionGroup.propTypes = {
  className: PropTypes.string,
};
