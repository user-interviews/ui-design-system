import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Dropdown as RBDropdown } from 'react-bootstrap';

import './DropdownToggle.scss';

const DropdownToggle = ({
  as,
  ariaLabel,
  bsPrefix,
  childBsPrefix,
  children,
  className,
  id,
  leadingIcon,
  removeCaret,
  unstyled,
  ...props
}) => (
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

DropdownToggle.propTypes = {
   /**
    Be sure to include an appropriate aria-label when using only an icon
    for the DropdownToggle.
   */
  ariaLabel: PropTypes.string,
  /**
    You can use a custom element type for this component.
   */
  as: PropTypes.elementType,
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
   This is an escape hatch for working with heavily customized bootstrap css.
  */
  bsPrefix: PropTypes.string,
  /**
    To pass through to the underlying button or whatever from DropdownButton
  */
  childBsPrefix: PropTypes.string,
  className: PropTypes.string,
  /**
    An html id attribute, necessary for assistive technologies, such as screen readers.
  */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  leadingIcon: PropTypes.object,
  /**
    Conditionally changes the bsPrefix in order to remove the default caret icon.
    This allows you to use a different icon of your choice.
  */
  removeCaret: PropTypes.bool,
  /**
    If true, it removes all styling from toggle button. Use for full custom DropdownToggle styling.
  */
  unstyled: PropTypes.bool,
};

DropdownToggle.defaultProps = {
  as: undefined,
  ariaLabel: 'dropdown-toggle',
  bsPrefix: 'dropdown-toggle',
  className: undefined,
  childBsPrefix: undefined,
  id: undefined,
  leadingIcon: undefined,
  removeCaret: undefined,
  unstyled: undefined,
};

export default DropdownToggle;
