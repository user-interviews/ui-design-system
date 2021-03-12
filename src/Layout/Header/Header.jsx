import React from 'react';
import PropTypes from 'prop-types';

import Controls from './Controls';

import './Header.scss';

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
  controls: PropTypes.arrayOf(PropTypes.node),
  isMobileView: PropTypes.bool.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  titleComponent: PropTypes.node,
  onToggleSidebarRequest: PropTypes.func.isRequired,
};

Header.defaultProps = {
  controls: undefined,
  titleComponent: undefined,
};

export default Header;