import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './CardStack.scss';

const CardStack = ({
  children,
  // eslint-disable-next-line camelcase
  UNSAFE_className,
  size,
  ...props
}) => (
  <div
    className={classNames(
      UNSAFE_className,
      'CardStack',
      { [`CardStack--${size}`]: size },
    )}
    {...props}
  >
    {children}
  </div>
);

CardStack.propTypes = {
  size: PropTypes.string,
  UNSAFE_className: PropTypes.string,
};

CardStack.defaultProps = {
  size: undefined,
  UNSAFE_className: undefined,
};

export default CardStack;
