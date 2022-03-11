import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './CardList.scss';

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
  alignItems: PropTypes.oneOf(['center', 'flex-start', 'flex-end']),
  className: PropTypes.string,
};

CardList.defaultProps = {
  alignItems: 'center',
  className: undefined,
};

export default CardList;
