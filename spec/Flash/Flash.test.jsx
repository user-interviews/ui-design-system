import React from 'react';
import { create } from 'react-test-renderer';

import Flash from '../../src/Flash/Flash';

describe('Flash', () => {
  test('no header classes', () => {
    const { props } = create(<Flash header messages={[]} />).toJSON();

    expect(props.className).toContain('Flash');
    expect(props.className).not.toContain('Flash--no-header');
  });

  test('header classes', () => {
    const { props } = create(<Flash header={false} messages={[]} />).toJSON();

    expect(props.className).toContain('Flash');
    expect(props.className).toContain('Flash--no-header');
  });
});
