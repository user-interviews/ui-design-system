import React from 'react';
import classNames from 'classnames';
import {
  Dropdown as RBDropdown,
  type DropdownProps as RBDropdownProps,
} from 'react-bootstrap';

type DropdownProps = {
  /**
    Aligns the dropdown menu to the specified side of the Dropdown toggle.
    You can also align the menu responsively for breakpoints starting at sm and up.
    The alignment direction will affect the specified breakpoint or larger.
    Note: Using responsive alignment will disable Popper usage for positioning.
   */
  align?: RBDropdownProps['align'];
  /**
    You can use a custom element type for this component.
   */
  as?: React.ElementType;
  /**
    Controls the auto close behaviour of the dropdown when clicking
    outside of the button or the list.
   */
  autoClose?: RBDropdownProps['autoClose'];
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
   This is an escape hatch for working with heavily customized bootstrap css.
   */
  bsPrefix?: string;
  /**
   Determines the direction and location of the Menu in relation to it's Toggle.
   */
  className?: string;
  drop?: RBDropdownProps['drop'];
  /**
    Allow Dropdown to flip in case of an overlapping on the reference element.
    For more information refer to Popper.js's flip docs.
   */
  flip?: boolean;
  /**
    Controls the focus behavior for when the Dropdown is opened.
    Set to true to always focus the first menu item,
    keyboard to focus only when navigating via the keyboard,
    or false to disable completely.
    The Default behavior is false unless the Menu has a role="menu" where it will default to
    keyboard to match the recommended ARIA Authoring practices.
   */
  focusFirstItemOnShow?: RBDropdownProps['focusFirstItemOnShow'];
  navbar?: boolean;
  /**
   Whether or not the Dropdown is visible.
   */
  show?: boolean;
  /**
    A callback fired when a menu item is selected.
    (eventKey: any, event: Object) => any
  */
  onSelect?: RBDropdownProps['onSelect'];
  /**
   A callback fired when the Dropdown wishes to change visibility.
   Called with the requested show value, the DOM event, and the source that fired it:
   'click','keydown','rootClose', or 'select'.
  */
  onToggle?: RBDropdownProps['onToggle'];
} & RBDropdownProps;

const Dropdown = ({
  align = 'start',
  as,
  autoClose = true,
  bsPrefix = 'dropdown',
  children,
  className,
  drop,
  flip,
  focusFirstItemOnShow,
  navbar = false,
  onSelect,
  onToggle,
  show,
  ...props
}: DropdownProps) => (
  <RBDropdown
    align={align}
    as={as}
    autoClose={autoClose}
    bsPrefix={bsPrefix}
    className={classNames('Dropdown', className)}
    drop={drop}
    flip={flip}
    focusFirstItemOnShow={focusFirstItemOnShow}
    navbar={navbar}
    show={show}
    onSelect={onSelect}
    onToggle={onToggle}
    {...props}
  >
    { children }
  </RBDropdown>
);

export default Dropdown;
