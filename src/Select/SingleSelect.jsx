import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import propTypes from 'prop-types';

import zStack from 'src/Styles/zStack';

import { defaultTheme, defaultStyles, SELECT_SIZES } from './styles';

const SingleSelect = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  closeMenuOnSelect,
  defaultValue,
  disabled,
  getOptionLabel,
  getOptionValue,
  isClearable,
  id,
  inputId,
  isLoading,
  isMulti,
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
    className={classNames('SingleSelect', className)}
    closeMenuOnSelect={closeMenuOnSelect}
    defaultValue={defaultValue}
    getOptionLabel={getOptionLabel}
    getOptionValue={getOptionValue}
    id={id}
    inputId={inputId}
    isClearable={isClearable}
    isDisabled={disabled || isLoading}
    isMulti={isMulti}
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
  closeMenuOnSelect: propTypes.bool,
  defaultValue: propTypes.object,
  disabled: propTypes.bool,
  getOptionLabel: propTypes.func,
  getOptionValue: propTypes.func,
  id: propTypes.string,
  inputId: propTypes.string,
  isClearable: propTypes.bool,
  isLoading: propTypes.bool,
  isMulti: propTypes.bool,
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
  closeMenuOnSelect: true,
  defaultValue: undefined,
  disabled: false,
  getOptionLabel: undefined,
  getOptionValue: undefined,
  isClearable: false,
  id: undefined,
  inputId: undefined,
  isLoading: false,
  isMulti: undefined,
  isSearchable: false,
  modal: false,
  name: undefined,
  placeholder: undefined,
  size: SELECT_SIZES.SMALL,
  value: undefined,
};

export default SingleSelect;
