import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';

import './ToggleInput.scss';

const ToggleInput = ({
  disabled,
  id,
  isChecked,
  labelLeft,
  labelText,
  name,
  onToggle,
}) => (
  <label className="ToggleInput__label" htmlFor={id}>
    {labelLeft ? <span>{labelText}</span> : null}
    <Toggle
      checked={isChecked}
      disabled={disabled}
      icons={{ checked: null, unchecked: null }}
      id={id}
      name={name}
      value={String(isChecked)}
      onChange={onToggle}
    />
    {!labelLeft ? <span>{labelText}</span> : null}
  </label>
);

ToggleInput.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  labelLeft: PropTypes.bool,
  labelText: PropTypes.string.isRequired,
  name: PropTypes.string,
  onToggle: PropTypes.func,
};

ToggleInput.defaultProps = {
  disabled: false,
  isChecked: false,
  labelLeft: false,
  name: undefined,
  onToggle: undefined,
};

export default ToggleInput;
