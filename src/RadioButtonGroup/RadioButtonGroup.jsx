import React from 'react';
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
}) {
  const row = orientation === ORIENTATIONS.ROW;

  return (
    <div
      className={classnames(
        'RadioButtonGroup',
        {
          'RadioButtonGroup--row': row,
          'RadioButtonGroup--row--full-width': row && fullWidth,
        },
      )}
      name={name}
    >
      {children}
    </div>
  );
}

RadioButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  name: PropTypes.string,
  orientation: PropTypes.oneOf(Object.values(ORIENTATIONS)),
};

RadioButtonGroup.defaultProps = {
  fullWidth: false,
  name: '',
  orientation: ORIENTATIONS.COLUMN,
};
