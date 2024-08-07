import React from 'react';

import Controls from './Controls';

import './Header.scss';

type HeaderProps = {
  controls?: React.ReactNode[];
  isMobileView: boolean;
  isSidebarOpen: boolean;
  titleComponent?: React.ReactNode;
  onToggleSidebarRequest: (...args: unknown[]) => void;
};

function Header({
  controls,
  isMobileView,
  isSidebarOpen,
  titleComponent,
  onToggleSidebarRequest,
}: HeaderProps) {
  return (
    <div className="Header">
      {titleComponent}
      <Controls>
        {!isMobileView && controls}
        {isMobileView && (
        <button
          className="btn btn-primary btn-outline-neutral"
          type="button"
          onClick={onToggleSidebarRequest}
        >
          {isSidebarOpen ? 'Close' : 'Menu'}
        </button>
      )}
      </Controls>
    </div>
  );
}

export default Header;
