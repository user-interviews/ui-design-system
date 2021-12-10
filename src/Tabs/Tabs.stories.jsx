import React, { useState } from 'react';

import { Tabs, Tab } from 'src/Tabs';

import mdx from './Tabs.mdx';

export default {
  title: 'Design System/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const tabDivStyles = { paddingTop: '20px' };

export const Controlled = () => {
  const [key, setKey] = useState('one');

  const onSelectTab = (tabKey) => {
    alert(`onSelectTab called with tab key ${tabKey}`);
    setKey(tabKey);
  };

  return (
    <div>
      <Tabs activeKey={key} id="controlled" onSelect={(tabKey) => onSelectTab(tabKey)}>
        <Tab eventKey="one" title="Tab One">
          <div style={tabDivStyles}>Tab Content One</div>
        </Tab>
        <Tab eventKey="two" title="Tab Two">
          <div style={tabDivStyles}>Tab Content Two</div>
        </Tab>
        <Tab eventKey="three" title="Tab Three">
          <div style={tabDivStyles}>Tab Content Three</div>
        </Tab>
        <Tab disabled eventKey="four" title="Tab Four (disabled)">
          <div style={tabDivStyles}>Tab Content Four</div>
        </Tab>
      </Tabs>
    </div>
  );
};

export const Uncontrolled = () => (
  <div>
    <Tabs defaultActiveKey="one" id="uncontrolled">
      <Tab eventKey="one" title="Tab One">
        <div style={tabDivStyles}>Tab Content One</div>
      </Tab>
      <Tab eventKey="two" title="Tab Two">
        <div style={tabDivStyles}>Tab Content Two</div>
      </Tab>
      <Tab eventKey="three" title="Tab Three">
        <div style={tabDivStyles}>Tab Content Three</div>
      </Tab>
      <Tab disabled eventKey="four" title="Tab Four (disabled)">
        <div style={tabDivStyles}>Tab Content Four</div>
      </Tab>
    </Tabs>
  </div>
);
