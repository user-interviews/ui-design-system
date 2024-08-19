import React, { useState } from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Drawer from './Drawer';

const elements = {
  drawerHeader: {
    get: () => screen.getByRole('heading', { level: 1, name: /drawer header/ }),
  },
  drawerChildren: {
    get: () => screen.getByText('children'),
  },
  drawerOverlay: {
    get: () => screen.getByRole('presentation'),
    query: () => screen.queryByRole('presentation'),
  },
  drawerOneToggleVisibilityButton: {
    get: () => screen.getByRole('button', { name: /toggle visibility drawerOne/ }),
  },
  drawerTwoToggleVisibilityButton: {
    get: () => screen.getByRole('button', { name: /toggle visibility drawerTwo/ }),
  },
  drawerThreeToggleVisibilityButton: {
    get: () => screen.getByRole('button', { name: /toggle visibility drawerThree/ }),
  },
  drawerFourToggleVisibilityButton: {
    get: () => screen.getByRole('button', { name: /toggle visibility drawerFour/ }),
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

interface SetupMultipleDrawersProps {
  drawerOneVisibleDefault?: boolean
  drawerTwoVisibleDefault?: boolean,
  drawerThreeVisibleDefault?: boolean
  drawerFourVisibleDefault?: boolean,
}

function SetupMultipleDrawers({
  drawerOneVisibleDefault = false,
  drawerTwoVisibleDefault = false,
  drawerThreeVisibleDefault = false,
  drawerFourVisibleDefault = false,
}: SetupMultipleDrawersProps) {
  const [isDrawerOneVisible, setIsDrawerOneVisible] = useState(drawerOneVisibleDefault);
  const [isDrawerTwoVisible, setIsDrawerTwoVisible] = useState(drawerTwoVisibleDefault);
  const [isDrawerThreeVisible, setIsDrawerThreeVisible] = useState(drawerThreeVisibleDefault);
  const [isDrawerFourVisible, setIsDrawerFourVisible] = useState(drawerFourVisibleDefault);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsDrawerOneVisible((prevState) => !prevState)}
      >
        toggle visibility drawerOne
      </button>

      <button
        type="button"
        onClick={() => setIsDrawerTwoVisible((prevState) => !prevState)}
      >
        toggle visibility drawerTwo
      </button>

      <button
        type="button"
        onClick={() => setIsDrawerThreeVisible((prevState) => !prevState)}
      >
        toggle visibility drawerThree
      </button>

      <button
        type="button"
        onClick={() => setIsDrawerFourVisible((prevState) => !prevState)}
      >
        toggle visibility drawerFour
      </button>

      <Drawer
        visible={isDrawerOneVisible}
        onRequestClose={() => setIsDrawerOneVisible(false)}
      >
        <div>childrenDrawerOne</div>
      </Drawer>
      <Drawer
        visible={isDrawerTwoVisible}
        onRequestClose={() => setIsDrawerTwoVisible(false)}
      >
        <div>childrenDrawerTwo</div>
      </Drawer>
      <Drawer
        visible={isDrawerThreeVisible}
        onRequestClose={() => setIsDrawerThreeVisible(false)}
      >
        <div>childrenDrawerThree</div>
      </Drawer>

      {/* Testing what happens when drawer unmounts */}
      {isDrawerFourVisible && (
        <Drawer
          visible={isDrawerFourVisible}
          onRequestClose={() => setIsDrawerThreeVisible(false)}
        >
          <div>childrenDrawerFour</div>
        </Drawer>
      )}
    </div>
  );
}

