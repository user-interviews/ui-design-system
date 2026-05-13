import { createElement, forwardRef } from 'react';

import classNames from 'classnames';

import * as styles from './Text.module.css';

export const TEXT_PROPS = {
  size: {
    sm: 'sm',
    md: 'md',
  },
  weight: {
    regular: 'regular',
    medium: 'medium',
    bold: 'bold',
  },
  textAlign: {
    left: 'left',
    center: 'center',
    right: 'right',
  },
};

type ElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export type TextProps = ElementProps & {
  as?: Exclude<
    keyof JSX.IntrinsicElements,
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  >;
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md'; // TODO: refactor any usages of 'lg' to use a class
  textAlign?: 'left' | 'center' | 'right';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  noMargin?: boolean;
};

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    // oxlint-disable-next-line local-rules/max-props
    {
      as = 'p',
      children,
      className,
      size = 'md',
      textAlign,
      weight = 'regular',
      noMargin = false,
      ...props
    },
    ref,
  ) => {
    return createElement(
      as,
      {
        ref,
        style: { textAlign },
        className: classNames(className, styles.text, {
          [styles.medium]: size === 'md',
          [styles.small]: size === 'sm',
          [styles.weightBold]: weight === 'bold',
          [styles.weightSemibold]: weight === 'semibold',
          [styles.weightMedium]: weight === 'medium',
          [styles.weightRegular]: weight === 'regular',
          [styles.noMargin]: noMargin,
          [styles.textAlignLeft]: textAlign === 'left',
          [styles.textAlignCenter]: textAlign === 'center',
          [styles.textAlignRight]: textAlign === 'right',
        }),
        ...props,
      },
      children,
    );
  },
);

Text.displayName = 'Text';
