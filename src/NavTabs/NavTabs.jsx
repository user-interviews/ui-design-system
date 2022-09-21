import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './NavTabs.scss';

const NavTabs = ({ children, className, orientation }) => (
  <nav
    className={classNames(
        className,
        'NavTabs',
        { [`NavTabs--${orientation}`]: orientation },
      )}
  >
    {children}
  </nav>
  );

NavTabs.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.string,
};

NavTabs.defaultProps = {
  className: undefined,
  orientation: 'row',
};

export default NavTabs;
