import React from 'react';
import Async from 'react-select/async';
import { create } from 'react-test-renderer';

import { AsyncSelect, SELECT_SIZES } from 'src/Select';

const renderAsync = (props) => create(
  <AsyncSelect loadOptions={jest.fn()} {...props} />,
);

const getContentStyles = ({ styles }) => styles.control({}, { isDisabled: false });

describe('AsyncSelect', () => {
  test('size prop set to small will set height of select', () => {
    const { root } = renderAsync({ size: SELECT_SIZES.small });
    const { props } = root.findByType(Async);
    const contentStyles = getContentStyles(props);

    expect(contentStyles.height).toBe('2.25rem');
    expect(contentStyles.minHeight).toBe('2.25rem');
  });

  test('size prop set to null will not set height of select', () => {
    const { root } = renderAsync({ size: null });
    const { props } = root.findByType(Async);
    const contentStyles = getContentStyles(props);

    expect(contentStyles).not.toContain('height');
    expect(contentStyles).not.toContain('minHeight');
  });
});
