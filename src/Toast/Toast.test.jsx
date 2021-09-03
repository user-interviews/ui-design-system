import React from 'react';
import { create } from 'react-test-renderer';

import { Toast } from 'src/Toast';
import { Alert } from 'src/Alert';

describe('Toast', () => {
  test('no header classes', () => {
    const { props } = create(<Toast header messages={[]} />).toJSON();

    expect(props.className).toContain('Toast');
    expect(props.className).not.toContain('Toast--no-header');
  });

  test('header classes', () => {
    const { props } = create(<Toast header={false} messages={[]} />).toJSON();

    expect(props.className).toContain('Toast');
    expect(props.className).toContain('Toast--no-header');
  });

  describe('when building alert message props', () => {
    const setup = (message) => create(
      <Toast
        messages={[
          { id: '1', type: 'success', message },
        ]}
      />,
    );

    test('builds props from string message', () => {
      const { root } = setup('hello');

      expect(root.findByType(Alert).props.message).toBe('hello');
    });

    test('builds props from node message', () => {
      const { root } = setup(<div>hello</div>);

      expect(root.findByType(Alert).props.message).toEqual(<div>hello</div>);
    });

    test('builds props from object message', () => {
      const { root } = setup({ title: 'woohoo', body: 'you did it!' });

      expect(root.findByType(Alert).props.message).toBe('you did it!');
      expect(root.findByType(Alert).props.title).toBe('woohoo');
    });
  });
});
