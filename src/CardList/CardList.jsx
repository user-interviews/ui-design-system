import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './CardList.scss';

const CardList = ({
  className,
  children,
  ...props
}) => (
  <div
    className={classNames('CardList', className)}
    {...props}
  >
    {children}
  </div>
  );

CardList.propTypes = {
  className: PropTypes.string,
};

CardList.defaultProps = {
  className: undefined,
};

export default CardList;
