import type {
  DetailedHTMLProps,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import React from 'react';

import classNames from 'classnames';

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
  props: CardButtonProps,
): props is BaseCardButtonProps & { as: 'a' } & LinkProps {
  if (props.as === 'a') {
    return true;
  }
  return false;
}

export function CardButton(props: CardButtonProps) {
  const { alignment = 'center', children, className, size, datatestid } = props;
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
  );

  if (isLinkButton(props)) {
    const { as: _as, ...linkProps } = props;
    return (
      <a {...linkProps} className={classes} data-testid={datatestid ?? ''}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      aria-disabled={buttonProps.disabled}
      className={classes}
      data-testid={datatestid ?? ''}
      type={buttonProps.type ?? 'button'}
    >
      {children}
    </button>
  );
}
