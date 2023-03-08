import React from 'react';
import Async from 'react-select/async';
import { create } from 'react-test-renderer';

import { AsyncSelect, SELECT_SIZES } from 'src/Select';
import { SIZE_SMALL_HEIGHT } from 'src/Select/styles';

const renderAsync = (props) => create(
  <AsyncSelect inputId='async-select' loadOptions={jest.fn()} {...props} />,
);

const getContentStyles = ({ styles }) => styles.control({}, { isDisabled: false });

describe('AsyncSelect', () => {
  test('size prop set to small will set height of select', () => {
    const { root } = renderAsync({ size: SELECT_SIZES.small });
    const { props } = root.findByType(Async);
    const contentStyles = getContentStyles(props);

    expect(contentStyles.height).toBe(SIZE_SMALL_HEIGHT.height);
    expect(contentStyles.minHeight).toBe(SIZE_SMALL_HEIGHT.minHeight);
  });

  test('size prop set to null will not set height of select', () => {
    const { root } = renderAsync({ size: null });
    const { props } = root.findByType(Async);
    const contentStyles = getContentStyles(props);

    expect(contentStyles).not.toContain('height');
    expect(contentStyles).not.toContain('minHeight');
  });
});
