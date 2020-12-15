import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ORIENTATIONS } from '../RadioButtonGroup/RadioButtonGroup';

import './CheckboxButtonGroup.scss';

export default function CheckboxButtonGroup({
  children,
  fullWidth,
  id,
  orientation,
  parseInput,
  value,
  onChange,
}) {
  const row = orientation === ORIENTATIONS.ROW;

  const handleChangeValues = (event) => {
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

  const renderChildElement = (child) => {
    const { value: childValue } = child.props;
    const checked = value && value.includes(childValue);

    // Treat children as controlled components only if group is also controlled
    const childProps = onChange ? {
      checked,
      onChange: handleChangeValues,
    } : {};

    if (row) {
      childProps.bordered = true;
    }

    return React.cloneElement(child, childProps);
  };

  return (
    <div
      className={classNames('CheckboxButtonGroup', {
        'CheckboxButtonGroup--row': row,
        'CheckboxButtonGroup--row--full-width': row && fullWidth,
        'CheckboxButtonGroup--row--compact': row && !fullWidth,
      })}
      id={id}
    >
      {
        Children.toArray(children).map(renderChildElement)
      }
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

CheckboxButtonGroup.defaultProps = {
  fullWidth: false,
  orientation: ORIENTATIONS.ROW,
  parseInput: (i) => i,
  value: [],
  onChange: undefined,
};
