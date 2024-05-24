import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './SidebarNavLink.scss';

export type SidebarNavLinkProps = {
  icon?: IconDefinition;
  iconClass?: string;
  text: string;
  url: string;
};

const SidebarNavLink = ({
  icon,
  iconClass,
  text,
  url,
}: SidebarNavLinkProps) => (
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

export default SidebarNavLink;
