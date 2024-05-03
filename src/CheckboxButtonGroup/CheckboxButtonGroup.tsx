import React from 'react';
import classNames from 'classnames';

import ControlButtonGroup, { ORIENTATIONS } from '../ControlButtonGroup';

import './CheckboxButtonGroup.scss';

type CheckboxButtonGroupProps = {
  children: React.ReactElement[];
  fullWidth?: boolean;
  id: string;
  orientation?: unknown[];
  parseInput?: (arg0: string) => string | number;
  value?: (number | string)[];
  onChange?: (...args: unknown[]) => unknown;
};

export default function CheckboxButtonGroup({
  children,
  fullWidth = false,
  id,
  orientation = ORIENTATIONS.ROW,
  parseInput = (val) => val,
  value = [],
  onChange = undefined,
}: CheckboxButtonGroupProps) {
  const row = orientation === ORIENTATIONS.ROW;
  const column = orientation === ORIENTATIONS.COLUMN;

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = parseInput(event.target.value);
    const values = Array.isArray(value) ? [...value] : [value];

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
    Array.isArray(value) && value.includes(childValue)
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
