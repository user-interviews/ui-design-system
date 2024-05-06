import { createElement } from 'react';

import classNames from 'classnames';

import { TEXT_PROPS } from './Text.types';
import './Text.scss';

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

const Text = ({
  as = 'p',
  children,
  className,
  size = 'md',
  textAlign,
  weight = 'regular',
  ...props
}: TextProps) => createElement(
    as,
    {
      style: { textAlign },
      className: classNames(
        className,
        'Text',
        {
          [`Text--${size}`]: !!size,
          [`Text--${weight}`]: !!weight,
        },
      ),
      ...props,
    }, children,
);

export default Text;
