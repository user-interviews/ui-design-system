import React, { createElement, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Card.scss';

export const CardSizes = {
  EXTRA_SMALL: 'xs',
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

const Card = ({
  active,
  children,
  className,
  elementType,
  noPadding,
  size,
  subTitle,
  title,
  ...props
}) => {
  const cardChildren = (
    <Fragment>
      { title && <h2 className="Card__title">{title}</h2> }
      { subTitle && <h3 className="Card__subtitle">{subTitle}</h3> }
      { children }
    </Fragment>
  );
  return createElement(
    elementType,
    {
      ...props,
      className: classNames(
        'Card',
        `Card--${size}`,
        className,
        {
          'Card--no-padding': noPadding,
          'Card--active': active,
        },
      ),
    },
    cardChildren,
  );
};

Card.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  elementType: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  noPadding: PropTypes.bool,
  size: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

Card.defaultProps = {
  active: undefined,
  className: undefined,
  elementType: 'section',
  noPadding: false,
  size: CardSizes.LARGE,
  subTitle: undefined,
  title: undefined,
};

export default Card;
