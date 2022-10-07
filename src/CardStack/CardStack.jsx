import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './CardStack.scss';

const CardStack = ({
  children,
  // eslint-disable-next-line camelcase
  UNSAFE_className,
  ...props
}) => (
  <div
    className={classNames(
      UNSAFE_className,
      'CardStack',
    )}
    {...props}
  >
    {children}
  </div>
);

CardStack.propTypes = {
  UNSAFE_className: PropTypes.string,
};

CardStack.defaultProps = {
  UNSAFE_className: undefined,
};

export default CardStack;
