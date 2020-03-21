import React, { Component } from 'react';
import { act } from '@testing-library/react-hooks';
import { create } from 'react-test-renderer';

import withFlash from '../../src/Flash/withFlash';
import { MessageTypes } from '../../src/Flash';

jest.mock('react-transition-group', () => (
  {
    CSSTransition: ({ children }) => children,
    TransitionGroup: ({ children }) => children,
  }
));

// eslint-disable-next-line react/prefer-stateless-function
class WrappedComponent extends Component {
  render() {
    return <div />;
  }
}

describe('test withFlash', () => {
  test('it can create a new flash message', async () => {
    const newMessage = 'This is just a test...';
    const ComponentWithFlash = withFlash(WrappedComponent);
    const flash = create(<ComponentWithFlash />);
    const component = flash.root.findByType(WrappedComponent);


    act(() => {
      component.props.setFlashMessage(MessageTypes.SUCCESS, newMessage);
    });

    expect(flash).toMatchSnapshot();
  });
});
