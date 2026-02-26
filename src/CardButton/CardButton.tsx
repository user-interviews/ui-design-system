import type {
  DetailedHTMLProps,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import React from 'react';

import classNames from 'classnames';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSpinnerThird } from '../font_awesome/solid';

import * as styles from './CardButton.module.css';

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type BaseCardButtonProps = {
  alignment?: 'left' | 'center' | 'right';
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
  as: 'a' | 'button';
  datatestid?: string;
};

type CardButtonProps =
  | (BaseCardButtonProps & {
    as: 'a';
  } & LinkProps)
  | (BaseCardButtonProps & {
    as: 'button';
  } & ButtonProps);

function isLinkButton(
  as: CardButtonProps['as'],
): as is 'a' {
  return as === 'a';
}

export function CardButton({
  alignment = 'center',
  children,
  className,
  datatestid,
  isLoading,
  size,
  ...rest
}: CardButtonProps) {
  const classes = classNames(
    styles.CardButton,
    className,
    {
      [styles.xs]: size === 'xs',
      [styles.sm]: size === 'sm',
      [styles.md]: size === 'md',
      [styles.lg]: size === 'lg',
      [styles.full]: size === 'full',
    },
    {
      [styles.left]: alignment === 'left',
      [styles.center]: alignment === 'center',
      [styles.right]: alignment === 'right',
    },
    {
      [styles.isLoading]: isLoading,
    },
  );

  if (isLinkButton(rest.as)) {
    const { as: _as, ...linkProps } = rest as BaseCardButtonProps & { as: 'a' } & LinkProps;
    return (
      <a {...linkProps} className={classes} data-testid={datatestid ?? ''}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonProps } = rest as BaseCardButtonProps & { as: 'button' } & ButtonProps;

  return (
    <button
      {...buttonProps}
      aria-disabled={buttonProps.disabled}
      className={classes}
      data-testid={datatestid ?? ''}
      disabled={buttonProps.disabled || isLoading}
      type={buttonProps.type ?? 'button'}
    >
      {children}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <FontAwesomeIcon
            className={styles.spinner}
            icon={faSpinnerThird as IconDefinition}
          />
        </div>
      )}
    </button>
  );
}
