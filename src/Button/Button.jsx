import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';

import { Button as RBButton } from 'react-bootstrap';

import './Button.scss';

export const ButtonSizes = {
  SMALL: 'sm',
  MEDIUM: 'md',
};

export const ButtonVariants = {
  BRAND_GOOGLE: 'brand-google',
  BRAND_FACEBOOK: 'brand-facebook',
  BRAND_LINKEDIN: 'brand-linkedin',
  BRAND_TWITTER: 'brand-twitter',
  DANGER: 'danger',
  LINK: 'link',
  OUTLINE_DANGER: 'outline-danger',
  OUTLINE_PRIMARY: 'outline-primary',
  OUTLINE_WARNING: 'outline-warning',
  OUTLINE_TRANSPARENT: 'outline-transparent',
  PRIMARY: 'primary',
  TRANSPARENT: 'transparent',
  WARNING: 'warning',
};

const Button = forwardRef(({
  children,
  className,
  disabled,
  isLoading,
  leadingIcon,
  loadingText,
  trailingIcon,
  ...props
}, ref) => (
  <RBButton
    aria-disabled={disabled || isLoading}
    className={classNames('Button', className)}
    disabled={disabled || isLoading}
    ref={ref}
    {...props}
  >
    { !isLoading ? (
      <>
        { leadingIcon && (<FontAwesomeIcon className="icon-left" icon={leadingIcon} />)}
        { children }
        { trailingIcon && (<FontAwesomeIcon className="icon-right" icon={trailingIcon} />)}
      </>
    ) : (
      <>
        <FontAwesomeIcon className="icon-left btn-loading-spin" icon={faSpinnerThird} />
        {loadingText}
      </>
    )}
  </RBButton>
  ));

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  leadingIcon: PropTypes.object,
  loadingText: PropTypes.string,
  trailingIcon: PropTypes.object,
};

Button.defaultProps = {
  children: undefined,
  className: undefined,
  disabled: false,
  isLoading: undefined,
  leadingIcon: undefined,
  loadingText: 'Loading...',
  trailingIcon: undefined,
};
export default Button;
