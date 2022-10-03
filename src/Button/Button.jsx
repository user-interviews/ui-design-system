import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button as RBButton } from 'react-bootstrap';

import './Button.scss';

const Button = forwardRef(({
  children,
  className,
  leadingIcon,
  trailingIcon,
  ...props
}, ref) => (
  <RBButton
    className={classNames('Button', className)}
    ref={ref}
    {...props}
  >
    { leadingIcon && (<FontAwesomeIcon className="icon-left" icon={leadingIcon} />)}
    { children }
    { trailingIcon && (<FontAwesomeIcon className="icon-right" icon={trailingIcon} />)}
  </RBButton>
  ));

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  leadingIcon: PropTypes.object,
  trailingIcon: PropTypes.object,
};

Button.defaultProps = {
  children: undefined,
  className: undefined,
  leadingIcon: undefined,
  trailingIcon: undefined,
};
export default Button;
