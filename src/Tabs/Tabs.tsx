import type { TabsProps as BootstrapTabProps } from 'react-bootstrap/Tabs';

import React from 'react';
import classNames from 'classnames';

import ReactBootstrapTabs from 'react-bootstrap/Tabs';
import styles from './tabs.module.scss';

export interface TabsProps extends BootstrapTabProps {
  flexWrapUnset: boolean;
  navItemButtonFullHeight: boolean;
}

const Tabs = ({
  children,
  flexWrapUnset,
  navItemButtonFullHeight,
  ...props
}: TabsProps) => (
  <ReactBootstrapTabs
    className={
        classNames(
          styles.tabs,
          {
            [styles.flexWrapUnset]: flexWrapUnset,
            [styles.navItemButtonFullHeight]: navItemButtonFullHeight,
          },
        )
      }
    variant="tabs"
    {...props}
  >
    {children}
  </ReactBootstrapTabs>
);

export default Tabs;
