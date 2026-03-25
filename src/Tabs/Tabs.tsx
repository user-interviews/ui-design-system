import classNames from 'classnames';
import React from 'react';
import type { TabsProps as BootstrapTabProps } from 'react-bootstrap/Tabs';
import ReactBootstrapTabs from 'react-bootstrap/Tabs';

import * as styles from './tabs.module.scss';

export interface TabsProps extends BootstrapTabProps {
  flexWrapUnset?: boolean;
  navItemButtonFullHeight?: boolean;
}

function Tabs({
  children,
  flexWrapUnset,
  navItemButtonFullHeight,
  className,
  ...props
}: TabsProps) {
  return (
    <ReactBootstrapTabs
      className={classNames(className, styles.tabs, {
        [styles.flexWrapUnset]: flexWrapUnset,
        [styles.navItemButtonFullHeight]: navItemButtonFullHeight,
      })}
      variant="tabs"
      {...props}
    >
      {children}
    </ReactBootstrapTabs>
  );
}

export default Tabs;
