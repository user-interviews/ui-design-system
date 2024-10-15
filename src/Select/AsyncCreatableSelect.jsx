import React from 'react';
import propTypes from 'prop-types';
import AsyncCreatable from 'react-select/async-creatable';

import zStack from 'src/Styles/zStack';

import { defaultStyles, defaultTheme, SELECT_SIZES } from './styles';

function AsyncCreatableSelect({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  components,
  defaultOptions = false,
  defaultValue,
  disabled = false,
  getOptionLabel,
  getOptionValue,
  isClearable = false,
  id,
  ignoreCase,
  inputId,
  isLoading = false,
  loadOptions,
  menuWidth,
  modal = false,
  name,
  noOptionsMessage,
  placeholder,
  size = SELECT_SIZES.SMALL,
  value,

  onChange,
  ...props
}) {
  return (
    <AsyncCreatable
      {...props}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={`${className || ''} AsyncSelect`}
      classNamePrefix="Select"
      components={components}
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
}

AsyncCreatableSelect.propTypes = {
  'aria-label': propTypes.string,
  'aria-labelledby': propTypes.string,
  className: propTypes.string,
  components: propTypes.any,
  defaultOptions: propTypes.oneOfType([propTypes.bool, propTypes.array]),
  defaultValue: propTypes.object,
  disabled: propTypes.bool,
  getOptionLabel: propTypes.func,
  getOptionValue: propTypes.func,
  id: propTypes.string,
  ignoreCase: propTypes.bool,
  /**
    The value of the search input.
    Required for connecting the input with a form label.
  */
  inputId: propTypes.string.isRequired,
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

export default AsyncCreatableSelect;
