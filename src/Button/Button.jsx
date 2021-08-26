import React from 'react';
import { Button as ReactBootstrapButton } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Button.scss';
import classNames from 'classnames';

const Button = ({
  active,
  bsPrefix,
  className,
  children,
  disabled,
  href,
  leadingIcon,
  size,
  trailingIcon,
  type,
  variant,
  ...props
}) => (
  <ReactBootstrapButton
    active={active}
    bsPrefix={bsPrefix}
    className={classNames(
        className,
        'Button',
        `Button--${variant}`,
      )}
    disabled={disabled}
    href={href}
    size={size}
    type={type}
    variant={variant}
    {...props}
  >
    { leadingIcon && (
    <FontAwesomeIcon className="Button__leading-icon" icon={leadingIcon} />
      )}
    { children }
    { trailingIcon && (
    <FontAwesomeIcon className="Button__trailing-icon" icon={trailingIcon} />
      )}
  </ReactBootstrapButton>
  );

Button.propTypes = {
  active: PropTypes.bool,
  bsPrefix: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  leadingIcon: PropTypes.object,
  size: PropTypes.oneOf(['sm', 'lg']),
  trailingIcon: PropTypes.object,
  type: PropTypes.oneOf(['button', 'reset', 'submit', null]),
  variant: PropTypes.string,
};

Button.defaultProps = {
  active: false,
  bsPrefix: 'btn',
  className: undefined,
  disabled: false,
  href: undefined,
  leadingIcon: undefined,
  size: undefined,
  trailingIcon: undefined,
  type: 'button',
  variant: 'primary',
};

export default Button;
