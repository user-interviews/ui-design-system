import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NavTab.scss';

const NavTab = ({
 children, className, id, orientation, selected, ...props
}) => (
  <span
    className={classNames(
      className,
      'NavTab',
      { [`NavTab--selected`]: selected },
      { [`NavTab--${orientation}`]: orientation },
    )}
    id={id}
    {...props}
  >
    {children}
  </span>
  );

NavTab.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  orientation: PropTypes.string,
  selected: PropTypes.bool,
};

NavTab.defaultProps = {
  className: undefined,
  orientation: 'row',
  selected: undefined,
};

export default NavTab;
