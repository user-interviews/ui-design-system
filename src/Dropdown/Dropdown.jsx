import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown as RBDropdown } from 'react-bootstrap';
import {
  DROPDOWN_ALIGN_TYPE,
  DROPDOWN_AUTO_CLOSE_TYPE,
  DROPDOWN_DROP_TYPE,
  DROPDOWN_FOCUS_FIRST_ITEM_ON_SHOW_TYPE,
} from './Dropdown.types';

const Dropdown = ({
  align,
  as,
  autoClose,
  children,
  className,
  drop,
  flip,
  focusFirstItemOnShow,
  navbar,
  onSelect,
  onToggle,
  show,
  bsPrefix,
  ...props
}) => (
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

Dropdown.propTypes = {
  /**
    Aligns the dropdown menu to the specified side of the Dropdown toggle.
    You can also align the menu responsively for breakpoints starting at sm and up.
    The alignment direction will affect the specified breakpoint or larger.
    Note: Using responsive alignment will disable Popper usage for positioning.
   */
  align: PropTypes.oneOf(DROPDOWN_ALIGN_TYPE),
  /**
    You can use a custom element type for this component.
   */
  as: PropTypes.elementType,
  /**
    Controls the auto close behaviour of the dropdown when clicking
    outside of the button or the list.
   */
  autoClose: PropTypes.oneOf(DROPDOWN_AUTO_CLOSE_TYPE),
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
   This is an escape hatch for working with heavily customized bootstrap css.
   */
  bsPrefix: PropTypes.string,
  children: PropTypes.node,
  /**
   Determines the direction and location of the Menu in relation to it's Toggle.
   */
  className: PropTypes.string,
  drop: PropTypes.oneOf(DROPDOWN_DROP_TYPE),
  /**
    Allow Dropdown to flip in case of an overlapping on the reference element.
    For more information refer to Popper.js's flip docs.
   */
  flip: PropTypes.bool,
  /**
    Controls the focus behavior for when the Dropdown is opened.
    Set to true to always focus the first menu item,
    keyboard to focus only when navigating via the keyboard,
    or false to disable completely.
    The Default behavior is false unless the Menu has a role="menu" where it will default to
    keyboard to match the recommended ARIA Authoring practices.
   */
  focusFirstItemOnShow: PropTypes.oneOf(DROPDOWN_FOCUS_FIRST_ITEM_ON_SHOW_TYPE),
  navbar: PropTypes.bool,
  /**
   Whether or not the Dropdown is visible.
   */
  show: PropTypes.bool,
  /**
    A callback fired when a menu item is selected.
    (eventKey: any, event: Object) => any
  */
  onSelect: PropTypes.func,
  /**
   A callback fired when the Dropdown wishes to change visibility.
   Called with the requested show value, the DOM event, and the source that fired it:
   'click','keydown','rootClose', or 'select'.
  */
  onToggle: PropTypes.func,
};

Dropdown.defaultProps = {
  align: 'start',
  as: undefined,
  autoClose: true,
  bsPrefix: 'dropdown',
  className: undefined,
  children: undefined,
  drop: undefined,
  flip: undefined,
  focusFirstItemOnShow: undefined,
  navbar: false,
  onSelect: undefined,
  onToggle: undefined,
  show: undefined,
};

export default Dropdown;
