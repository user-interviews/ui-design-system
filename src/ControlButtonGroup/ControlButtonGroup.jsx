import React, { Children } from 'react';
import PropTypes from 'prop-types';

export const ORIENTATIONS = {
  COLUMN: 'column',
  ROW: 'row',
};

const ControlButtonGroup = ({
  children,
  childChecked,
  handleChangeValue,
  orientation,
  onChange,
}) => {
  const row = orientation === ORIENTATIONS.ROW;

  const renderChildElement = (child) => {
    const { value: childValue } = child.props;
    const checked = childChecked(childValue);

    // Treat children as controlled components only if group is also controlled
    const childProps = onChange ? {
      checked,
      onChange: handleChangeValue,
    } : {};

    if (row && child.props.bordered === undefined) {
      childProps.bordered = true;
    }

    return React.cloneElement(child, childProps);
  };

  return Children.toArray(children).map(renderChildElement);
};

ControlButtonGroup.propTypes = {
  childChecked: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  handleChangeValue: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(Object.values(ORIENTATIONS)),
  onChange: PropTypes.func,
};

ControlButtonGroup.defaultProps = {
  orientation: ORIENTATIONS.COLUMN,
  onChange: undefined,
};

export default ControlButtonGroup;
