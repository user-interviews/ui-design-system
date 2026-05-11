import { createElement } from 'react';

import classNames from 'classnames';

import { type TEXT_PROPS } from './Text.types';

import './Text.scss';

type ElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

type TextProps = ElementProps & {
  /** Element type to render (`p` default). */
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  /** Maps to `Text--{size}` (`md` default). */
  size?: (typeof TEXT_PROPS)['size'][keyof (typeof TEXT_PROPS)['size']];
  /** Applied as inline `text-align` style. */
  textAlign?: (typeof TEXT_PROPS)['textAlign'][keyof (typeof TEXT_PROPS)['textAlign']];
  /** Maps to `Text--{weight}` (`regular` default). */
  weight?: (typeof TEXT_PROPS)['weight'][keyof (typeof TEXT_PROPS)['weight']];
};

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
      className: classNames(className, 'Text', {
        [`Text--${size}`]: !!size,
        [`Text--${weight}`]: !!weight,
      }),
      ...props,
    },
    children,
  );
}

export default Text;
