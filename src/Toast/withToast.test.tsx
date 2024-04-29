import React from 'react';
import { act } from '@testing-library/react-hooks';
import { create } from 'react-test-renderer';

import { MessageTypes } from '../Alert';
import { withToast } from '.';

jest.mock('react-transition-group', () => (
  {
    CSSTransition: ({ children }) => children,
    TransitionGroup: ({ children }) => children,
  }
));

const WrappedComponent = () => <div />;

describe('test withToast', () => {
  test('it can create a new Toast message', async () => {
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
