import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink } from 'common/routing';

import * as propTypes from 'lib/prop_types';

import './sidebar_nav_link.scss';

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
  icon: propTypes.object,
  iconClass: propTypes.string,
  text: propTypes.string.isRequired,
  url: propTypes.string.isRequired,
};

SidebarNavLink.defaultProps = {
  icon: undefined,
  iconClass: undefined,
};

export default SidebarNavLink;
