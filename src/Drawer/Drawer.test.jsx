import React, { useState } from 'react';

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Drawer from './Drawer';

const elements = {
  drawerHeader: {
    get: () => screen.getByRole('heading', { level: 1, name: /drawer header/ }),
  },
  drawerChildren: {
    get: () => screen.getByText('children'),
  },
  drawerOneChildren: {
    get: () => screen.getByText('children1'),
  },
  drawerOverlay: {
    get: () => screen.getByRole('presentation'),
    query: () => screen.queryByRole('presentation'),
  },
  drawerOneToggleVisibilityButton: {
    get: () => screen.getByRole('button', { name: /toggle visibility drawer1/ }),
  },
  drawerTwoToggleVisibilityButton: {
    get: () => screen.getByRole('button', { name: /toggle visibility drawer2/ }),
  },
  drawerThreeToggleVisibilityButton: {
    get: () => screen.getByRole('button', { name: /toggle visibility drawer3/ }),
  },
};

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

function SetupMultipleDrawersWithOneOpen() {
  const [isDrawerOneVisible, setIsDrawerOneVisible] = useState(true);
  const [isDrawerTwoVisible, setIsDrawerTwoVisible] = useState(false);
  const [isDrawerThreeVisible, setIsDrawerThreeVisible] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsDrawerOneVisible((prevState) => !prevState)}
      >
        toggle visibility drawer1
      </button>

      <button
        type="button"
        onClick={() => setIsDrawerTwoVisible((prevState) => !prevState)}
      >
        toggle visibility drawer2
      </button>

      <button
        type="button"
        onClick={() => setIsDrawerThreeVisible((prevState) => !prevState)}
      >
        toggle visibility drawer3
      </button>

      <Drawer
        visible={isDrawerOneVisible}
        onRequestClose={() => setIsDrawerOneVisible(false)}
      >
        <div>children1</div>
      </Drawer>
      <Drawer
        visible={isDrawerTwoVisible}
        onRequestClose={() => setIsDrawerTwoVisible(false)}
      >
        <div>children2</div>
      </Drawer>
      <Drawer
        visible={isDrawerThreeVisible}
        onRequestClose={() => setIsDrawerThreeVisible(false)}
      >
        <div>children3</div>
      </Drawer>
    </div>
  );
}

describe('Drawer', () => {
  beforeEach(() => {
    window.document.body.classList.remove(...window.document.body.classList);
  });

  describe('When component renders single drawer', () => {
    describe('when visible is false', () => {
      it('renders its children', () => {
        render(<SetupDrawerWithChildren visible={false} />);

        expect(elements.drawerChildren.get()).toBeInTheDocument();
      });

      it('has drawer overlay', () => {
        render(<SetupDrawerWithChildren visible={false} />);

        expect(elements.drawerOverlay.get()).toBeInTheDocument();
      });

      it('does not have visible drawer overlay', () => {
        render(<SetupDrawerWithChildren visible={false} />);

        expect(elements.drawerOverlay.get()).toBeInTheDocument();
        expect(elements.drawerOverlay.get().classList).not.toContain('DrawerBackgroundOverlay--active');
      });

      it('does not call onRequestClose when pressing ESC key', () => {
        const onRequestClose = jest.fn();

        render(<SetupDrawerWithChildren visible={false} onRequestClose={onRequestClose} />);

        userEvent.keyboard('{Escape}');

        expect(onRequestClose).not.toHaveBeenCalled();
      });

      it('body tag does not have Drawer__Body--open', () => {
        const { container } = render(<SetupDrawerWithChildren visible={false} />);
        const body = container.closest('body');

        expect(body.classList).not.toContain('Drawer__Body--open');
      });

      describe('when hasBackgroundOverlay is false', () => {
        it('does not have drawer overlay', () => {
          render(<SetupDrawerWithChildren hasBackgroundOverlay={false} visible={false} />);

          expect(elements.drawerOverlay.query()).not.toBeInTheDocument();
        });
      });
    });

    describe('when visible is true', () => {
      it('renders its children', () => {
        render(<SetupDrawerWithChildren visible />);

        expect(elements.drawerChildren.get()).toBeInTheDocument();
      });

      it('has drawer overlay', () => {
        render(<SetupDrawerWithChildren visible />);

        expect(elements.drawerOverlay.get()).toBeInTheDocument();
      });

      it('has visible drawer overlay', () => {
        render(<SetupDrawerWithChildren visible />);

        expect(elements.drawerOverlay.get()).toBeInTheDocument();
        expect(elements.drawerOverlay.get().classList).toContain('DrawerBackgroundOverlay--active');
      });

      it('calls onRequestClose when pressing ESC key', () => {
        const onRequestClose = jest.fn();

        render(<SetupDrawerWithChildren visible onRequestClose={onRequestClose} />);

        userEvent.keyboard('{Escape}');

        expect(onRequestClose).toHaveBeenCalled();
      });

      it('body tag has Drawer__Body--open', () => {
        const { container } = render(<SetupDrawerWithChildren visible />);
        const body = container.closest('body');

        expect(body.classList).toContain('Drawer__Body--open');
      });

      describe('when hasBackgroundOverlay is falsex', () => {
        it('does not have drawer overlay', () => {
          render(<SetupDrawerWithChildren hasBackgroundOverlay={false} visible />);

          expect(elements.drawerOverlay.query()).not.toBeInTheDocument();
        });

        it('body tag does not have Drawer__Body--openx', () => {
          // eslint-disable-next-line max-len
          const { container } = render(<SetupDrawerWithChildren hasBackgroundOverlay={false} visible />);
          const body = container.closest('body');

          expect(body.classList).not.toContain('Drawer__Body--open');
        });
      });
    });
  });

  describe('When component renders multiple Drawers', () => {

    describe('When component renders multiple drawers with drawer1 visible', () => {
      it('body tag has Drawer__Body--open', () => {
        const { container } = render(<SetupMultipleDrawersWithOneOpen />);
        const body = container.closest('body');

        expect(body.classList).toContain('Drawer__Body--open');
      });

      describe('when user clicks on drawer1 toggle visibility button', () => {
        it('body tag does not have Drawer__body--open', () => {
          const { container } = render(<SetupMultipleDrawersWithOneOpen />);
          const body = container.closest('body');

          expect(body.classList).toContain('Drawer__Body--open');

          userEvent.click(elements.drawerOneToggleVisibilityButton.get());

          expect(body.classList).not.toContain('Drawer__Body--open');
        });
      });
    });
    it.todo('add more spec variations');
  });
});

// describe('when hasBackgroundOverlay is falsex', () => {
//   it('does not have drawer overlay', () => {
//     render(<SetupDrawerWithChildren hasBackgroundOverlay={false} visible />);
//
//     expect(elements.drawerOverlay.query()).not.toBeInTheDocument();
//   });
//
//   it('body tag does not have Drawer__Body--openx', () => {
//     // eslint-disable-next-line max-len
//     const { container } = render(<SetupDrawerWithChildren hasBackgroundOverlay={false} visible />);
//     const body = container.closest('body');
//
//     expect(body.classList).not.toContain('Drawer__Body--open');
//   });
// });
