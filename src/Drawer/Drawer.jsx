import React, {
  createContext, useEffect, useState, useCallback, useRef,
} from 'react';
import * as propTypes from 'prop-types';
import classNames from 'classnames';

import './Drawer.scss';

export const ORIENTATION_LEFT = 'left';
export const ORIENTATION_RIGHT = 'right';

export const ExpandContext = createContext({
  expandable: null,
  expanded: null,
  handleExpand: null,
});

export const DrawerSizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

const Drawer = ({
  behindNav,
  children,
  className,
  defaultExpanded,
  expandable,
  hasBackgroundOverlay,
  visible,
  orientation,
  size,
  onRequestClose,
}) => {
  const isCurrentlyOpen = useRef(false);
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleExpand = () => setExpanded(!expanded);

  const drawerClasses = classNames(`Drawer Drawer--${orientation} Drawer--${size}`, {
    'Drawer--expanded': expanded,
    'Drawer--visible': !!visible,
    'Drawer--behind-nav': behindNav,
    [className]: !!className,
  });

  const handleEscKeyPress = useCallback((event) => {
    if (visible && event.key === 'Escape') {
      onRequestClose();
    }
  }, [onRequestClose, visible]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscKeyPress);
    };
  }, [handleEscKeyPress, visible]);

  useEffect(() => {
    function disableBackgroundScrolling() {
      if (!hasBackgroundOverlay) return;

      if (visible && !isCurrentlyOpen.current) {
        document.body.classList.add('Drawer__Body--open');
        isCurrentlyOpen.current = true;
      }

      if (!visible && isCurrentlyOpen.current) {
        document.body.classList.remove('Drawer__Body--open');
        isCurrentlyOpen.current = false;
      }
    }

    disableBackgroundScrolling();
  }, [hasBackgroundOverlay, visible]);

  return (
    <>
      {
        hasBackgroundOverlay && (
          <div
            className={
              classNames('DrawerBackgroundOverlay', {
                'DrawerBackgroundOverlay--active': visible,
              })
            }
            role="presentation"
            onClick={onRequestClose}
            onKeyDown={handleEscKeyPress}
          />
        )
      }
      <div className={drawerClasses}>
        <ExpandContext.Provider value={{ expandable, expanded, handleExpand }}>
          {children}
        </ExpandContext.Provider>
      </div>
    </>
  );
};

Drawer.propTypes = {
  behindNav: propTypes.bool,
  children: propTypes.node,
  className: propTypes.string,
  defaultExpanded: propTypes.bool,
  expandable: propTypes.bool,
  hasBackgroundOverlay: propTypes.bool,
  orientation: propTypes.oneOf([ORIENTATION_LEFT, ORIENTATION_RIGHT]),
  size: propTypes.oneOf([DrawerSizes.SMALL, DrawerSizes.MEDIUM, DrawerSizes.LARGE]),
  visible: propTypes.bool.isRequired,
  onRequestClose: propTypes.func.isRequired,
};

Drawer.defaultProps = {
  behindNav: true,
  children: undefined,
  className: null,
  defaultExpanded: false,
  expandable: false,
  hasBackgroundOverlay: true,
  orientation: ORIENTATION_RIGHT,
  size: 'sm',
};

export default Drawer;
