import React, { createElement } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { LoadingSkeleton } from 'src/LoadingSkeleton';

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
  isLoading,
  noPadding,
  size,
  subTitle,
  title,
  ...props
}) => {
  const cardChildren = (
    <>
      {isLoading ? (
        <>
          <LoadingSkeleton height={24} width="33%" />
          <br />
          <LoadingSkeleton count={3} />
        </>
      ) : (
        <>
          { title && (
          <div className="Card__header">
            <h2 className="Card__title">{title}</h2>
            { helperText && <span className="Card__helper-text">{helperText}</span>}
          </div>
      )}

          { divided && <hr className="Card__divider" /> }
          { subTitle && <h3 className="Card__subtitle">{subTitle}</h3> }
          { children }
        </>
      )}
    </>
  );

  return createElement(
    elementType,
    {
      ...props,
      className: classNames(
        'Card',
        { [`Card--${size}`]: size },
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
  isLoading: PropTypes.bool,
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
  isLoading: undefined,
  noPadding: false,
  size: undefined,
  subTitle: undefined,
  title: undefined,
};

export default Card;
