import React from 'react';
import classNames from 'classnames';

import { CardSizes } from 'src/Card';

import './CardStack.scss';

type CardStackProps = {
  size?: typeof CardSizes[keyof typeof CardSizes];
  // eslint-disable-next-line camelcase
  UNSAFE_className?: string;
  children: React.ReactNode;
};

const CardStack = ({
  children,

  // eslint-disable-next-line camelcase
  UNSAFE_className,

  size,
  ...props
}: CardStackProps) => (
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

CardStack.defaultProps = {
  size: undefined,
  UNSAFE_className: undefined,
};

export default CardStack;
