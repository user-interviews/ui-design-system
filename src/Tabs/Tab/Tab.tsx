import React from 'react';

import ReactBootstrapTab, { TabProps as RBTabProps } from 'react-bootstrap/Tab';

export type TabProps = RBTabProps & {
  disabled?: boolean;
  eventKey?: string | number;
  tabClassName?: string;
  title: React.ReactNode;
};

function Tab({
  disabled = false,
  ...props
}: TabProps) {
  return <ReactBootstrapTab disabled={disabled} {...props} />;
}

export default Tab;
