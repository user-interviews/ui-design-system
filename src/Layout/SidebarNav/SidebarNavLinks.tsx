import React from 'react';

import './SidebarNavLinks.scss';

export type SidebarNavLinksProps = {
  children: React.ReactNode;
};

const SidebarNavLinks = ({
  children,
}: SidebarNavLinksProps) => (
  <ul className="Layout__sidebar-nav__links">
    {children}
  </ul>
);

export default SidebarNavLinks;
