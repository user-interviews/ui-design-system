import React from 'react';
import classNames from 'classnames';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dropdown as RBDropdown } from 'react-bootstrap';

import './DropdownToggle.scss';

type DropdownToggleProps = {
  /**
   Be sure to include an appropriate aria-label when using only an icon
   for the DropdownToggle.
  */
  ariaLabel?: string;
  /**
    You can use a custom element type for this component.
   */
  as?: React.ElementType;
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
   This is an escape hatch for working with heavily customized bootstrap css.
  */
  bsPrefix?: string;
  /**
    To pass through to the underlying button or whatever from DropdownButton
  */
  childBsPrefix?: string;
  children?: React.ReactNode;
  className?: string;
  /**
    An html id attribute, necessary for assistive technologies, such as screen readers.
  */
  id?: string;
  leadingIcon?: IconDefinition;
  /**
    Conditionally changes the bsPrefix in order to remove the default caret icon.
    This allows you to use a different icon of your choice.
  */
  removeCaret?: boolean;
  size?: 'sm' | 'lg';
  /**
    If true, it removes all styling from toggle button. Use for full custom DropdownToggle styling.
  */
  unstyled?: boolean;
  variant?: 'transparent' | 'outline-primary' | 'primary';
  split?: boolean;
};

const DropdownToggle = ({
  as,
  ariaLabel = 'dropdown-toggle',
  bsPrefix = 'dropdown-toggle',
  childBsPrefix,
  children,
  className,
  id,
  leadingIcon,
  removeCaret,
  unstyled,
  ...props
}: DropdownToggleProps) => (
  <RBDropdown.Toggle
    aria-label={ariaLabel}
    as={as}
    bsPrefix={removeCaret ? 'DropdownToggle--no-caret' : bsPrefix}
    childBsPrefix={childBsPrefix}
    className={classNames(
        'DropdownToggle',
        className,
        { 'DropdownToggle--unstyled': unstyled },
      )}
    id={id}
    {...props}
  >
    { leadingIcon && (<FontAwesomeIcon className="icon-left" icon={leadingIcon} />)}
    { children }
  </RBDropdown.Toggle>
);

export default DropdownToggle;
