import React from 'react';

import ReactBootstrapTab, { TabProps as RBTabProps } from 'react-bootstrap/Tab';

export type TabProps = RBTabProps & {
  disabled?: boolean;
  eventKey?: string | number;
  tabClassName?: string;
  title: React.ReactNode;
};

function Tab({
  ...props
}: TabProps) {
  return <ReactBootstrapTab {...props} />;
}

export default Tab;

Tab.defaultProps = {
  disabled: false,
  eventKey: undefined,
  tabClassName: undefined,
};
