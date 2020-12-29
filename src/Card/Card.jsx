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
  children,
  className,
  divided,
  elementType,
  helperText,
  noPadding,
  size,
  subTitle,
  title,
  ...props
}) => {
  const cardChildren = (
    <Fragment>
      <div className="Card__header">
        { title && <h2 className="Card__title">{title}</h2> }
        { helperText && <span className="Card__helper-text">{helperText}</span>}
      </div>

      { divided && <hr className="Card__divider" /> }
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
          'Card--divided': divided,
          'Card--no-padding': noPadding,
        },
      ),
    },
    cardChildren,
  );
};

Card.propTypes = {
  className: PropTypes.string,
  divided: PropTypes.bool,
  elementType: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  helperText: PropTypes.string,
  noPadding: PropTypes.bool,
  size: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

Card.defaultProps = {
  className: undefined,
  divided: false,
  elementType: 'section',
  helperText: undefined,
  noPadding: false,
  size: CardSizes.LARGE,
  subTitle: undefined,
  title: undefined,
};

export default Card;
