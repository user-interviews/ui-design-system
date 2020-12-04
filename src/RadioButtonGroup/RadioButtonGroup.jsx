import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './RadioButtonGroup.scss';

export const ORIENTATIONS = {
  COLUMN: 'column',
  ROW: 'row',
};

export default function RadioButtonGroup(props) {
  return (
    <div
      className={classnames(
        'RadioButtonGroup',
        {
          'RadioButtonGroup--row': (props.orientation === ORIENTATIONS.ROW),
        },
      )}
      name={props.name}
    >
      {props.children}
    </div>
  );
}

RadioButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  orientation: PropTypes.oneOf(Object.values(ORIENTATIONS)),
};

RadioButtonGroup.defaultProps = {
  name: '',
  orientation: ORIENTATIONS.COLUMN,
};
