import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button as RBButton,
  type ButtonProps as RBButtonProps,
} from 'react-bootstrap';

import { faSpinnerThird } from '../font_awesome/regular';

import './Button.scss';

export enum ButtonSizes {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
}

export enum ButtonVariants {
  BRAND_GOOGLE = 'brand-google',
  BRAND_FACEBOOK = 'brand-facebook',
  BRAND_LINKEDIN = 'brand-linkedin',
  BRAND_TWITTER = 'brand-twitter',
  LINK = 'link',
  OUTLINE_PRIMARY = 'outline-primary',
  OUTLINE_TRANSPARENT = 'outline-transparent',
  PRIMARY = 'primary',
  TERTIARY = 'tertiary',
  TRANSPARENT = 'transparent',
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
