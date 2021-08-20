import React from 'react';
import Select from 'react-select';
import { create } from 'react-test-renderer';

import { SingleSelect, SELECT_SIZES } from 'src/Select';

const renderSelect = (props) => create(
  <SingleSelect options={[]} onChange={jest.fn()} {...props} />,
);

const getContentStyles = ({ styles }) => styles.control({}, { isDisabled: false });

describe('SingleSelect', () => {
  test('size prop set to small will set height of select', () => {
    const { root } = renderSelect({ size: SELECT_SIZES.small });
    const { props } = root.findByType(Select);
    const contentStyles = getContentStyles(props);

    expect(contentStyles.height).toBe('2.25rem');
    expect(contentStyles.minHeight).toBe('2.25rem');
  });

  test('size prop set to null will not set height of select', () => {
    const { root } = renderSelect({ size: null });
    const { props } = root.findByType(Select);
    const contentStyles = getContentStyles(props);

    expect(contentStyles).not.toContain('height');
    expect(contentStyles).not.toContain('minHeight');
  });
});
