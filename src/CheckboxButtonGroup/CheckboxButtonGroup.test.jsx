import React, { useState } from 'react';
import { act, create } from 'react-test-renderer';
import PropTypes from 'prop-types';

import CheckboxButtonGroup from 'src/CheckboxButtonGroup';
import CheckboxButton from 'src/CheckboxButton';

const CheckboxButtonGroupComponent = ({ children, defaultValues }) => {
  const [value, setValue] = useState(defaultValues);
  return (
    <CheckboxButtonGroup id="checkbox-question" value={value} onChange={setValue}>
      {children}
    </CheckboxButtonGroup>
  );
};

CheckboxButtonGroupComponent.propTypes = {
  defaultValues: PropTypes.array.isRequired,
};

describe('CheckboxButtonGroup', () => {
  test('sets initial value properly', () => {
    const checkboxButtonGroup = create(
      <CheckboxButtonGroupComponent defaultValues={[1, 2]}>
        <CheckboxButton id="first" label="First value" value={1} />
        <CheckboxButton id="second" label="Second value" value={2} />
      </CheckboxButtonGroupComponent>,
    );

    expect(checkboxButtonGroup).toMatchSnapshot();
  });

  test('will update array state to check a new item', async () => {
    const checkboxButtonGroup = create(
      <CheckboxButtonGroupComponent defaultValues={[]}>
        <CheckboxButton id="first" label="First value" value={1} />
        <CheckboxButton id="second" label="Second value" value={2} />
      </CheckboxButtonGroupComponent>,
    );

    const event = { target: { value: 1, checked: true } };
    const firstButton = checkboxButtonGroup.root.findAllByType((CheckboxButton))[0];

    await act(async () => firstButton.props.onChange(event));
    expect(checkboxButtonGroup).toMatchSnapshot();
  });

  test('will update array state to uncheck an item', async () => {
    const checkboxButtonGroup = create(
      <CheckboxButtonGroupComponent defaultValues={[1]}>
        <CheckboxButton id="first" label="First value" value={1} />
        <CheckboxButton id="second" label="Second value" value={2} />
      </CheckboxButtonGroupComponent>,
    );

    const event = { target: { value: 1, checked: false } };
    const firstButton = checkboxButtonGroup.root.findAllByType(CheckboxButton)[0];

    await act(async () => firstButton.props.onChange(event));
    expect(checkboxButtonGroup).toMatchSnapshot();
  });
});
