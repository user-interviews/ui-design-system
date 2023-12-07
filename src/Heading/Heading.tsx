import { createElement, ReactNode } from 'react';

import classNames from 'classnames';

import './Heading.scss';

export interface HeadingProps {
  children?: ReactNode;
  className?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  textAlign?: 'left' | 'center' | 'right';
  weight?: 'regular' | 'medium' | 'bold';
}

const LevelToSizeMap = {
  1: 'xxxl',
  2: 'xxl',
  3: 'xl',
  4: 'lg',
  5: 'md',
  6: 'sm',
};

const getHeadingSizeClassFromLevel = (level: number) => `Heading--${LevelToSizeMap[level]}`;

const Heading = ({
  children,
  className,
  level = 1,
  size,
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
        !size && getHeadingSizeClassFromLevel(level),
        {
          [`Heading--${size}`]: !!size,
          [`Heading--${weight}`]: !!weight,
        },
      ),
      ...props,
    }, children,
);

export default Heading;
