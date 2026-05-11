import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';

import classNames from 'classnames';

import './Drawer.scss';

export const ORIENTATION_LEFT = 'left';
export const ORIENTATION_RIGHT = 'right';

export const ExpandContext = createContext<{
  expandable: boolean;
  expanded: boolean;
  handleExpand: () => void;
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
  /** Top padding for fixed nav clearance (`Drawer--behind-nav`; default `true`). */
  behindNav?: boolean;
  /** Typically `DrawerHeader`, `DrawerBody`, and `DrawerFooter`. */
  children?: React.ReactNode;
  className?: string;
  /** When true, clicking the dimmed overlay calls `onRequestClose` (default `true`). */
  closeOnOverlayClick?: boolean;
  /** Initial expanded width when `expandable` (`false` default). */
  defaultExpanded?: boolean;
  /** Enables expand/collapse control via `ExpandContext` (`false` default). */
  expandable?: boolean;
  /** Renders the backdrop and toggles body scroll lock (`Drawer--open`; default `true`). */
  hasBackgroundOverlay?: boolean;
  /** Slide edge (`ORIENTATION_LEFT` / `ORIENTATION_RIGHT`; default `right`). */
  orientation?: typeof ORIENTATION_LEFT | typeof ORIENTATION_RIGHT;
  /** Width preset from `DrawerSizes` (default `sm`). */
  size?: (typeof DrawerSizes)[keyof typeof DrawerSizes];
  /** Drives open/closed presentation and escape key handling while true. */
  visible: boolean;
  /** Escape (when open), overlay (when `closeOnOverlayClick`), and header close should call this. */
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

  const drawerClasses = classNames(
    `Drawer Drawer--${orientation} Drawer--${size}`,
    {
      'Drawer--expanded': expanded,
      'Drawer--visible': !!visible,
      'Drawer--behind-nav': behindNav,
      [className]: !!className,
    },
  );

  const expandContentContextValue = useMemo(
    () => ({
      expandable,
      expanded,
      handleExpand,
    }),
    [expandable, expanded, handleExpand],
  );

  const handleEscKeyPress = useCallback(
    (event) => {
      if (visible && event.key === 'Escape') {
        onRequestClose();
      }
    },
    [onRequestClose, visible],
  );

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
      {hasBackgroundOverlay && (
        <div
          className={classNames('DrawerBackgroundOverlay', {
            'DrawerBackgroundOverlay--active': visible,
          })}
          role="presentation"
          onClick={closeOnOverlayClick ? onRequestClose : undefined}
          onKeyDown={handleEscKeyPress}
        />
      )}
      <div className={drawerClasses}>
        <ExpandContext.Provider value={expandContentContextValue}>
          {children}
        </ExpandContext.Provider>
      </div>
    </>
  );
}

export default Drawer;
