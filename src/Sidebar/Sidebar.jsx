import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { faChevronsLeft, faChevronsRight } from '@fortawesome/pro-regular-svg-icons';

import IconButton from 'src/IconButton';

import './Sidebar.scss';

const Sidebar = ({ children, className, sidebarHeaderContent }) => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResizeButtonVisible, setIsResizeButtonVisible] = useState();


  const handleResizeClick = () => setIsCollapsed(prev => !prev)
  
  return (
    <aside className={classNames(
      "Sidebar",
      className,
      isCollapsed ? "Sidebar--collapsed" : "Sidebar--expanded",
      )}
      onMouseEnter={() => setIsResizeButtonVisible(true)}
      onMouseLeave={() => !isCollapsed ? setIsResizeButtonVisible(false) : setIsResizeButtonVisible(true) }
    >
      <div className="Sidebar__header">
        {!isCollapsed && <div className="Sidebar__header__content">{sidebarHeaderContent}</div>}
        
        <div className='Sidebar__header__resize-button-container' >
          {isResizeButtonVisible && (
            <div className='Sidebar__header__resize-button'>
              {isCollapsed ? 
                <IconButton icon={faChevronsRight} onClick={handleResizeClick} /> :
                <IconButton icon={faChevronsLeft} onClick={handleResizeClick} />
              }
            </div>
          )}
        </div>
      </div>
      {children}
    </aside>
  );
};

Sidebar.propTypes = {
  
};

Sidebar.defaultProps = {

};

export default Sidebar;
