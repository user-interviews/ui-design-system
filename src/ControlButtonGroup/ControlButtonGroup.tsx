import React, { Children } from 'react';

export const ORIENTATIONS = {
  COLUMN: 'column',
  ROW: 'row',
} as const;

type ControlButtonGroupProps = {
  /** Receives each child’s `value` and returns whether that option should appear selected. */
  childChecked: (...args: unknown[]) => boolean;
  /** Inputs (or similar) with a `value` prop; the group may `cloneElement` to inject `checked` / `onChange` / `bordered`. */
  children: React.ReactNode;
  /** Becomes each child’s `onChange` when `onChange` is set; should handle the change event from the control. */
  handleChangeValue: React.ChangeEventHandler<HTMLInputElement>;
  /** `'row'` vs `'column'` (`ORIENTATIONS`, default `column`); in `'row'`, sets `bordered` on composite children if unset. */
  orientation?: (typeof ORIENTATIONS)[keyof typeof ORIENTATIONS];
  /** When defined, controlled mode: clones pass `checked` from `childChecked` and `onChange` from `handleChangeValue`. When omitted, children are not augmented. */
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
      onChange?: typeof onChange;
    } = onChange
      ? {
          checked,
          onChange: handleChangeValue,
        }
      : {};

    const isDOMElement = typeof child.type === 'string';

    if (!isDOMElement && row && child.props.bordered === undefined) {
      childProps.bordered = true;
    }

    return React.cloneElement(child, childProps);
  };

  return <>{Children.toArray(children).map(renderChildElement)}</>;
}

export default ControlButtonGroup;
