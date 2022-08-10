import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CardSizes } from 'src/Card';

import './DropdownCard.scss';

const DropdownCard = ({
  className,
  children,
  size,
  title,
 }) => (
   <div className={classNames(
      className,
      'DropdownCard',
      `DropdownCard--${size}`,
      )}
   >
     { title && <h2 className="DropdownCard__title">{title}</h2> }
     { children }
   </div>
  );

DropdownCard.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(Object.values(CardSizes)),
  title: PropTypes.string,
};

DropdownCard.defaultProps = {
  className: undefined,
  size: 'sm',
  title: undefined,
};

export default DropdownCard;
