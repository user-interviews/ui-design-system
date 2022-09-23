import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './CardList.scss';

export const CardListAlignItemsOptions = ['center', 'flex-start', 'flex-end'];

const CardList = ({
  alignItems,
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(
      'CardList',
      className,
      {
        [`CardList__alignItems--${alignItems}`]: !!alignItems,
      },
      )}
    {...props}
  >
    {children}
  </div>
  );

CardList.propTypes = {
  alignItems: PropTypes.oneOf(CardListAlignItemsOptions),
  className: PropTypes.string,
};

CardList.defaultProps = {
  alignItems: 'center',
  className: undefined,
};

export default CardList;
