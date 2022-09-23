import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './CardContainer.scss';

export const CardContainerAlignItemsOptions = ['center', 'flex-start', 'flex-end'];

const CardContainer = ({
  alignItems,
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(
      'CardContainer',
      className,
      {
        [`CardContainer__alignItems--${alignItems}`]: !!alignItems,
      },
      )}
    {...props}
  >
    {children}
  </div>
  );

CardContainer.propTypes = {
  alignItems: PropTypes.oneOf(CardContainerAlignItemsOptions),
  className: PropTypes.string,
};

CardContainer.defaultProps = {
  alignItems: 'center',
  className: undefined,
};

export default CardContainer;
