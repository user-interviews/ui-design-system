import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tab, Tabs } from './index';

const tabOneKey = 'one';
const tabTwoKey = 'two';
const tabThreeKey = 'three';

const tabOneTitle = 'Tab One';
const tabTwoTitle = 'Tab Two';
const tabThreeTitle = 'Tab Three';

const tabOneContent = 'Tab Content One';
const tabTwoContent = 'Tab Content Two';
const tabThreeContent = 'Tab Content Three';

const uncontrolledProps = {
  activeKey: undefined,
  defaultActiveKey: tabOneKey,
  id: 'tabID',
  mountOnEnter: false,
  transition: false,
  unmountOnExit: false,
  onSelect: undefined,
};

const onSelectMock = jest.fn();

const controlledProps = {
  ...uncontrolledProps,
  ...{
    activeKey: tabOneKey,
    defaultActiveKey: undefined,
    onSelect: onSelectMock,
  },
};

const renderTabs = (props) => render(
  <Tabs {...props}>
    <Tab eventKey={tabOneKey} title={tabOneTitle}>
      {tabOneContent}
    </Tab>
    <Tab eventKey={tabTwoKey} title={tabTwoTitle}>
      {tabTwoContent}
    </Tab>
    <Tab disabled eventKey={tabThreeKey} title={tabThreeTitle}>
      {tabThreeContent}
    </Tab>
  </Tabs>,
);

describe('Tabs', () => {
  describe('uncontrolled tabs', () => {
    it('renders the expected snapshot', () => {
      const tabs = renderTabs(uncontrolledProps);
      expect(tabs).toMatchSnapshot();
    });

    it('shows the default tab content', () => {
      renderTabs(uncontrolledProps);
      expect(screen.getByText(tabOneContent)).toHaveClass('active');
      expect(screen.getByText(tabTwoContent)).not.toHaveClass('active');
    });

    it('shows the tab content when clicked', async () => {
      renderTabs(uncontrolledProps);

      expect(screen.getByText(tabOneContent)).toHaveClass('active');
      expect(screen.getByText(tabTwoContent)).not.toHaveClass('active');

      const tabTwoButton = screen.getByRole('tab', { name: tabTwoTitle });

      userEvent.click(tabTwoButton);
      await waitFor(() => {
        expect(tabTwoButton).toHaveClass('active');
      });

      expect(screen.getByText(tabOneContent)).not.toHaveClass('active');
      expect(screen.getByText(tabTwoContent)).toHaveClass('active');
    });
  });

  describe('controlled tabs', () => {
    it('renders the expected snapshot', () => {
      const tabs = renderTabs(controlledProps);
      expect(tabs).toMatchSnapshot();
    });

    it('shows the default tab content', () => {
      renderTabs(controlledProps);
      expect(screen.getByText(tabOneContent)).toHaveClass('active');
      expect(screen.getByText(tabTwoContent)).not.toHaveClass('active');
    });

    it('shows the tab content when clicked', async () => {
      renderTabs(controlledProps);

      expect(screen.getByText(tabOneContent)).toHaveClass('active');
      expect(screen.getByText(tabTwoContent)).not.toHaveClass('active');

      const tabTwoButton = screen.getByRole('tab', { name: tabTwoTitle });

      userEvent.click(tabTwoButton);
      await waitFor(() => {
        expect(onSelectMock).toHaveBeenCalled();
      });
    });
  });
});
