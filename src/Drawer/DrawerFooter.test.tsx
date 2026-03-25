import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { DrawerFooter } from './index';

describe('DrawerFooter', () => {
  const renderDrawerFooter = (props) => render(<DrawerFooter {...props} />);

  describe('primary action button', () => {
    it('calls the onPrimaryAction callback when clicked', async () => {
      const onPrimaryActionMock = jest.fn();

      renderDrawerFooter({
        primaryActionText: 'Primary Action',
        onPrimaryAction: onPrimaryActionMock,
      });

      userEvent.click(screen.getByRole('button', { name: 'Primary Action' }));

      await waitFor(() => {
        expect(onPrimaryActionMock).toHaveBeenCalled();
      });
    });
  });
});
