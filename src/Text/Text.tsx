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
  noMargin?: boolean,
  size?: typeof TEXT_PROPS['size'][keyof typeof TEXT_PROPS['size']];
  textAlign?: typeof TEXT_PROPS['textAlign'][keyof typeof TEXT_PROPS['textAlign']];
  weight?: typeof TEXT_PROPS['weight'][keyof typeof TEXT_PROPS['weight']];
};

function buildClassName(
  size: string,
  weight: string,
  noMargin: boolean,
  className?: string,
  textAlign?: string,
) {
  return classNames(
    className,
    {
      [styles.alignLeft]: textAlign === 'left',
      [styles.alignCenter]: textAlign === 'center',
      [styles.alignRight]: textAlign === 'right',
      [styles.sizeLarge]: size === 'lg',
      [styles.sizeMedium]: size === 'md',
      [styles.sizeSmall]: size === 'sm',
      [styles.weightBold]: weight === 'bold',
      [styles.weightSemibold]: weight === 'semibold',
      [styles.weightMedium]: weight === 'medium',
      [styles.weightRegular]: weight === 'regular',
      [styles.noMargin]: noMargin,
    },
  );
}

function Text({
  as = 'p',
  children,
  className,
  noMargin = false,
  size = 'md',
  textAlign,
  weight = 'regular',
  ...props
}: TextProps) {
  return createElement(
    as,
    {
      className: buildClassName(size, weight, noMargin, className, textAlign),
      ...props,
    },
    children,
  );
}

export default Text;
