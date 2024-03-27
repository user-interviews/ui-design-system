import React, {
  createElement,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import classNames from 'classnames';

import { LoadingSkeleton } from 'src/LoadingSkeleton';

import './Card.scss';

export const CardSizes = {
  EXTRA_SMALL: 'xs',
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
} as const;

type ElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

type CardProps = {
  children?: ReactNode;
  className?: string;
  divided?: boolean;
  elementType?: string;
  helperText?: ReactNode;
  isLoading?: boolean;
  loadingSkeleton?: ReactNode;
  loadingSkeletonParagraphCount?: number;
  noPadding?: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg';
  subTitle?: ReactNode;
  title?: ReactNode;
} & ElementProps;

const Card = ({
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
}: CardProps) => {
  const defaultLoadingSkeleton = (
    <>
      <LoadingSkeleton height={24} width="33%" />
      <br />
      {Array(loadingSkeletonParagraphCount).fill(0).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="Card__loading-skeleton-paragraphs" key={`skeleton-paragraph-${i}`}>
          <LoadingSkeleton count={3} />
        </div>
      ))}
    </>
  );

  return createElement(
    elementType,
    {
      ...props,
      className: classNames(
        'Card',
        { [`Card--${size}`]: size },
        className,
        {
          'Card--divided': divided,
          'Card--no-padding': noPadding,
        },
      ),
    },
    <>
      {isLoading ? (loadingSkeleton || defaultLoadingSkeleton) : (
        <>
          {title && (
            <div className="Card__header">
              <h2 className="Card__title">{title}</h2>
              {helperText && <span className="Card__helper-text">{helperText}</span>}
            </div>
          )}

          {divided && <hr className="Card__divider" /> }
          {subTitle && <h3 className="Card__subtitle">{subTitle}</h3> }
          {children}
        </>
      )}
    </>,
  );
};

export default Card;
