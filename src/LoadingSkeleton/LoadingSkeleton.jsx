import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import colors from '../Styles/colors/palette';

import './LoadingSkeleton.scss';

const LoadingSkeleton = ({ className, containerClassName, ...props }) => (
  <SkeletonTheme baseColor={colors.UX_GRAY_300}>
    <Skeleton
      className={classNames('LoadingSkeleton', className)}
      containerClassName={classNames('loadingSkeletonContainer', containerClassName)}
      {...props}
    />
  </SkeletonTheme>
);

LoadingSkeleton.propTypes = {
  /**
  The border radius of the skeleton.
  */
  borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
  Makes the skeleton circular by setting border-radius to 50%.
  */
  circle: PropTypes.bool,
  className: PropTypes.string,
  /**
  A custom class name for the `<span>` that wraps the individual skeleton elements.
  */
  containerClassName: PropTypes.string,
  /**
  A string that is added to the container element as a data-testid attribute.
  Use it with screen.getByTestId('...') from React Testing Library.
  */
  containerTestId: PropTypes.string,
  /**
  The number of lines of skeletons to render. If count is a decimal number like 3.5,
  three full skeletons and one half-width skeleton will be rendered.
  */
  count: PropTypes.number,
  /**
  The height of the skeleton.
  */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
  By default, a `<br />` is inserted after each skeleton so that each skeleton gets its own line.
  When inline is true, no line breaks are inserted.
  */
  inline: PropTypes.bool,
  /**
  The width of the skeleton.
  */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

LoadingSkeleton.defaultProps = {
  borderRadius: '4px',
  className: undefined,
  circle: false,
  containerClassName: '',
  containerTestId: undefined,
  count: 1,
  height: undefined,
  inline: false,
  width: '100%',
};

export default LoadingSkeleton;
