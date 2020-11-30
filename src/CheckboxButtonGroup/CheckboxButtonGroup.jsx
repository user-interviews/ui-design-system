import React, { Children } from 'react';
import PropTypes from 'prop-types';

import './CheckboxButtonGroup.scss';

export default function CheckboxButtonGroup({
  children,
  id,
  parseInput,
  value,
  onChange,
}) {
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
    return React.cloneElement(
      child,
      {
        checked,
        onChange: handleChangeValues,
      },
    );
  };

  return (
    <div className="CheckboxButtonGroup" id={id}>
      {
        Children.toArray(children).map(renderChildElement)
      }
    </div>
  );
}

CheckboxButtonGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  id: PropTypes.string.isRequired,
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
  parseInput: (i) => i,
  value: [],
  onChange: undefined,
};
