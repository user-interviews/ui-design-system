import React from 'react';
import Skeleton, {
  SkeletonTheme,
  type SkeletonProps,
} from 'react-loading-skeleton';

import classNames from 'classnames';

import colors from '../Styles/colors/palette';

import './LoadingSkeleton.scss';

export type LoadingSkeletonProps = SkeletonProps & {
  /** Corner radius on each bar (`4px` default). */
  borderRadius?: number | string;
  /** Forces a circular skeleton (`border-radius: 50%`). */
  circle?: boolean;
  className?: string;
  /** Extra class merged onto the library’s skeleton container span. */
  containerClassName?: string;
  /** `data-testid` on the skeleton container for RTL queries. */
  containerTestId?: string;
  /** Number of skeleton rows; */
  count?: number;
  height?: number | string;
  /** Skips `<br />` between repeated skeletons (`false` default). */
  inline?: boolean;
  width?: number | string;
};

function LoadingSkeleton({
  className,
  borderRadius = '4px',
  circle = false,
  count = 1,
  inline = false,
  width = '100%',
  ...props
}: LoadingSkeletonProps) {
  return (
    <SkeletonTheme baseColor={colors.UX_GRAY_300}>
      <Skeleton
        borderRadius={borderRadius}
        circle={circle}
        count={count}
        inline={inline}
        width={width}
        {...props}
        className={classNames('LoadingSkeleton', className)}
        containerClassName={classNames(
          'loadingSkeletonContainer',
          props.containerClassName,
        )}
      />
    </SkeletonTheme>
  );
}

export default LoadingSkeleton;
