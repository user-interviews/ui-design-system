import React, {
  createElement,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

import classNames from 'classnames';

import { LoadingSkeleton } from '../LoadingSkeleton';

import './Card.scss';

export const CardSizes = {
  EXTRA_SMALL: 'xs',
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
} as const;

type ElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

/** Root node is `elementType`; standard HTML attributes spread onto it via `ElementProps`. */
type CardProps = {
  children?: ReactNode;
  className?: string;
  /** Inserts an `hr` before `subTitle`/`children` and `Card--divided` (pulls title bottom margin when `title` is present). */
  divided?: boolean;
  /** Outer element tag name for `createElement` (default `'section'`). */
  elementType?: string;
  /** Shown beside `title` in the header row. */
  helperText?: ReactNode;
  /** Swaps the body for `loadingSkeleton` or the default skeleton (default `false`). */
  isLoading?: boolean;
  /** Custom loading UI; used only when `isLoading`. */
  loadingSkeleton?: ReactNode;
  /** Paragraph skeleton groups in the default loading layout (default `1`). */
  loadingSkeletonParagraphCount?: number;
  /** Removes outer padding (`Card--no-padding`; default `false`). */
  noPadding?: boolean;
  /** Responsive max width via `Card--{size}` (`CardSizes` / `'xs' | 'sm' | 'md' | 'lg'`). */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Optional `h3` after the optional divider, before `children`. */
  subTitle?: ReactNode;
  /** Optional `h2` header row; enables `helperText` in that row. */
  title?: ReactNode;
} & ElementProps;

function Card({
  children,
  className,
  divided = false,
  elementType = 'section',
  helperText,
  isLoading = false,
  loadingSkeleton,
  loadingSkeletonParagraphCount = 1,
  noPadding = false,
  size,
  subTitle,
  title,
  ...props
}: CardProps) {
  const defaultLoadingSkeleton = (
    <>
      <LoadingSkeleton height={24} width="33%" />
      <br />
      {Array(loadingSkeletonParagraphCount)
        .fill(0)
        .map((_, i) => (
          // oxlint-disable-next-line react/no-array-index-key
          <div
            className="Card__loading-skeleton-paragraphs"
            key={`skeleton-paragraph-${i}`}
          >
            <LoadingSkeleton count={3} />
          </div>
        ))}
    </>
  );

  return createElement(
    elementType,
    {
      ...props,
      className: classNames('Card', { [`Card--${size}`]: size }, className, {
        'Card--divided': divided,
        'Card--no-padding': noPadding,
      }),
    },
    isLoading ? (
      loadingSkeleton || defaultLoadingSkeleton
    ) : (
      <>
        {title && (
          <div className="Card__header">
            <h2 className="Card__title">{title}</h2>
            {helperText && (
              <span className="Card__helper-text">{helperText}</span>
            )}
          </div>
        )}

        {divided && <hr className="Card__divider" />}
        {subTitle && <h3 className="Card__subtitle">{subTitle}</h3>}
        {children}
      </>
    ),
  );
}

export default Card;
