import React, { useState } from 'react';
import propTypes from 'prop-types';

import { render, screen } from '@testing-library/react';
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

function SetupMultipleDrawers({
  drawerOneVisibleDefault,
  drawerTwoVisibleDefault,
  drawerThreeVisibleDefault,
}) {
  const [isDrawerOneVisible, setIsDrawerOneVisible] = useState(drawerOneVisibleDefault);
  const [isDrawerTwoVisible, setIsDrawerTwoVisible] = useState(drawerTwoVisibleDefault);
  const [isDrawerThreeVisible, setIsDrawerThreeVisible] = useState(drawerThreeVisibleDefault);

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
    </div>
  );
}

SetupMultipleDrawers.propTypes = {
  drawerOneVisibleDefault: propTypes.bool,
  drawerThreeVisibleDefault: propTypes.bool,
  drawerTwoVisibleDefault: propTypes.bool,
};

SetupMultipleDrawers.defaultProps = {
  drawerOneVisibleDefault: false,
  drawerTwoVisibleDefault: false,
  drawerThreeVisibleDefault: false,
};

describe('Drawer', () => {
  beforeEach(() => {
    // Need to manually clean classList on body since jsdom instance can stay
    // the same across specs https://github.com/jestjs/jest/issues/1224
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

      it('body tag does not have Drawer--open', () => {
        const { container } = render(<SetupDrawerWithChildren visible={false} />);
        const body = container.closest('body');

        expect(body.classList).not.toContain('Drawer--open');
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

          expect(body.classList).not.toContain('Drawer--open');
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

      it('body tag has Drawer--open', () => {
        const { container } = render(<SetupDrawerWithChildren visible />);
        const body = container.closest('body');

        expect(body.classList).toContain('Drawer--open');
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

          expect(body.classList).not.toContain('Drawer--open');
        });
      });
    });
  });

  describe('When component renders multiple Drawers', () => {
    describe('with drawerOne visible by default', () => {
      it('body tag has Drawer--open', () => {
        const { container } = render(<SetupMultipleDrawers drawerOneVisibleDefault />);
        const body = container.closest('body');

        expect(body.classList).toContain('Drawer--open');
      });

      describe('when user clicks on drawerOne toggle visibility button', () => {
        it('body tag does not have Drawer--open after click', () => {
          const { container } = render(<SetupMultipleDrawers drawerOneVisibleDefault />);
          const body = container.closest('body');

          expect(body.classList).toContain('Drawer--open');

          userEvent.click(elements.drawerOneToggleVisibilityButton.get());

          expect(body.classList).not.toContain('Drawer--open');
        });
      });
    });

    describe('with no drawers visible by default', () => {
      it('body tag does not have Drawer--open', () => {
        const { container } = render(<SetupMultipleDrawers />);
        const body = container.closest('body');

        expect(body.classList).not.toContain('Drawer--open');
      });

      describe('when user clicks on drawerOne toggle visibility button', () => {
        it('body tag has Drawer--open after click', () => {
          const { container } = render(<SetupMultipleDrawers />);
          const body = container.closest('body');

          expect(body.classList).not.toContain('Drawer--open');

          userEvent.click(elements.drawerOneToggleVisibilityButton.get());

          expect(body.classList).toContain('Drawer--open');
        });
      });
    });
  });
});
