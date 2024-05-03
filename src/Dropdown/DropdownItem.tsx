import React from 'react';
import classNames from 'classnames';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Dropdown as RBDropdown,
  type DropdownProps as RBDropdownProps,
} from 'react-bootstrap';

import styles from './DropdownItem.module.scss';

type DropdownItemProps = {
  /**
   Highlight the menu item as active.
  */
  active?: boolean;
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
  /**
    Disable the menu item, making it unselectable.
   */
  disabled?: boolean;
  /**
    Value passed to the onSelect handler, useful for identifying the selected menu item.
  */
  eventKey?: string | number;
  /**
    HTML href attribute corresponding to a.href.
   */
  href?: string;
  leadingIcon?: IconDefinition;
  /**
    Callback fired when the menu item is clicked.
   */
  onClick?: RBDropdownProps['onClick'];
  children?: React.ReactNode;
};

const DropdownItem = ({
  active,
  as,
  children,
  className,
  disabled = false,
  eventKey,
  href,
  leadingIcon,
  onClick,
  bsPrefix = 'dropdown-item',
  ...props
}: DropdownItemProps) => (
  <RBDropdown.Item
    active={active}
    as={as}
    bsPrefix={bsPrefix}
    className={classNames(
      className,
      'DropdownItem',
      styles.DropdownItem,
    )}
    disabled={disabled}
    eventKey={eventKey}
    href={href}
    onClick={onClick}
    {...props}
  >
    { leadingIcon && <FontAwesomeIcon className={classNames(styles.DropdownItemIcon, 'icon-left', 'fa-fw')} icon={leadingIcon} /> }
    { children }
  </RBDropdown.Item>
);

export default DropdownItem;
