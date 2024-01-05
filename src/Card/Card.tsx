import React, {
 createElement, type FunctionComponent, type ComponentClass, type ReactNode,
} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { LoadingSkeleton } from '../LoadingSkeleton';

import './Card.scss';

export const CardSizes = {
  EXTRA_SMALL: 'xs',
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
} as const;

export type CardProps = {
  children?: ReactNode;
  className?: string;
  divided?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elementType?: string | FunctionComponent<unknown> | ComponentClass<any, unknown>;
  helperText?: string;
  isLoading?: boolean;
  loadingSkeleton?: ReactNode;
  loadingSkeletonParagraphCount?: number;
  noPadding?: boolean;
  size?: typeof CardSizes[keyof typeof CardSizes];
  subTitle?: string;
  title?: string;
}

const Card = ({
  children,
  className,
  divided,
  elementType = 'section',
  helperText,
  isLoading,
  loadingSkeleton,
  loadingSkeletonParagraphCount,
  noPadding,
  size,
  subTitle,
  title,
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
  const getLoadingSkeleton = () => loadingSkeleton || defaultLoadingSkeleton;

  const cardChildren = (
    <>
      {isLoading ? (
        getLoadingSkeleton()) : (
          <>
            { title && (
            <div className="Card__header">
              <h2 className="Card__title">{title}</h2>
              { helperText && <span className="Card__helper-text">{helperText}</span>}
            </div>
      )}

            { divided && <hr className="Card__divider" /> }
            { subTitle && <h3 className="Card__subtitle">{subTitle}</h3> }
            { children }
          </>
      )}
    </>
  );

  return createElement(
    elementType,
    {
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
    cardChildren,
  );
};

Card.propTypes = {
  className: PropTypes.string,
  divided: PropTypes.bool,
  elementType: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  helperText: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingSkeleton: PropTypes.node,
  loadingSkeletonParagraphCount: PropTypes.number,
  noPadding: PropTypes.bool,
  size: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

Card.defaultProps = {
  className: undefined,
  divided: false,
  elementType: 'section',
  helperText: undefined,
  isLoading: undefined,
  loadingSkeleton: undefined,
  loadingSkeletonParagraphCount: 1,
  noPadding: false,
  size: undefined,
  subTitle: undefined,
  title: undefined,
};

export default Card;
