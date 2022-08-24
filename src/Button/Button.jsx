import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button as RBButton } from 'react-bootstrap';

import './Button.scss';

const BUTTON_SIZES = {
  LARGE: 'lg',
  MEDIUM: 'md',
  SMALL: 'sm',
};

const Button = ({
  children,
  className,
  leadingIcon,
  size,
  trailingIcon,
  ...props
}) => (
  <RBButton
    className={classNames('Button', className)}
    size={size}
    {...props}
  >
    { leadingIcon && (<FontAwesomeIcon className="icon-left" icon={leadingIcon} />)}
    { children }
    { trailingIcon && (<FontAwesomeIcon className="icon-right" icon={trailingIcon} />)}
  </RBButton>
  );

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  leadingIcon: PropTypes.object,
  size: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  trailingIcon: PropTypes.object,
};

Button.defaultProps = {
  children: undefined,
  className: undefined,
  leadingIcon: undefined,
  size: BUTTON_SIZES.MEDIUM,
  trailingIcon: undefined,
};
export default Button;
