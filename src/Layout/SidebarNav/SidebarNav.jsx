import React from 'react';
import PropTypes from 'prop-types';

import './SidebarNav.scss';

const SidebarNav = ({ controls, isMobileView, content }) => (
  <div className="Layout__sidebar-nav">
    {content}

    {controls && isMobileView && (
      <div className="Layout__sidebar-nav__mobile-controls">
        {controls}
      </div>
    )}
  </div>
);

SidebarNav.propTypes = {
  content: PropTypes.node.isRequired,
  controls: PropTypes.arrayOf(PropTypes.node),
  isMobileView: PropTypes.bool.isRequired,
};

SidebarNav.defaultProps = {
  controls: undefined,
};

export default SidebarNav; 
