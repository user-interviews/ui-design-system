import React, { useCallback, useState } from 'react';

import { fn } from 'storybook/test';

import { Tabs, Tab } from '.';

import type { TabsProps } from './Tabs';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const tabDivStyles = { paddingTop: '20px' };

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Components/Tabs',
};

export default meta;
type Story = StoryObj<typeof Tabs>;

function ControlledRender({ id, onSelect }: TabsProps) {
  const [activeKey, setActiveKey] = useState<TabsProps['activeKey']>('one');

  const handleTabSelect = useCallback<NonNullable<TabsProps['onSelect']>>(
    (eventKey, event) => {
      onSelect?.(eventKey, event);
      if (eventKey != null) setActiveKey(eventKey);
    },
    [onSelect],
  );

  return (
    <Tabs activeKey={activeKey} id={id} onSelect={handleTabSelect}>
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
  );
}

export const Controlled: Story = {
  args: {
    onSelect: fn(),
    id: 'controlled',
  },
  render: ControlledRender,
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
