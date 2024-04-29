import React from 'react';
import classnames from 'classnames';

import ControlButtonGroup, { ORIENTATIONS } from '../ControlButtonGroup';

import './RadioButtonGroup.scss';

type RadioButtonGroupProps = {
  children: React.ReactNode;
  fullWidth?: boolean;
  orientation?: typeof ORIENTATIONS[keyof typeof ORIENTATIONS];
  value?: number | string | boolean;
  onChange?: (...args: unknown[]) => unknown;
};

export default function RadioButtonGroup({
  children,
  fullWidth,
  orientation = 'column',
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

  const childChecked = (childValue) => (value === childValue);

  return (
    <div
      className={classnames(
        'RadioButtonGroup',
        {
          'RadioButtonGroup--row': row,
          'RadioButtonGroup--row--full-width': row && fullWidth,
          'RadioButtonGroup--row--compact': row && !fullWidth,
          'RadioButtonGroup--column--full-width': column && fullWidth,
        },
      )}
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
