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
  helperText,
  noPadding,
  ruled,
  size,
  subTitle,
  title,
  ...props
}) => {
  const cardChildren = (
    <Fragment>
      <div className="Card__header">
        { title && <h2 className="Card__title">{title}</h2> }
        { helperText && <span className="Card__helper-text">&nbsp;{helperText}</span>}
      </div>

      { subTitle && <h3 className="Card__subtitle">{subTitle}</h3> }
      { ruled && <hr className="Card__rule" /> }
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
          'Card--active': active,
          'Card--no-padding': noPadding,
          'Card--ruled': ruled,
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
  helperText: PropTypes.string,
  noPadding: PropTypes.bool,
  ruled: PropTypes.bool,
  size: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

Card.defaultProps = {
  active: undefined,
  className: undefined,
  elementType: 'section',
  helperText: undefined,
  noPadding: false,
  ruled: false,
  size: CardSizes.LARGE,
  subTitle: undefined,
  title: undefined,
};

export default Card;
