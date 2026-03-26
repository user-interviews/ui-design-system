import React from 'react';

import classNames from 'classnames';
import React from 'react';

import type { CardSizes } from '../Card';

import './CardStack.scss';

type CardStackProps = {
  size?: (typeof CardSizes)[keyof typeof CardSizes];
  UNSAFE_className?: string;
  children: React.ReactNode;
};

function CardStack({
  children,

  UNSAFE_className,

  size,
  ...props
}: CardStackProps) {
  return (
    <div
      className={classNames(UNSAFE_className, 'CardStack', {
        [`CardStack--${size}`]: size,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

export default CardStack;
