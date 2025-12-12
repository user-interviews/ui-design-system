import { createElement } from 'react';

import classNames from 'classnames';

import { TEXT_PROPS } from './Text.types';
import * as styles from './Text.module.css';

type ElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>

type TextProps = ElementProps & {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  size?: typeof TEXT_PROPS['size'][keyof typeof TEXT_PROPS['size']];
  textAlign?: typeof TEXT_PROPS['textAlign'][keyof typeof TEXT_PROPS['textAlign']];
  weight?: typeof TEXT_PROPS['weight'][keyof typeof TEXT_PROPS['weight']];
};

function buildClassName(size: string, weight: string, className?: string) {
  return classNames(
    className,
    {
      [styles.sizeLarge]: size === 'lg',
      [styles.sizeMedium]: size === 'md',
      [styles.sizeSmall]: size === 'sm',
      [styles.weightBold]: weight === 'bold',
      [styles.weightSemibold]: weight === 'semibold',
      [styles.weightMedium]: weight === 'medium',
      [styles.weightRegular]: weight === 'regular',
    },
  );
}

function Text({
  as = 'p',
  children,
  className,
  size = 'md',
  textAlign,
  weight = 'regular',
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      style: { textAlign },
      className: buildClassName(size, weight, className),
      ...props,
    },
    children,
  );
}

export default Text;
