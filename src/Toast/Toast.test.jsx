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

  describe('when building alert props', () => {
    const setup = (props) => create(
      <Toast
        messages={[
          { id: '1', type: 'success', ...props },
        ]}
      />,
    );

    test('builds props from string message', () => {
      const { root } = setup({ message: 'hello' });

      expect(root.findByType(Alert).props.message).toBe('hello');
    });

    test('builds props from node message', () => {
      const { root } = setup({ message: <div>hello</div> });

      expect(root.findByType(Alert).props.message).toEqual(<div>hello</div>);
    });

    describe('when title prop is passed', () => {
      test('builds title prop', () => {
        const { root } = setup({ title: 'woohoo', message: 'you did it!' });

        expect(root.findByType(Alert).props.title).toBe('woohoo');
      });
    });
  });
});
