import React from 'react';
import { create } from 'react-test-renderer';

import { Toast } from 'src/Toast';

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
});
