import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ControlButtonGroup, { ORIENTATIONS } from '../ControlButtonGroup';

import './CheckboxButtonGroup.scss';

export default function CheckboxButtonGroup({
  children,
  fullWidth = false,
  id,
  orientation = ORIENTATIONS.ROW,
  parseInput = (i) => i,
  value = [],
  onChange,
}) {
  const row = orientation === ORIENTATIONS.ROW;
  const column = orientation === ORIENTATIONS.COLUMN;

  const handleChangeValue = (event) => {
    const eventValue = parseInput(event.target.value);
    const values = [...value];

    if (event.target.checked && !values.includes(eventValue)) {
      values.push(eventValue);
    } else if (!event.target.checked && values.includes(eventValue)) {
      values.splice(values.indexOf(eventValue), 1);
    }

    if (onChange) {
      onChange(values);
    }
  };

  const childChecked = (childValue) => (
    value && value.includes(childValue)
  );

  return (
    <div
      className={classNames('CheckboxButtonGroup', {
        'CheckboxButtonGroup--row': row,
        'CheckboxButtonGroup--row--full-width': row && fullWidth,
        'CheckboxButtonGroup--row--compact': row && !fullWidth,
        'CheckboxButtonGroup--column--full-width': column && fullWidth,
      })}
      id={id}
    >
      <ControlButtonGroup
        childChecked={childChecked}
        handleChangeValue={handleChangeValue}
        orientation={orientation}
        onChange={onChange}
      >
        {children}
      </ControlButtonGroup>
    </div>
  );
}

CheckboxButtonGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  fullWidth: PropTypes.bool,
  id: PropTypes.string.isRequired,
  orientation: PropTypes.oneOf(Object.values(ORIENTATIONS)),
  parseInput: PropTypes.func,
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  ),
  onChange: PropTypes.func,
};
