import React from 'react';
import PropTypes from 'prop-types';

import './SidebarNavLinks.scss';

const SidebarNavLinks = ({ children }) => (
  <ul className="Layout__sidebar-nav__links">
    {children}
  </ul>
);

SidebarNavLinks.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarNavLinks;
