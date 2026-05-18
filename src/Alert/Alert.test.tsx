import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Alert, MessageTypes } from './index';

type AlertType = (typeof MessageTypes)[keyof typeof MessageTypes];

const elements = {
  alert: {
    get: () => screen.getByText('message').closest('.Alert') as HTMLElement,
  },
  closeButton: {
    get: (type: AlertType) =>
      screen.getByRole('button', { name: `close ${type}` }),
  },
  actionLink: {
    get: (name: string) => screen.getByRole('link', { name }),
  },
};

describe('Alert', () => {
  describe('when given a valid type', () => {
    describe('with type success', () => {
      it('renders the title and message', () => {
        render(
          <Alert
            message="message"
            title="Success title"
            type={MessageTypes.SUCCESS}
          />,
        );

        expect(screen.getByText('Success title')).toBeInTheDocument();
        expect(screen.getByText('message')).toBeInTheDocument();
        expect(elements.alert.get().classList).toContain('Alert-success');
      });
    });

    describe('with type info', () => {
      it('renders the title and message', () => {
        render(
          <Alert
            message="message"
            title="Info title"
            type={MessageTypes.INFO}
          />,
        );

        expect(screen.getByText('Info title')).toBeInTheDocument();
        expect(elements.alert.get().classList).toContain('Alert-info');
      });
    });

    describe('with type feature', () => {
      it('renders the title and message', () => {
        render(
          <Alert
            message="message"
            title="Feature title"
            type={MessageTypes.FEATURE}
          />,
        );

        expect(screen.getByText('Feature title')).toBeInTheDocument();
        expect(elements.alert.get().classList).toContain('Alert-feature');
      });
    });

    describe('with type warning', () => {
      it('renders the title and message', () => {
        render(
          <Alert
            message="message"
            title="Warning title"
            type={MessageTypes.WARNING}
          />,
        );

        expect(screen.getByText('Warning title')).toBeInTheDocument();
        expect(elements.alert.get().classList).toContain('Alert-warning');
      });
    });

    describe('with type error', () => {
      it('renders the title and message', () => {
        render(
          <Alert
            message="message"
            title="Error title"
            type={MessageTypes.ERROR}
          />,
        );

        expect(screen.getByText('Error title')).toBeInTheDocument();
        expect(elements.alert.get().classList).toContain('Alert-error');
      });
    });
  });

  describe('when given an unsupported type', () => {
    it('throws a TypeError', () => {
      expect(() =>
        render(
          <Alert message="message" type={'not-a-real-type' as AlertType} />,
        ),
      ).toThrow(TypeError);
    });
  });

  describe('when noMargin is true', () => {
    it('adds the Alert--no-margin modifier class', () => {
      render(<Alert message="message" noMargin type={MessageTypes.INFO} />);

      expect(elements.alert.get().classList).toContain('Alert--no-margin');
    });
  });

  describe('when noMargin is not set', () => {
    it('does not add the Alert--no-margin modifier class', () => {
      render(<Alert message="message" type={MessageTypes.INFO} />);

      expect(elements.alert.get().classList).not.toContain('Alert--no-margin');
    });
  });

  describe('when removeBorderLeft is true', () => {
    describe('and type is not feature', () => {
      it('removes the colored left border', () => {
        render(
          <Alert
            message="message"
            removeBorderLeft
            type={MessageTypes.WARNING}
          />,
        );

        expect(elements.alert.get()).toHaveStyle({ borderLeft: 'none' });
      });
    });

    describe('and type is feature', () => {
      it('keeps the colored left border', () => {
        render(
          <Alert
            message="message"
            removeBorderLeft
            type={MessageTypes.FEATURE}
          />,
        );

        expect(elements.alert.get()).not.toHaveAttribute('style');
      });
    });
  });

  describe('when an onDismiss handler is provided', () => {
    it('renders a close button', () => {
      render(
        <Alert
          id="alert-id"
          message="message"
          type={MessageTypes.INFO}
          onDismiss={jest.fn()}
        />,
      );

      expect(elements.closeButton.get(MessageTypes.INFO)).toBeInTheDocument();
    });

    it('calls onDismiss with the id when the close button is clicked', async () => {
      const onDismiss = jest.fn();

      render(
        <Alert
          id="alert-id"
          message="message"
          type={MessageTypes.INFO}
          onDismiss={onDismiss}
        />,
      );

      userEvent.click(elements.closeButton.get(MessageTypes.INFO));

      await waitFor(() => {
        expect(onDismiss).toHaveBeenCalledWith('alert-id');
      });
    });
  });

  describe('when given an action with a url', () => {
    it('renders a styled anchor with the action target', () => {
      render(
        <Alert
          action={{ content: 'Take action', url: 'https://example.com' }}
          actionTarget="_blank"
          message="message"
          type={MessageTypes.INFO}
        />,
      );

      const link = elements.actionLink.get('Take action');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });
});
