import React from 'react';
import classNames from 'classnames';

import Skeleton, { SkeletonTheme, type SkeletonProps } from 'react-loading-skeleton';

import colors from '../Styles/colors/palette';

import './LoadingSkeleton.scss';

export type LoadingSkeletonProps = SkeletonProps & {
  /**
  The border radius of the skeleton.
  */
  borderRadius?: number | string;
  /**
  Makes the skeleton circular by setting border-radius to 50%.
  */
  circle?: boolean;
  className?: string;
  /**
  A custom class name for the `<span>` that wraps the individual skeleton elements.
  */
  containerClassName?: string;
  /**
  A string that is added to the container element as a data-testid attribute.
  Use it with screen.getByTestId('...') from React Testing Library.
  */
  containerTestId?: string;
  /**
  The number of lines of skeletons to render. If count is a decimal number like 3.5,
  three full skeletons and one half-width skeleton will be rendered.
  */
  count?: number;
  /**
  The height of the skeleton.
  */
  height?: number | string;
  /**
  By default, a `<br />` is inserted after each skeleton so that each skeleton gets its own line.
  When inline is true, no line breaks are inserted.
  */
  inline?: boolean;
  /**
  The width of the skeleton.
  */
  width?: number | string;
};

function LoadingSkeleton({
  className,
  ...props
}: LoadingSkeletonProps) {
  return (
    <SkeletonTheme baseColor={colors.UX_GRAY_300}>
      <Skeleton
        {...props}
        className={classNames('LoadingSkeleton', className)}
        containerClassName={classNames('loadingSkeletonContainer', props.containerClassName)}
      />
    </SkeletonTheme>
  );
}

LoadingSkeleton.defaultProps = {
  borderRadius: '4px',
  className: undefined,
  circle: false,
  containerClassName: undefined,
  containerTestId: undefined,
  count: 1,
  height: undefined,
  inline: false,
  width: '100%',
};

export default LoadingSkeleton;
