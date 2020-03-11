import React from 'react';
import Select from 'react-select';
import propTypes from 'prop-types';

import { defaultTheme, defaultStyles } from './styles';

const SingleSelect = ({
  className,
  defaultValue,
  isLoading,
  isSearchable,
  modal,
  name,
  options,
  placeholder,
  value,

  onChange,
}) => (
  <Select
    className={`${className || ''} SingleSelect`}
    defaultValue={defaultValue}
    isDisabled={isLoading}
    isSearchable={isSearchable}
    menuPortalTarget={modal ? document.body : undefined}
    name={name}
    options={options}
    placeholder={placeholder}
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

    onChange={onChange}
  />
);

SingleSelect.propTypes = {
  className: propTypes.string,
  defaultValue: propTypes.object,
  isLoading: propTypes.bool,
  isSearchable: propTypes.bool,
  modal: propTypes.bool,
  name: propTypes.string,
  options: propTypes.arrayOf(propTypes.object).isRequired,
  placeholder: propTypes.string,
  value: propTypes.object,

  onChange: propTypes.func.isRequired,
};

SingleSelect.defaultProps = {
  className: undefined,
  defaultValue: undefined,
  isLoading: false,
  isSearchable: false,
  modal: false,
  name: undefined,
  placeholder: undefined,
  value: undefined,
};

export default SingleSelect;
