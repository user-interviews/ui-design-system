import React from 'react';

import * as propTypes from 'lib/prop_types';

import './sidebar_nav.scss';

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
  content: propTypes.node.isRequired,
  controls: propTypes.arrayOf(propTypes.node),
  isMobileView: propTypes.bool.isRequired,
};

SidebarNav.defaultProps = {
  controls: undefined,
};

export default SidebarNav;