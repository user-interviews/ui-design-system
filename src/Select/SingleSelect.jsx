import React from 'react';
import Select from 'react-select';
import propTypes from 'prop-types';

import zStack from 'src/Styles/zStack';

import { defaultTheme, defaultStyles, SELECT_SIZES } from './styles';

const SingleSelect = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  defaultValue,
  disabled,
  getOptionLabel,
  getOptionValue,
  isClearable,
  id,
  isLoading,
  isSearchable,
  modal,
  name,
  options,
  placeholder,
  size,
  value,

  onChange,
  ...props
}) => (
  <Select
    {...props}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    className={`${className || ''} SingleSelect`}
    defaultValue={defaultValue}
    getOptionLabel={getOptionLabel}
    getOptionValue={getOptionValue}
    id={id}
    isClearable={isClearable}
    isDisabled={disabled || isLoading}
    isSearchable={isSearchable}
    menuPortalTarget={modal ? document.body : undefined}
    name={name}
    options={options}
    placeholder={placeholder}
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

    onChange={onChange}
  />
);

SingleSelect.propTypes = {
  'aria-label': propTypes.string,
  'aria-labelledby': propTypes.string,
  className: propTypes.string,
  defaultValue: propTypes.object,
  disabled: propTypes.bool,
  getOptionLabel: propTypes.func,
  getOptionValue: propTypes.func,
  id: propTypes.string,
  isClearable: propTypes.bool,
  isLoading: propTypes.bool,
  isSearchable: propTypes.bool,
  modal: propTypes.bool,
  name: propTypes.string,
  options: propTypes.arrayOf(propTypes.object).isRequired,
  placeholder: propTypes.string,
  size: propTypes.oneOf(Object.values(SELECT_SIZES)),
  value: propTypes.object,

  onChange: propTypes.func.isRequired,
};

SingleSelect.defaultProps = {
  'aria-label': undefined,
  'aria-labelledby': undefined,
  className: undefined,
  defaultValue: undefined,
  disabled: false,
  getOptionLabel: undefined,
  getOptionValue: undefined,
  isClearable: false,
  id: undefined,
  isLoading: false,
  isSearchable: false,
  modal: false,
  name: undefined,
  placeholder: undefined,
  size: SELECT_SIZES.SMALL,
  value: undefined,
};

export default SingleSelect;
