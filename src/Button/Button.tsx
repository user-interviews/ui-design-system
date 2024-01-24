import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';

import {
  Button as RBButton,
  type ButtonProps as RBButtonProps,
} from 'react-bootstrap';

import './Button.scss';

export enum ButtonSizes {
  SMALL = 'sm',
  LARGE = 'lg',
}

export enum ButtonVariants {
  BRAND_GOOGLE = 'brand-google',
  BRAND_FACEBOOK = 'brand-facebook',
  BRAND_LINKEDIN = 'brand-linkedin',
  BRAND_TWITTER = 'brand-twitter',
  DANGER = 'danger',
  LINK = 'link',
  OUTLINE_DANGER = 'outline-danger',
  OUTLINE_PRIMARY = 'outline-primary',
  OUTLINE_WARNING = 'outline-warning',
  OUTLINE_TRANSPARENT = 'outline-transparent',
  PRIMARY = 'primary',
  TRANSPARENT = 'transparent',
  WARNING = 'warning',
}

export type ButtonProps = RBButtonProps & {
  isLoading?: boolean;
  leadingIcon?: IconDefinition;
  loadingText?: string;
  trailingIcon?: IconDefinition;
}

const Button = forwardRef<HTMLElement, ButtonProps>(({
  children,
  className,
  disabled,
  isLoading,
  leadingIcon,
  loadingText = 'Loading...',
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
        <FontAwesomeIcon className="icon-left btn-loading-spin" icon={faSpinnerThird as IconDefinition} />
        {loadingText}
      </>
    )}
  </RBButton>
  ));

export default Button;
