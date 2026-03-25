import { act } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';

import { withToast } from '.';
import { MessageTypes } from '../Alert';

jest.mock('react-transition-group', () => ({
  CSSTransition: ({ children }) => children,
  TransitionGroup: ({ children }) => children,
}));
jest.mock('../utils/uuid', () => ({
  generateUUID: () => '1234',
}));

function WrappedComponent() {
  return <div />;
}

describe('withToast()', () => {
  it('can create a new Toast message', async () => {
    const newMessage = 'This is just a test...';
    const ComponentWithToast = withToast(WrappedComponent);
    const toast = create(<ComponentWithToast />);
    const component = toast.root.findByType(WrappedComponent);

    act(() => {
      component.props.setToastMessage({
        type: MessageTypes.SUCCESS,
        message: newMessage,
      });
    });

    expect(toast).toMatchSnapshot();
  });
});
