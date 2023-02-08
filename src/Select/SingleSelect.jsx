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
  components,
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
  menuWidth,
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
    components={components}
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
      ...defaultStyles({ menuWidth, size }),
      menuPortal: (base) => (
        modal ?
        { ...base, zIndex: zStack.zIndexModalBackdrop + 1 } :
          base
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
  components: propTypes.any,
  defaultValue: propTypes.object,
  disabled: propTypes.bool,
  getOptionLabel: propTypes.func,
  getOptionValue: propTypes.func,
  id: propTypes.string,
  /**
    The value of the search input.
    Required for connecting the input with a form label.
  */
  inputId: propTypes.string.isRequired,
  isClearable: propTypes.bool,
  isLoading: propTypes.bool,
  isMulti: propTypes.bool,
  isSearchable: propTypes.bool,
  menuWidth: propTypes.string,
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
  components: undefined,
  defaultValue: undefined,
  disabled: false,
  getOptionLabel: undefined,
  getOptionValue: undefined,
  isClearable: false,
  id: undefined,
  isLoading: false,
  isMulti: undefined,
  isSearchable: false,
  menuWidth: undefined,
  modal: false,
  name: undefined,
  placeholder: undefined,
  size: SELECT_SIZES.SMALL,
  value: undefined,
};

export default SingleSelect;
