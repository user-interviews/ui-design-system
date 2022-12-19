import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import colors from '../Styles/colors/palette';

const LoadingSkeleton = ({
 className, count, height, ...props
}) => (
  <SkeletonTheme baseColor={colors.UX_GRAY_300}>
    <Skeleton
      className={classNames('LoadingSkeleton', className)}
      count={count}
      height={height}
      {...props}
    />
  </SkeletonTheme>
);

LoadingSkeleton.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  height: PropTypes.number,
};

LoadingSkeleton.defaultProps = {
  className: undefined,
  count: 1,
  height: 20,
};
export default LoadingSkeleton;
