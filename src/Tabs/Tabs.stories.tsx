import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';

import { Tabs, Tab } from 'src/Tabs';

const tabDivStyles = { paddingTop: '20px' };

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Components/Tabs',
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Controlled: Story = {
  args: {
    onSelect: (tabKey) => alert(`onSelect called with tab key ${tabKey}`),
    id: 'controlled',
  },
  render: ({ ...args }) => {
    const onSelectTab = (tabKey) => {
      alert(`onSelectTab called with tab key ${tabKey}`);
    };

    return (
      <div>
        <Tabs activeKey="one" id="controlled" onSelect={(tabKey) => onSelectTab(tabKey)} {...args}>
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
  },
};

export const Uncontrolled: Story = {
  args: {
    id: 'uncontrolled',
  },
  render: () => (
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
  ),
};
