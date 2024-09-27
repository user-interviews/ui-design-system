import React from 'react';
import classNames from 'classnames';

import { CardSizes } from '../Card';

import './CardStack.scss';

type CardStackProps = {
  size?: typeof CardSizes[keyof typeof CardSizes];
  // eslint-disable-next-line camelcase
  UNSAFE_className?: string;
  children: React.ReactNode;
};

function CardStack({
  children,

  // eslint-disable-next-line camelcase
  UNSAFE_className,

  size,
  ...props
}: CardStackProps) {
  return (
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
}

export default CardStack;
