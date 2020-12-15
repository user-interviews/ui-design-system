import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './RadioButtonGroup.scss';

export const ORIENTATIONS = {
  COLUMN: 'column',
  ROW: 'row',
};

export default function RadioButtonGroup({
  children,
  fullWidth,
  name,
  orientation,
  parseInput,
  value,
  onChange,
}) {
  const row = orientation === ORIENTATIONS.ROW;

  const handleChangeValues = (event) => {
    const eventValue = parseInput(event.target.value);
    onChange(eventValue);
  };

  const renderChildElement = (child) => {
    const { value: childValue } = child.props;
    const checked = !!value && value === childValue;

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
      className={classnames(
        'RadioButtonGroup',
        {
          'RadioButtonGroup--row': row,
          'RadioButtonGroup--row--full-width': row && fullWidth,
          'RadioButtonGroup--row--compact': row && !fullWidth,
        },
      )}
      name={name}
    >
      { Children.toArray(children).map(renderChildElement) }
    </div>
  );
}

RadioButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  name: PropTypes.string,
  orientation: PropTypes.oneOf(Object.values(ORIENTATIONS)),
  parseInput: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func,
};

RadioButtonGroup.defaultProps = {
  fullWidth: false,
  name: '',
  orientation: ORIENTATIONS.COLUMN,
  parseInput: (i) => i,
  value: undefined,
  onChange: undefined,
};
