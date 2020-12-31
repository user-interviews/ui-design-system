import React from 'react';
import propTypes from 'prop-types';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { defaultStyles, defaultTheme, SELECT_SIZES } from './styles';

const AsyncCreatable = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  controlShouldRenderValue,
  className,
  defaultOptions,
  defaultValue,
  filterOption,
  formatCreateLabel,
  getNewOptionData,
  getOptionLabel,
  getOptionValue,
  isValidNewOption,
  id,
  ignoreCase,
  inputValue,
  isLoading,
  loadingMessage,
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
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    cacheOptions
    classNamePrefix={`${className || ''} AsyncCreatable`}
    controlShouldRenderValue={controlShouldRenderValue}
    defaultOptions
    defaultValue={defaultValue}
    filterOption={filterOption}
    formatCreateLabel={formatCreateLabel}
    getNewOptionData={getNewOptionData}
    getOptionLabel={getOptionLabel}
    getOptionValue={getOptionValue}
    ignoreCase
    inputValue={inputValue}
    isLoading={isLoading}
    isValidNewOption={() => false}
    loadingMessage={loadingMessage}
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
  controlShouldRenderValue: propTypes.bool,
  defaultOptions: propTypes.oneOfType([propTypes.bool, propTypes.array]),
  defaultValue: propTypes.object,
  filterOption: propTypes.func,
  formatCreateLabel: propTypes.func,
  getNewOptionData: propTypes.func,
  getOptionLabel: propTypes.func,
  getOptionValue: propTypes.func,
  id: propTypes.string,
  ignoreCase: propTypes.bool,
  inputValue: propTypes.string,
  isLoading: propTypes.bool,
  isValidNewOption: propTypes.func,
  loadingMessage: propTypes.func,
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
  controlShouldRenderValue: false,
  defaultOptions: false,
  defaultValue: undefined,
  filterOption: undefined,
  formatCreateLabel: undefined,
  getNewOptionData: undefined,
  getOptionLabel: undefined,
  getOptionValue: undefined,
  id: undefined,
  ignoreCase: undefined,
  inputValue: '',
  isLoading: false,
  isValidNewOption: undefined,
  loadingMessage: undefined,
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
