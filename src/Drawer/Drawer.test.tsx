import React from 'react';

import { render, screen } from '@testing-library/react';

import Drawer from './Drawer';

function SetupDrawerWithChildren(props) {
  const defaultProps = {
    onRequestClose: () => {},
  };

  return (
    <Drawer {...defaultProps} {...props}>
      <div>children</div>
    </Drawer>
  );
}

describe('Drawer', () => {
  it('renders children and an inactive overlay when hidden', () => {
    render(<SetupDrawerWithChildren visible={false} />);

    expect(screen.getByText('children')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).not.toHaveClass(
      'DrawerBackgroundOverlay--active',
    );
  });

  it('renders visible drawer and overlay modifiers', () => {
    const { container } = render(<SetupDrawerWithChildren visible />);

    expect(container.querySelector('.Drawer')).toHaveClass('Drawer--visible');
    expect(screen.getByRole('presentation')).toHaveClass(
      'DrawerBackgroundOverlay--active',
    );
  });

  it('omits the overlay when disabled', () => {
    render(<SetupDrawerWithChildren hasBackgroundOverlay={false} visible />);

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});
