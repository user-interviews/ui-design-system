import { createElement, ReactNode } from 'react';

import classNames from 'classnames';

import * as styles from './Heading.module.css';

export const HEADER_PROPS = {
  size: {
    large: 'large',
    medium: 'medium',
    small: 'small',
  },
};

export interface HeadingProps {
  children?: ReactNode;
  className?: string;
  /**
   * @type {number}
   * @description Choose the appropriate heading level (h1 to h6) based on a
   * page's semantic structure.
   * Headings define the document structure, and screen readers use them for navigation.
   * For accessibility, a page must contain at least one h1, headings should follow a
   * logical hierarchy where each heading level represents a sublevel of the previous one,
   * and avoid skipping levels.
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * @type {string}
   * @description Sizes map to the available font-sizes from the defined list of font-types.
   * Adjust for visual hierarchy.
   *
   * TODO: Update this to only use the HeaderSizes keys
   */
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | HEADER_PROPS.size.large | HEADER_PROPS.size.medium | HEADER_PROPS.size.small;
  textAlign?: 'left' | 'center' | 'right';
  weight?: 'regular' | 'medium' | 'bold';
}

const SizeToClass = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
  xxl: styles.xxl,
  xxxl: styles.xxxl,
  [HEADER_PROPS.size.large]: styles.xxxl,
  [HEADER_PROPS.size.medium]: styles.xl,
  [HEADER_PROPS.size.small]: styles.lg,
}

/* TODO Update this so that 2 is xl and 3 is lg */
const LevelToClass = {
  1: styles.xxxl,
  2: styles.xxl,
  3: styles.xl,
  4: styles.lg,
  5: styles.md,
  6: styles.sm,
};

const WeightToClass = {
  bold: styles.bold,
  regular: styles.regular,
  medium: styles.medium,
}

export function Heading({
  children,
  className,
  level = 1,
  size,
  textAlign,
  weight = 'bold',
  ...props
}: HeadingProps) {
  return createElement(
    `h${level}`,
    {
      style: { textAlign },
      className: classNames(
        className, /* TODO Remove this and wrap all overrides into variants */
        'Heading', /* TODO Remove this once we remove anything targetting this directly */
        size ? SizeToClass[size] : LevelToClass[level],
        WeightToClass[weight],
      ),
      ...props, /* TODO Remove this */
    },
    children,
  );
}
