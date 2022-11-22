import React, { createElement } from 'react';
import classNames from 'classnames';

import './Typography.scss';

const Typography = ({ 
  as,
  children,
  className,
  fontWeight,
  textAlign,
  variant,
  ...props
}) => {
  
  return createElement(
    as,
    {
      style: { textAlign: textAlign },
      className: classNames(
        className,
        'Typography',
        {
          [`Typography--${variant}`]: !!variant,
          [`Typography--${fontWeight}`]: !!fontWeight,
        }
      )
    }, children);
}

export default Typography;
