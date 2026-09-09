import { expect, waitFor } from 'storybook/test';

import { Tabs } from '.';
import { Controlled as ControlledExample } from './Tabs.stories';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta = {
  title: 'Interaction Tests/Tabs',
  component: Tabs,
  tags: ['!autodocs', '!dev'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const KeyboardNavigation: Story = {
  ...ControlledExample,
  args: {
    id: 'keyboard-navigation',
  },
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

    await userEvent.tab();
    await expect(tabOne).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(tabTwo).toHaveFocus());
    await expect(tabTwo).toHaveAttribute('aria-selected', 'true');
    await expect(
      canvas.getByRole('tabpanel', { name: 'Tab Two' }),
    ).toHaveTextContent('Tab Content Two');

    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(tabThree).toHaveFocus());

    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(tabOne).toHaveFocus());
    await expect(tabOne).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(tabThree).toHaveFocus());
    await expect(tabThree).toHaveAttribute('aria-selected', 'true');
  },
};
