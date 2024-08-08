import React, { type ReactNode } from 'react';
import classNames from 'classnames';

import { Dropdown as RBDropdown } from 'react-bootstrap';

type DropdownMenuProps = {
  /**
    Aligns the dropdown menu to the specified side of the Dropdown toggle.
    You can also align the menu responsively for breakpoints starting at sm and up.
    The alignment direction will affect the specified breakpoint or larger.
    Note: Using responsive alignment will disable Popper usage for positioning.
   */
  align?: 'start' | 'end';
  /**
    You can use a custom element type for this component.
   */
  as?: React.ElementType;
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
   This is an escape hatch for working with heavily customized bootstrap css.
   */
  bsPrefix?: string;
  className?: string;
  children: ReactNode,
  /**
    Have the dropdown switch to it's opposite placement when necessary to stay on screen.
   */
  flip?: boolean;
  /**
   A set of popper options and props passed directly to Popper.
   */
  popperConfig?: object;
  /**
   Whether to render the dropdown menu in the DOM before the first time it is shown.
   */
  renderOnMount?: boolean;
  /**
   Which event when fired outside the component will cause it to be closed.
   Note: For custom dropdown components, you will have to pass the rootCloseEvent to
   <RootCloseWrapper> in your custom dropdown menu component (similarly to how it is implemented in
    <Dropdown.Menu>).
    */
  rootCloseEvent?: 'click' | 'mousedown';
  /**
   Controls the visibility of the Dropdown menu.
   */
  show?: boolean;
  /**
   Menu color variant.
   */
  variant?: string;
  onSelect?: (...args: unknown[]) => unknown;
};

function DropdownMenu({
  align,
  as,
  children,
  className,
  flip = true,
  onSelect,
  popperConfig,
  renderOnMount,
  rootCloseEvent,
  show,
  variant,
  bsPrefix = 'dropdown-menu',
  ...props
}: DropdownMenuProps) {
  return (
    <RBDropdown.Menu
      align={align}
      as={as}
      bsPrefix={bsPrefix}
      className={classNames('DropdownMenu', className)}
      flip={flip}
      popperConfig={popperConfig}
      renderOnMount={renderOnMount}
      rootCloseEvent={rootCloseEvent}
      show={show}
      variant={variant}
      onSelect={onSelect}
      {...props}
    >
      { children }
    </RBDropdown.Menu>
  );
}

export default DropdownMenu;
