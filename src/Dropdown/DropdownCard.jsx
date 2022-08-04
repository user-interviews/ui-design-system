import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './DropdownCard.scss';

const DropdownCard = ({ className, children }) => (
  <div className={classNames(
      className,
      'DropdownCard',
      )}
  >
    {children}
  </div>
  );

DropdownCard.propTypes = {
  className: PropTypes.string,
};

DropdownCard.defaultProps = {
  className: undefined,
};

export default DropdownCard;