describe('Drawer', () => {
  beforeEach(() => {
    // Need to manually clean classList on body since jsdom instance can stay
    // the same across specs https://github.com/jestjs/jest/issues/1224
    window.document.body.className = '';
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

      it('body tag does not have Drawer--open', () => {
        const { container } = render(<SetupDrawerWithChildren visible={false} />);
        const body = container.closest('body');

        expect(body?.classList).not.toContain('Drawer--open');
      });

      describe('when hasBackgroundOverlay is false', () => {
        it('does not have drawer overlay', () => {
          render(<SetupDrawerWithChildren hasBackgroundOverlay={false} visible={false} />);

          expect(elements.drawerOverlay.query()).not.toBeInTheDocument();
        });

        it('body tag does not have Drawer--open', () => {
          // eslint-disable-next-line max-len
          const { container } = render(<SetupDrawerWithChildren hasBackgroundOverlay={false} visible={false} />);
          const body = container.closest('body');

          expect(body?.classList).not.toContain('Drawer--open');
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

      it('calls onRequestClose when pressing ESC key', async () => {
        const onRequestClose = jest.fn();

        render(<SetupDrawerWithChildren visible onRequestClose={onRequestClose} />);

        userEvent.keyboard('{Escape}');
        await waitFor(() => {
          expect(onRequestClose).toHaveBeenCalled();
        });
      });

      it('calls onRequestClose when closeOnOverlayClick is not defined', async () => {
        const onRequestClose = jest.fn();

        const { container } = render(
          <SetupDrawerWithChildren
            visible
            onRequestClose={onRequestClose}
          />,
        );

        const [overlay] = Array.from(container.getElementsByClassName('DrawerBackgroundOverlay'));

        userEvent.click(overlay);

        await waitFor(() => {
          expect(onRequestClose).toHaveBeenCalled();
        });
      });

      it('does not call onRequestClose when closeOnOverlayClick is set to false', async () => {
        const onRequestClose = jest.fn();

        const { container } = render(
          <SetupDrawerWithChildren
            closeOnOverlayClick={false}
            visible
            onRequestClose={onRequestClose}
          />,
        );

        const [overlay] = Array.from(container.getElementsByClassName('DrawerBackgroundOverlay'));

        userEvent.click(overlay);

        await waitFor(() => {
          expect(onRequestClose).not.toHaveBeenCalled();
        });
      });

      it('body tag has Drawer--open', () => {
        const { container } = render(<SetupDrawerWithChildren visible />);
        const body = container.closest('body');

        expect(body?.classList).toContain('Drawer--open');
      });

      describe('when hasBackgroundOverlay is false', () => {
        it('does not have drawer overlay', () => {
          render(<SetupDrawerWithChildren hasBackgroundOverlay={false} visible />);

          expect(elements.drawerOverlay.query()).not.toBeInTheDocument();
        });

        it('body tag does not have Drawer--open', () => {
          // eslint-disable-next-line max-len
          const { container } = render(<SetupDrawerWithChildren hasBackgroundOverlay={false} visible />);
          const body = container.closest('body');

          expect(body?.classList).not.toContain('Drawer--open');
        });
      });
    });
  });

  describe('When component renders multiple Drawers', () => {
    describe('with drawerOne visible by default', () => {
      it('body tag has Drawer--open', () => {
        const { container } = render(<SetupMultipleDrawers drawerOneVisibleDefault />);
        const body = container.closest('body');

        expect(body?.classList).toContain('Drawer--open');
      });

      describe('when user clicks on drawerOne toggle visibility button', () => {
        it('body tag does not have Drawer--open after click', async () => {
          const { container } = render(<SetupMultipleDrawers drawerOneVisibleDefault />);
          const body = container.closest('body');

          expect(body?.classList).toContain('Drawer--open');

          userEvent.click(elements.drawerOneToggleVisibilityButton.get());
          await waitFor(() => {
            expect(body?.classList).not.toContain('Drawer--open');
          });
        });
      });
    });

    describe('with no drawers visible by default', () => {
      it('body tag does not have Drawer--open', () => {
        const { container } = render(<SetupMultipleDrawers />);
        const body = container.closest('body');

        expect(body?.classList).not.toContain('Drawer--open');
      });

      describe('when user clicks on drawerOne toggle visibility button', () => {
        it('body tag has Drawer--open after click', async () => {
          const { container } = render(<SetupMultipleDrawers />);
          const body = container.closest('body');

          expect(body?.classList).not.toContain('Drawer--open');

          userEvent.click(elements.drawerOneToggleVisibilityButton.get());
          await waitFor(() => {
            expect(body?.classList).toContain('Drawer--open');
          });
        });
      });
    });

    describe('when user unmounts the drawer that is open (e.g navigation to a different page)', () => {
      it('body tag does not have Drawer--open', async () => {
        const { container } = render(<SetupMultipleDrawers drawerFourVisibleDefault />);

        userEvent.click(elements.drawerFourToggleVisibilityButton.get());

        const body = container.closest('body');

        await waitFor(() => {
          expect(body?.classList).not.toContain('Drawer--open');
        });
      });
    });
  });
});
