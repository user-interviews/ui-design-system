import React from 'react';

import * as propTypes from 'lib/prop_types';

import './sidebar_nav_links.scss';

const SidebarNavLinks = ({ children }) => (
  <ul className="Layout__sidebar-nav__links">
    {children}
  </ul>
);

SidebarNavLinks.propTypes = {
  children: propTypes.node.isRequired,
};

export default SidebarNavLinks;
