import { createElement, ReactNode } from 'react';

import classNames from 'classnames';

import './Heading.scss';

export interface HeadingProps {
  children?: ReactNode;
  className?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  textAlign?: 'left' | 'center' | 'right';
  weight: 'regular' | 'medium' | 'bold';
}

const Heading = ({
  children,
  className,
  level = 2,
  size = 'xxl',
  textAlign,
  weight = 'bold',
  ...props
}: HeadingProps) => createElement(
    `h${level}`,
    {
      style: { textAlign },
      className: classNames(
        className,
        'Heading',
        {
          [`Heading--${size}`]: !!size,
          [`Heading--${weight}`]: !!weight,
        },
      ),
      ...props,
    }, children,
);

export default Heading;
