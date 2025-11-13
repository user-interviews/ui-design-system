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
  [HeadingSize.LARGE]: styles.sizeLarge,
  [HeadingSize.MEDIUM]: styles.sizeMedium,
  [HeadingSize.SMALL]: styles.sizeSmall,
  [HeadingSize.TEXT]: styles.sizeText,
  [HeadingSize.SUBTEXT]: styles.sizeSubtext,
} as const;

/* TODO Remove this? */
const LEVEL_CLASSES = {
  1: styles.sizeLarge,
  2: styles.sizeMedium,
  3: styles.sizeMedium, // This should be small?
  4: styles.sizeSmall,
  5: styles.sizeText,
  6: styles.sizeSubtext,
} as const;

const WEIGHT_CLASSES = {
  bold: styles.weightBold,
  regular: styles.weightRegular,
  medium: styles.weightMedium,
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
