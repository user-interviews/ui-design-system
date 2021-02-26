import React from 'react';
import * as propTypes from 'lib/prop_types';

import Controls from './Controls';

import './header.scss';

const Header = ({
  controls,
  isMobileView,
  isSidebarOpen,
  titleComponent,
  onToggleSidebarRequest,
}) => (
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

Header.propTypes = {
  controls: propTypes.arrayOf(propTypes.node),
  isMobileView: propTypes.bool.isRequired,
  isSidebarOpen: propTypes.bool.isRequired,
  titleComponent: propTypes.node,
  onToggleSidebarRequest: propTypes.func.isRequired,
};

Header.defaultProps = {
  controls: undefined,
  titleComponent: undefined,
};

export default Header;
