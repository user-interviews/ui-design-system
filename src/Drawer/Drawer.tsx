import React, {
  createContext, useEffect, useState, useCallback, useRef, useMemo,
} from 'react';
import classNames from 'classnames';

import './Drawer.scss';

export const ORIENTATION_LEFT = 'left';
export const ORIENTATION_RIGHT = 'right';

export const ExpandContext = createContext<{
  expandable: boolean,
  expanded: boolean,
  handleExpand:() => void;
}>({
  expandable: false,
  expanded: false,
  handleExpand: () => null,
});

export const DrawerSizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
} as const;

type DrawerProps = {
  behindNav?: boolean;
  children?: React.ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
  defaultExpanded?: boolean;
  expandable?: boolean;
  hasBackgroundOverlay?: boolean;
  orientation?: typeof ORIENTATION_LEFT | typeof ORIENTATION_RIGHT;
  size?: typeof DrawerSizes[keyof typeof DrawerSizes];
  visible: boolean;
  onRequestClose: (...args: unknown[]) => unknown;
};

function Drawer({
  behindNav = true,
  children,
  className = '',
  defaultExpanded = false,
  closeOnOverlayClick = true,
  expandable = false,
  hasBackgroundOverlay = true,
  visible,
  orientation = ORIENTATION_RIGHT,
  size = 'sm',
  onRequestClose,
}: DrawerProps) {
  const isCurrentlyOpen = useRef(false);
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleExpand = useCallback(() => setExpanded(!expanded), [expanded]);

  const drawerClasses = classNames(`Drawer Drawer--${orientation} Drawer--${size}`, {
    'Drawer--expanded': expanded,
    'Drawer--visible': !!visible,
    'Drawer--behind-nav': behindNav,
    [className]: !!className,
  });

  const expandContentContextValue = useMemo(() => ({
    expandable, expanded, handleExpand,
  }), [expandable, expanded, handleExpand]);

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
    // isCurrentlyOpen ref accounts for a case where you could have multiple drawers
    // on one page and you try to access one of them via their url. Without using ref, the
    // Drawer--open would be potentially removed via other
    // closed drawer because of a race condition
    function disableBackgroundScrolling() {
      if (visible && !isCurrentlyOpen.current) {
        document.body.classList.add('Drawer--open');
        isCurrentlyOpen.current = true;
      }

      if (!visible && isCurrentlyOpen.current) {
        document.body.classList.remove('Drawer--open');
        isCurrentlyOpen.current = false;
      }
    }

    if (hasBackgroundOverlay) {
      disableBackgroundScrolling();
    }

    return () => {
      // Cleanup function to remove the class and reset the ref.
      // Covers the edge where you navigate to a new page
      // from drawer via a link
      if (hasBackgroundOverlay) {
        document.body.classList.remove('Drawer--open');
        isCurrentlyOpen.current = false;
      }
    };
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
            onClick={closeOnOverlayClick ? onRequestClose : undefined}
            onKeyDown={handleEscKeyPress}
          />
        )
      }
      <div className={drawerClasses}>
        <ExpandContext.Provider value={expandContentContextValue}>
          {children}
        </ExpandContext.Provider>
      </div>
    </>
  );
}

export default Drawer;
