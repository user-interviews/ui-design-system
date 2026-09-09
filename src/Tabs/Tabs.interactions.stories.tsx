import React, { useCallback, useState } from 'react';

import { expect } from 'storybook/test';

import { Tabs, Tab } from '.';

import type { TabsProps } from './Tabs';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const tabDivStyles = { paddingTop: '20px' };

const meta = {
  title: 'Interaction Tests/Tabs',
  component: Tabs,
  tags: ['!autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function KeyboardNavigationRender() {
  const [activeKey, setActiveKey] = useState<TabsProps['activeKey']>('one');

  const handleTabSelect = useCallback<NonNullable<TabsProps['onSelect']>>(
    (eventKey) => {
      if (eventKey != null) setActiveKey(eventKey);
    },
    [],
  );

  return (
    <Tabs
      activeKey={activeKey}
      id="keyboard-navigation"
      onSelect={handleTabSelect}
    >
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

export const KeyboardNavigation: Story = {
  render: KeyboardNavigationRender,
  play: async ({ canvas, userEvent }) => {
    const tabOne = canvas.getByRole('tab', { name: 'Tab One' });
    const tabTwo = canvas.getByRole('tab', { name: 'Tab Two' });
    const tabThree = canvas.getByRole('tab', { name: 'Tab Three' });
    const disabledTab = canvas.getByRole('tab', {
      name: 'Tab Four (disabled)',
    });
    const firstPanel = canvas.getByRole('tabpanel', { name: 'Tab One' });

    await expect(canvas.getByRole('tablist')).toBeInTheDocument();
    await expect(tabOne).toHaveAttribute('aria-selected', 'true');
    await expect(tabOne).toHaveAttribute('aria-controls', firstPanel.id);
    await expect(firstPanel).toHaveTextContent('Tab Content One');
    await expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
    await expect(disabledTab).toHaveAttribute('tabindex', '-1');

    tabOne.focus();
    await expect(tabOne).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await expect(tabTwo).toHaveFocus();
    await expect(tabTwo).toHaveAttribute('aria-selected', 'true');
    await expect(
      canvas.getByRole('tabpanel', { name: 'Tab Two' }),
    ).toHaveTextContent('Tab Content Two');

    await userEvent.keyboard('{ArrowRight}');
    await expect(tabThree).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await expect(tabOne).toHaveFocus();
    await expect(tabOne).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowLeft}');
    await expect(tabThree).toHaveFocus();
    await expect(tabThree).toHaveAttribute('aria-selected', 'true');
  },
};
