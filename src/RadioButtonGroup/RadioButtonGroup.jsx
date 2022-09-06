import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ControlButtonGroup, { ORIENTATIONS } from '../ControlButtonGroup';

import './RadioButtonGroup.scss';

export default function RadioButtonGroup({
  children,
  fullWidth,
  name,
  orientation,
  value,
  onChange,
}) {
  const row = orientation === ORIENTATIONS.ROW;
  const column = orientation === ORIENTATIONS.COLUMN;

  const handleChangeValue = (event) => {
    onChange(event.target.value);
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
      name={name}
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

RadioButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  name: PropTypes.string,
  orientation: PropTypes.oneOf(Object.values(ORIENTATIONS)),
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
  value: undefined,
  onChange: undefined,
};
