import React from 'react';

import classnames from 'classnames';

import ControlButtonGroup, { ORIENTATIONS } from '../ControlButtonGroup';

import './RadioButtonGroup.scss';

type RadioButtonGroupProps = {
  /** Each child should expose a `value` prop for selection state. */
  children: React.ReactNode;
  /** Stretches row layout when `orientation` is `row`. */
  fullWidth?: boolean;
  /** Column vs row grouping (`ORIENTATIONS`, default `column`). */
  orientation?: (typeof ORIENTATIONS)[keyof typeof ORIENTATIONS];
  /** Selected option’s `value` for `checked` state. */
  value?: number | string | boolean;
  /** Receives `event.target.value` from the active radio. */
  onChange?: (...args: unknown[]) => unknown;
};

export default function RadioButtonGroup({
  children,
  fullWidth,
  orientation = ORIENTATIONS.COLUMN,
  value,
  onChange,
}: RadioButtonGroupProps) {
  const row = orientation === ORIENTATIONS.ROW;
  const column = orientation === ORIENTATIONS.COLUMN;

  const handleChangeValue = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const childChecked = (childValue) => value === childValue;

  return (
    <div
      className={classnames('RadioButtonGroup', {
        'RadioButtonGroup--row': row,
        'RadioButtonGroup--row--full-width': row && fullWidth,
        'RadioButtonGroup--row--compact': row && !fullWidth,
        'RadioButtonGroup--column--full-width': column && fullWidth,
      })}
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
