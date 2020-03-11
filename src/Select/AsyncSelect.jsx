import React from 'react';
import propTypes from 'prop-types';
import Async from 'react-select/async';

import { defaultStyles, defaultTheme } from './styles';

const AsyncSelect = ({
  className,
  defaultOptions,
  getOptionLabel,
  getOptionValue,
  ignoreCase,
  isLoading,
  loadOptions,
  modal,
  name,
  noOptionsMessage,
  placeholder,
  value,

  onChange,
}) => (
  <Async
    className={`${className || ''} AsyncSelect`}
    defaultOptions={defaultOptions}
    getOptionLabel={getOptionLabel}
    getOptionValue={getOptionValue}
    ignoreCase={ignoreCase}
    isLoading={isLoading}
    loadOptions={loadOptions}
    menuPortalTarget={modal ? document.body : undefined}
    name={name}
    noOptionsMessage={noOptionsMessage}
    placeholder={placeholder}
    shouldShowValue
    styles={{
      ...defaultStyles,
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
  className: propTypes.string,
  defaultOptions: propTypes.oneOfType([propTypes.bool, propTypes.array]),
  getOptionLabel: propTypes.func,
  getOptionValue: propTypes.func,
  ignoreCase: propTypes.bool,
  isLoading: propTypes.bool,
  loadOptions: propTypes.func.isRequired,
  modal: propTypes.bool,
  name: propTypes.string,
  noOptionsMessage: propTypes.func,
  placeholder: propTypes.string,
  value: propTypes.object,

  onChange: propTypes.func,
};

AsyncSelect.defaultProps = {
  className: undefined,
  defaultOptions: false,
  getOptionLabel: undefined,
  getOptionValue: undefined,
  ignoreCase: undefined,
  isLoading: false,
  modal: false,
  name: undefined,
  noOptionsMessage: undefined,
  placeholder: undefined,
  value: undefined,

  onChange: undefined,
};

export default AsyncSelect;
