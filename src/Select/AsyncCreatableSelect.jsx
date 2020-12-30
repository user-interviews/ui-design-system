import React from 'react';
import propTypes from 'prop-types';
import { AsyncCreatable, components } from 'react-select';

import { defaultStyles, defaultTheme, SELECT_SIZES } from './styles';

const Input = (props) => (
  <components.Input
    {...props}
    isHidden={false}
  />
);

const AsyncSelect = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  defaultOptions,
  defaultValue,
  disabled,
  filterOption,
  getOptionLabel,
  getOptionValue,
  isClearable,
  id,
  ignoreCase,
  isLoading,
  loadOptions,
  modal,
  name,
  noOptionsMessage,
  placeholder,
  size,
  value,

  onChange,
  onInputChange,
  ...props
}) => (
  <AsyncCreatable
    {...props}
    autoload
    className="job-title-select"
    classNamePrefix="react-select"
    components={{ Input }}
    controlShouldRenderValue={false}
    defaultOptions
    filterOption={filterOption}
    formatCreateLabel={(label) => label}
    getNewOptionData={(label) => ({ name: label })}
    getOptionLabel={(option) => option.name}
    getOptionValue={(option) => option.name}
    ignoreCase
    inputValue={occupation || ''}
    isLoading={loading}
    isValidNewOption={() => false}
    loadingMessage={renderNull}
    loadOptions={loadOptions}
    name={inputName}
    noOptionsMessage={renderNull}
    placeholder=""
    styles={defaultStyles}
    tabSelectsValue={false}
    theme={defaultTheme}
    value={{ name: occupation }}
    onChange={onChange}
    onInputChange={onInputChange}
  />
);

AsyncSelect.propTypes = {
  'aria-label': propTypes.string,
  'aria-labelledby': propTypes.string,
  className: propTypes.string,
  defaultOptions: propTypes.oneOfType([propTypes.bool, propTypes.array]),
  defaultValue: propTypes.object,
  disabled: propTypes.bool,
  filterOption: propTypes.func,
  getOptionLabel: propTypes.func,
  getOptionValue: propTypes.func,
  id: propTypes.string,
  ignoreCase: propTypes.bool,
  isClearable: propTypes.bool,
  isLoading: propTypes.bool,
  loadOptions: propTypes.func.isRequired,
  modal: propTypes.bool,
  name: propTypes.string,
  noOptionsMessage: propTypes.func,
  placeholder: propTypes.string,
  size: propTypes.oneOf(Object.values(SELECT_SIZES)),
  value: propTypes.object,

  onChange: propTypes.func,
  onInputChange: propTypes.func,
};

AsyncSelect.defaultProps = {
  'aria-label': undefined,
  'aria-labelledby': undefined,
  className: undefined,
  defaultOptions: false,
  defaultValue: undefined,
  disabled: false,
  filterOption: undefined,
  getOptionLabel: undefined,
  getOptionValue: undefined,
  id: undefined,
  ignoreCase: undefined,
  isClearable: false,
  isLoading: false,
  modal: false,
  name: undefined,
  noOptionsMessage: undefined,
  placeholder: undefined,
  size: SELECT_SIZES.SMALL,
  value: undefined,

  onChange: undefined,
  onInputChange: undefined,
};

export default AsyncCreatableSelect;
