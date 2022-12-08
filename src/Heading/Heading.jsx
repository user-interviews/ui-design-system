import { createElement } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { HEADING_PROPS } from './Heading.types';
import './Heading.scss';

const Heading = ({
  children,
  className,
  level,
  size,
  textAlign,
  weight,
  ...props
}) => createElement(
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

Heading.propTypes = {
  className: PropTypes.string,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  size: PropTypes.string,
  textAlign: PropTypes.string,
  weight: PropTypes.string,
};

Heading.defaultProps = {
  className: undefined,
  level: 2,
  size: 'xxl',
  textAlign: undefined,
  weight: HEADING_PROPS.weight.bold,
};

export default Heading;
