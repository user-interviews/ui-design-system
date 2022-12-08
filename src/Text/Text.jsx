import { createElement } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { TEXT_PROPS } from './Text.types';
import './Text.scss';

const Text = ({
  as,
  children,
  className,
  size,
  textAlign,
  weight,
  ...props
}) => createElement(
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

Text.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  size: PropTypes.string,
  textAlign: PropTypes.string,
  weight: PropTypes.string,
};

Text.defaultProps = {
  as: 'p',
  className: undefined,
  size: TEXT_PROPS.size.md,
  textAlign: undefined,
  weight: TEXT_PROPS.weight.regular,
};

export default Text;
