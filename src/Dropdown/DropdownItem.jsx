import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dropdown as RBDropdown } from 'react-bootstrap';

import './DropdownItem.scss';

const DropdownItemVariants = {
  DANGER: 'danger',
};

const DropdownItem = ({
  active,
  as,
  children,
  className,
  disabled,
  eventKey,
  href,
  leadingIcon,
  onClick,
  variant,
  bsPrefix,
  ...props
}) => (
  <RBDropdown.Item
    active={active}
    as={as}
    bsPrefix={bsPrefix}
    className={classNames(
      className,
      'DropdownItem',
      variant && `DropdownItem--${variant}`,
    )}
    disabled={disabled}
    eventKey={eventKey}
    href={href}
    onClick={onClick}
    {...props}
  >
    { leadingIcon && <FontAwesomeIcon className="icon-left fa-fw" icon={leadingIcon} /> }
    { children }
  </RBDropdown.Item>
  );

DropdownItem.propTypes = {
   /**
    Highlight the menu item as active.
   */
  active: PropTypes.bool,
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
    Disable the menu item, making it unselectable.
   */
  disabled: PropTypes.bool,
  /**
    Value passed to the onSelect handler, useful for identifying the selected menu item.
  */
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
    HTML href attribute corresponding to a.href.
   */
  href: PropTypes.string,
  leadingIcon: PropTypes.object,
  /**
    Optional variant for controlling color and hover states (e.g. destructive actions)
   */
  variant: PropTypes.oneOf(Object.values(DropdownItemVariants)),
  /**
    Callback fired when the menu item is clicked.
   */
  onClick: PropTypes.func,
};

DropdownItem.defaultProps = {
  active: undefined,
  as: undefined,
  bsPrefix: 'dropdown-item',
  className: undefined,
  disabled: false,
  eventKey: undefined,
  href: undefined,
  leadingIcon: undefined,
  variant: undefined,
  onClick: undefined,
};

export default DropdownItem;
