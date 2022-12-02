import { createElement } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { TYPOGRAPHY_PROPS } from './Typography.types';
import './Typography.scss';

const Typography = ({
  as,
  children,
  className,
  fontWeight,
  textAlign,
  variant,
  ...props
}) => createElement(
    as,
    {
      style: { textAlign },
      className: classNames(
        className,
        'Typography',
        {
          [`Typography--${variant}`]: !!variant,
          [`Typography--${fontWeight}`]: !!fontWeight,
        },
      ),
      ...props,
    }, children,
);

Typography.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  fontWeight: PropTypes.string,
  textAlign: PropTypes.string,
  variant: PropTypes.string,
};

Typography.defaultProps = {
  as: TYPOGRAPHY_PROPS.as.p,
  className: undefined,
  fontWeight: TYPOGRAPHY_PROPS.fontWeight.regular,
  textAlign: undefined,
  variant: TYPOGRAPHY_PROPS.variant.bodyMd,
};

export default Typography;
