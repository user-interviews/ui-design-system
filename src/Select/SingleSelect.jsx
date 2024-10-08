import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import propTypes from 'prop-types';

import zStack from 'src/Styles/zStack';

import {
 borderedMultiValueStyles, defaultTheme, defaultStyles, SELECT_SIZES,
} from './styles';

function SingleSelect({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  borderedMultiValue,
  className,
  closeMenuOnScroll = true,
  closeMenuOnSelect = true,
  components,
  defaultValue,
  disabled = false,
  getOptionLabel,
  getOptionValue,
  isClearable = false,
  id,
  inputId,
  isLoading = false,
  isMulti,
  isSearchable = false,
  menuWidth,
  modal = false,
  name,
  options,
  placeholder,
  size = SELECT_SIZES.SMALL,
  value,
  onChange,
  ...props
}) {
  return (
    <Select
      {...props}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={classNames('SingleSelect', className)}
      classNamePrefix="Select"
      closeMenuOnScroll={closeMenuOnScroll}
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
      ...borderedMultiValueStyles(borderedMultiValue),
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
}

SingleSelect.propTypes = {
  'aria-label': propTypes.string,
  'aria-labelledby': propTypes.string,
  borderedMultiValue: propTypes.bool,
  className: propTypes.string,
  closeMenuOnScroll: propTypes.bool,
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

export default SingleSelect;
