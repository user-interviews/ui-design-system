import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './DropdownCard.scss';

const DropdownCard = ({
  className,
  children,
  title,
 }) => (
   <div className={classNames(
      className,
      'DropdownCard',
      )}
   >
     { title && <h2 className="DropdownCard__title">{title}</h2> }
     { children }
   </div>
  );

DropdownCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

DropdownCard.defaultProps = {
  className: undefined,
  title: undefined,
};

export default DropdownCard;
