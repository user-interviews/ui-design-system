import { createElement, ReactNode } from 'react';

import classNames from 'classnames';

import * as styles from './Heading.module.css';

export enum HeadingSize {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
  TEXT = 'text',
  SUBTEXT = 'subtext',
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
   */
  size: HeadingSize;
  textAlign?: 'left' | 'center' | 'right';
  weight?: 'regular' | 'medium' | 'bold';
}

const SIZE_CLASSES = {
  [HeadingSize.LARGE]: styles.large,
  [HeadingSize.MEDIUM]: styles.medium,
  [HeadingSize.SMALL]: styles.small,
  [HeadingSize.TEXT]: styles.text,
  [HeadingSize.SUBTEXT]: styles.subtext,
} as const;

/* TODO Remove this? */
const LEVEL_CLASSES = {
  1: styles.large,
  2: styles.medium,
  3: styles.medium, // This should be small?
  4: styles.small,
  5: styles.text,
  6: styles.subtext,
} as const;

const WEIGHT_CLASSES = {
  bold: styles.bold,
  regular: styles.regular,
  medium: styles.medium,
} as const;

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
        size ? SIZE_CLASSES[size] : LEVEL_CLASSES[level],
        WEIGHT_CLASSES[weight],
      ),
      ...props, /* TODO Remove this */
    },
    children,
  );
}
