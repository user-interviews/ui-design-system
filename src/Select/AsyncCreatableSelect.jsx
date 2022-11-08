import React from 'react';
import propTypes from 'prop-types';
import AsyncCreatable from 'react-select/async-creatable';

import zStack from 'src/Styles/zStack';

import { defaultStyles, defaultTheme, SELECT_SIZES } from './styles';

const AsyncCreatableSelect = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  defaultOptions,
  defaultValue,
  disabled,
  getOptionLabel,
  getOptionValue,
  isClearable,
  id,
  ignoreCase,
  inputId,
  isLoading,
  loadOptions,
  menuWidth,
  modal,
  name,
  noOptionsMessage,
  placeholder,
  size,
  value,

  onChange,
  ...props
}) => (
  <AsyncCreatable
    {...props}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    className={`${className || ''} AsyncSelect`}
    defaultOptions={defaultOptions}
    defaultValue={defaultValue}
    getOptionLabel={getOptionLabel}
    getOptionValue={getOptionValue}
    id={id}
    ignoreCase={ignoreCase}
    inputId={inputId}
    isClearable={isClearable}
    isDisabled={disabled}
    isLoading={isLoading}
    loadOptions={loadOptions}
    menuPortalTarget={modal ? document.body : undefined}
    name={name}
    noOptionsMessage={noOptionsMessage}
    placeholder={placeholder}
    shouldShowValue
    styles={{
      ...defaultStyles({ menuWidth, size }),
      menuPortal: (base) => (
        modal ?
        { ...base, zIndex: zStack.zIndexModalBackdrop + 1 } :
          base
      ),
    }}
    theme={defaultTheme}
    value={value}
    onBlurResetsInput={false}
    onChange={onChange}
    onSelectResetsInput={false}
  />
);

AsyncCreatableSelect.propTypes = {
  'aria-label': propTypes.string,
  'aria-labelledby': propTypes.string,
  className: propTypes.string,
  defaultOptions: propTypes.oneOfType([propTypes.bool, propTypes.array]),
  defaultValue: propTypes.object,
  disabled: propTypes.bool,
  getOptionLabel: propTypes.func,
  getOptionValue: propTypes.func,
  id: propTypes.string,
  ignoreCase: propTypes.bool,
  inputId: propTypes.string,
  isClearable: propTypes.bool,
  isLoading: propTypes.bool,
  loadOptions: propTypes.func.isRequired,
  menuWidth: propTypes.string,
  modal: propTypes.bool,
  name: propTypes.string,
  noOptionsMessage: propTypes.func,
  placeholder: propTypes.string,
  size: propTypes.oneOf(Object.values(SELECT_SIZES)),
  value: propTypes.object,

  onChange: propTypes.func,
};

AsyncCreatableSelect.defaultProps = {
  'aria-label': undefined,
  'aria-labelledby': undefined,
  className: undefined,
  defaultOptions: false,
  defaultValue: undefined,
  disabled: false,
  getOptionLabel: undefined,
  getOptionValue: undefined,
  id: undefined,
  ignoreCase: undefined,
  inputId: undefined,
  isClearable: false,
  isLoading: false,
  menuWidth: undefined,
  modal: false,
  name: undefined,
  noOptionsMessage: undefined,
  placeholder: undefined,
  size: SELECT_SIZES.SMALL,
  value: undefined,

  onChange: undefined,
};

export default AsyncCreatableSelect;
