import React from 'react';
import Select from 'react-select';
import { create } from 'react-test-renderer';

import { SingleSelect, SELECT_SIZES } from 'src/Select';
import { SIZE_SMALL_HEIGHT } from 'src/Select/styles';

const renderSelect = (props) => create(
  <SingleSelect inputId="single-select" options={[]} onChange={jest.fn()} {...props} />,
);

const getContentStyles = ({ styles }) => styles.control({}, { isDisabled: false });

describe('SingleSelect', () => {
  test('size prop set to small will set height of select', () => {
    const { root } = renderSelect({ size: SELECT_SIZES.small });
    const { props } = root.findByType(Select);
    const contentStyles = getContentStyles(props);

    expect(contentStyles.height).toBe(SIZE_SMALL_HEIGHT.height);
    expect(contentStyles.minHeight).toBe(SIZE_SMALL_HEIGHT.minHeight);
  });

  test('size prop set to null will not set height of select', () => {
    const { root } = renderSelect({ size: null });
    const { props } = root.findByType(Select);
    const contentStyles = getContentStyles(props);

    expect(contentStyles).not.toContain('height');
    expect(contentStyles).not.toContain('minHeight');
  });
});
