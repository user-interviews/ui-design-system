import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { DrawerFooter } from './index';

describe('DrawerFooter', () => {
  const renderDrawerFooter = (props) => render(
    <DrawerFooter {...props} />,
  );

  describe('primary action button', () => {
    it('calls the onPrimaryAction callback when clicked', () => {
      const onPrimaryActionMock = jest.fn();

      renderDrawerFooter({
        primaryActionText: 'Primary Action',
        onPrimaryAction: onPrimaryActionMock,
      });

      userEvent.click(screen.getByRole('button', { name: 'Primary Action' }));

      expect(onPrimaryActionMock).toHaveBeenCalled();
    });
  });
});
