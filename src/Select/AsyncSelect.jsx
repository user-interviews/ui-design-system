import React from 'react';
import propTypes from 'prop-types';
import Async from 'react-select/async';

import zStack from 'src/Styles/zStack';

import { defaultStyles, defaultTheme, SELECT_SIZES } from './styles';

const AsyncSelect = ({
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
  isLoading,
  loadOptions,
  modal,
  name,
  noOptionsMessage,
  placeholder,
  size,
  value,

  onChange,
  ...props
}) => (
  <Async
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
      ...defaultStyles({ size }),
      menuPortal: (base) => (
        modal ?
          base :
          { ...base, zIndex: zStack.zIndexModalBackdrop + 1 }
      ),
    }}
    theme={defaultTheme}
    value={value}
    onBlurResetsInput={false}
    onChange={onChange}
    onSelectResetsInput={false}
  />
);

AsyncSelect.propTypes = {
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
};

AsyncSelect.defaultProps = {
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
  isClearable: false,
  isLoading: false,
  modal: false,
  name: undefined,
  noOptionsMessage: undefined,
  placeholder: undefined,
  size: SELECT_SIZES.SMALL,
  value: undefined,

  onChange: undefined,
};

export default AsyncSelect;
