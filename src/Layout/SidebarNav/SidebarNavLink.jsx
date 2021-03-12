import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './SidebarNavLink.scss';

const SidebarNavLink = ({
  icon,
  iconClass,
  text,
  url,
}) => (
  <li className="Layout__sidebar-nav__list_item">
    <NavLink
      activeClassName="Layout__sidebar-nav__link--active"
      className="Layout__sidebar-nav__link"
      exact
      to={url}
    >
      {icon && (
        <FontAwesomeIcon
          className={classNames('icon-left Layout__sidebar-nav__link__icon', iconClass)}
          icon={icon}
        />
      )}
      {text}
    </NavLink>
  </li>
);

SidebarNavLink.propTypes = {
  icon: PropTypes.object,
  iconClass: PropTypes.string,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

SidebarNavLink.defaultProps = {
  icon: undefined,
  iconClass: undefined,
};

export default SidebarNavLink;