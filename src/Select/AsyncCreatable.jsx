import React from 'react';
import propTypes from 'prop-types';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { defaultStyles, defaultTheme, SELECT_SIZES } from './styles';

const AsyncCreatable = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  defaultOptions,
  defaultValue,
  filterOption,
  getOptionLabel,
  getOptionValue,
  isClearable,
  id,
  ignoreCase,
  inputValue,
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
  <AsyncCreatableSelect
    {...props}
    autoload
    classNamePrefix={`${className || ''} AsyncCreatable`}
    controlShouldRenderValue={false}
    defaultOptions
    defaultValue={defaultValue}
    filterOption={filterOption}
    formatCreateLabel={(label) => label}
    getNewOptionData={(label) => ({ name: label })}
    getOptionLabel={getOptionLabel}
    getOptionValue={getOptionValue}
    ignoreCase
    inputValue={inputValue}
    isLoading={isLoading}
    isValidNewOption={() => false}
    loadingMessage={() => 'hi'}
    loadOptions={loadOptions}
    name={name}
    noOptionsMessage={noOptionsMessage}
    placeholder={placeholder}
    styles={defaultStyles}
    theme={defaultTheme}
    value={value}
    onChange={onChange}
    onInputChange={onInputChange}
  />
);

AsyncCreatable.propTypes = {
  'aria-label': propTypes.string,
  'aria-labelledby': propTypes.string,
  className: propTypes.string,
  defaultOptions: propTypes.oneOfType([propTypes.bool, propTypes.array]),
  defaultValue: propTypes.object,
  filterOption: propTypes.func,
  getOptionLabel: propTypes.func,
  getOptionValue: propTypes.func,
  id: propTypes.string,
  ignoreCase: propTypes.bool,
  inputValue: propTypes.string,
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

AsyncCreatable.defaultProps = {
  'aria-label': undefined,
  'aria-labelledby': undefined,
  className: undefined,
  defaultOptions: false,
  defaultValue: undefined,
  filterOption: undefined,
  getOptionLabel: undefined,
  getOptionValue: undefined,
  id: undefined,
  ignoreCase: undefined,
  inputValue: '',
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

export default AsyncCreatable;
