import React, { forwardRef } from 'react';
import {
  Button as RBButton,
  type ButtonProps as RBButtonProps,
} from 'react-bootstrap';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

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
  /** Spinner replaces `children`; also forces `disabled` and `aria-disabled`. */
  isLoading?: boolean;
  /** Renders before `children` when not `isLoading`. */
  leadingIcon?: IconDefinition;
  /** Shown beside the spinner while `isLoading` (default `Loading...`). */
  loadingText?: string;
  /** Renders after `children` when not `isLoading`. */
  trailingIcon?: IconDefinition;
};

// Browser translation (e.g. Chrome's Google Translate) replaces bare text nodes with
// its own elements, so React later fails to insert/remove around the stale node when
// the button swaps content. Text inside an element React owns is safe to translate.
const wrapText = (content: React.ReactNode) =>
  (typeof content === 'string' && content !== '') || typeof content === 'number' ? (
    <span>{content}</span>
  ) : (
    content
  );

const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading,
      leadingIcon,
      loadingText = 'Loading...',
      trailingIcon,
      ...props
    },
    ref,
  ) => (
    <RBButton
      aria-disabled={disabled || isLoading}
      className={classNames('Button', className)}
      disabled={disabled || isLoading}
      ref={ref}
      {...props}
    >
      {!isLoading ? (
        <>
          {leadingIcon && (
            <FontAwesomeIcon className="icon-left" icon={leadingIcon} />
          )}
          {wrapText(children)}
          {trailingIcon && (
            <FontAwesomeIcon className="icon-right" icon={trailingIcon} />
          )}
        </>
      ) : (
        <>
          <FontAwesomeIcon
            className="icon-left btn-loading-spin"
            icon={faSpinnerThird as IconDefinition}
          />
          {wrapText(loadingText)}
        </>
      )}
    </RBButton>
  ),
);

Button.displayName = 'Button';

export default Button;
