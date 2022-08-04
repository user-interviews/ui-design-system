import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Dropdown as RBDropdown } from 'react-bootstrap';
import { DROPDOWN_ALIGN_PROP_TYPE } from './Dropdown.types';

import './DropdownMenu.scss';

const DropdownMenu = ({
  align,
  as,
  children,
  className,
  flip,
  noPadding,
  onSelect,
  popperConfig,
  renderOnMount,
  rootCloseEvent,
  show,
  variant,
  bsPrefix,
  ...props
}) => (
  <RBDropdown.Menu
    align={align}
    as={as}
    bsPrefix={bsPrefix}
    className={classNames(
      'DropdownMenu',
      className,
      noPadding && 'DropdownMenu--no-padding',
    )}
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

DropdownMenu.propTypes = {
  /**
    Aligns the dropdown menu to the specified side of the Dropdown toggle.
    You can also align the menu responsively for breakpoints starting at sm and up.
    The alignment direction will affect the specified breakpoint or larger.
    Note: Using responsive alignment will disable Popper usage for positioning.
   */
  align: DROPDOWN_ALIGN_PROP_TYPE,
  /**
    You can use a custom element type for this component.
   */
  as: PropTypes.elementType,
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
   This is an escape hatch for working with heavily customized bootstrap css.
   */
  bsPrefix: PropTypes.string,
  className: PropTypes.string,
  /**
    Have the dropdown switch to it's opposite placement when necessary to stay on screen.
   */
  flip: PropTypes.bool,
  /**
    If true, removes default padding on DropdownMenu.
   */
  noPadding: PropTypes.bool,
  /**
   A set of popper options and props passed directly to Popper.
   */
  popperConfig: PropTypes.object,
  /**
   Whether to render the dropdown menu in the DOM before the first time it is shown.
   */
  renderOnMount: PropTypes.bool,
  /**
   Which event when fired outside the component will cause it to be closed.
   Note: For custom dropdown components, you will have to pass the rootCloseEvent to
   <RootCloseWrapper> in your custom dropdown menu component (similarly to how it is implemented in
    <Dropdown.Menu>).
    */
  rootCloseEvent: PropTypes.oneOf([
    'click', 'mousedown',
  ]),
   /**
    Controls the visibility of the Dropdown menu.
    */
  show: PropTypes.bool,
   /**
    Menu color variant.
    */
  variant: PropTypes.string,
  onSelect: PropTypes.func,
};

DropdownMenu.defaultProps = {
  align: undefined,
  as: undefined,
  className: undefined,
  flip: true,
  noPadding: undefined,
  onSelect: undefined,
  popperConfig: undefined,
  renderOnMount: undefined,
  rootCloseEvent: undefined,
  show: undefined,
  variant: undefined,
  bsPrefix: 'dropdown-menu',
};

export default DropdownMenu;
