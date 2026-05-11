import React from 'react';

import classNames from 'classnames';
import ReactBootstrapTabs from 'react-bootstrap/Tabs';

import type { TabsProps as BootstrapTabProps } from 'react-bootstrap/Tabs';

import * as styles from './tabs.module.scss';

export interface TabsProps extends BootstrapTabProps {
  /** Module class to allow tab labels to wrap (`flex-wrap: unset`). */
  flexWrapUnset?: boolean;
  /** Module class so nav buttons fill tab height. */
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
