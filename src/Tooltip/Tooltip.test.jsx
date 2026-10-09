import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tooltip from '.';

const MESSAGE = 'Your public profile link will be shared with researchers.';

describe('Tooltip', () => {
  it.each([false, true])(
    'supports keyboard activation and dismissal (hover=%s)',
    async (withHover) => {
      const user = userEvent.setup();
      render(
        <>
          <Tooltip placement="right" text={MESSAGE} withHover={withHover} />
          <button type="button">Next</button>
        </>,
      );

      const trigger = screen.getByRole('button', { name: MESSAGE });
      expect(trigger).not.toHaveAttribute('aria-hidden');
      await user.tab();
      expect(trigger).toHaveFocus();
      await user.keyboard('a');
      expect(screen.queryByText(MESSAGE)).not.toBeInTheDocument();
      await user.keyboard('{Enter}');
      expect(await screen.findByText(MESSAGE)).toBeVisible();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await user.keyboard('{Escape}');
      expect(screen.queryByText(MESSAGE)).not.toBeInTheDocument();
      expect(trigger).toHaveFocus();
      await user.keyboard(' ');
      expect(await screen.findByText(MESSAGE)).toBeVisible();
      await user.tab();
      expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
      expect(screen.queryByText(MESSAGE)).not.toBeInTheDocument();
    },
  );

  it('preserves pointer toggling', async () => {
    const user = userEvent.setup();
    render(<Tooltip placement="right" text={MESSAGE} />);
    const trigger = screen.getByRole('button', { name: MESSAGE });
    await user.click(trigger);
    expect(await screen.findByText(MESSAGE)).toBeVisible();
    await user.click(trigger);
    expect(screen.queryByText(MESSAGE)).not.toBeInTheDocument();
  });

  it('does not reopen a hover tooltip when the pointer leaves after Escape', async () => {
    const user = userEvent.setup();
    render(<Tooltip placement="right" text={MESSAGE} withHover />);
    const trigger = screen.getByRole('button', { name: MESSAGE });
    await user.tab();
    await user.hover(trigger);
    expect(await screen.findByText(MESSAGE)).toBeVisible();
    await user.keyboard('{Escape}');
    await user.unhover(trigger);
    expect(screen.queryByText(MESSAGE)).not.toBeInTheDocument();
  });

  it('keeps rich tooltip content available through keyboard activation', async () => {
    const user = userEvent.setup();
    render(<Tooltip placement="right" text={<strong>{MESSAGE}</strong>} />);
    const trigger = screen.getByRole('button', { name: 'More information' });
    await user.tab();
    expect(trigger).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(await screen.findByText(MESSAGE)).toBeVisible();
  });

  it('lets keyboard users reach links inside rich tooltip content', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip
        placement="right"
        text={<a href="https://example.com">Learn more</a>}
      />,
    );
    await user.tab();
    await user.keyboard('{Enter}');
    const link = await screen.findByRole('link', { name: 'Learn more' });
    await user.tab();
    expect(link).toHaveFocus();
    expect(link).toBeVisible();
  });
});
