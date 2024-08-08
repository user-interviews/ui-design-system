import React, { Children } from 'react';

export const ORIENTATIONS = {
  COLUMN: 'column',
  ROW: 'row',
} as const;

type ControlButtonGroupProps = {
  childChecked: (...args: unknown[]) => boolean;
  children: React.ReactNode;
  handleChangeValue: React.ChangeEventHandler<HTMLInputElement>;
  orientation?: typeof ORIENTATIONS[keyof typeof ORIENTATIONS];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

function ControlButtonGroup({
  children,
  childChecked,
  handleChangeValue,
  orientation = ORIENTATIONS.COLUMN,
  onChange = undefined,
}: ControlButtonGroupProps) {
  const row = orientation === ORIENTATIONS.ROW;

  const renderChildElement = (child) => {
    const { value: childValue } = child.props;
    const checked = childChecked(childValue);

    // Treat children as controlled components only if group is also controlled
    const childProps: {
      bordered?: boolean;
      checked?: unknown;
      onChange?: typeof onChange,
    } = onChange ? {
      checked,
      onChange: handleChangeValue,
    } : {};

    if (row && child.props.bordered === undefined) {
      childProps.bordered = true;
    }

    return React.cloneElement(child, childProps);
  };

  return <>{Children.toArray(children).map(renderChildElement)}</>;
}

export default ControlButtonGroup;
