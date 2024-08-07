import React from 'react';

import './SidebarNav.scss';

export type SidebarNavProps = {
  content: React.ReactNode;
  controls?: React.ReactNode[];
  isMobileView: boolean;
};

function SidebarNav({
  controls,
  isMobileView,
  content,
}: SidebarNavProps) {
  return (
    <div className="Layout__sidebar-nav">
      {content}

      {controls && isMobileView && (
      <div className="Layout__sidebar-nav__mobile-controls">
        {controls}
      </div>
    )}
    </div>
  );
}

export default SidebarNav;
