import React from 'react';
import Creatable from 'react-select/creatable';
import PropTypes from 'prop-types';

import zStack from 'src/Styles/zStack';

import {
 borderedMultiValueStyles, defaultTheme, defaultStyles, SELECT_SIZES,
} from './styles';

function CreatableSelect({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  borderedMultiValue,
  className,
  components,
  defaultValue,
  getOptionLabel,
  getOptionValue,
  id,
  inputId,
  isClearable = false,
  isDisabled = false,
  isLoading,
  menuWidth,
  modal,
  name,
  options,
  placeholder,
  size = SELECT_SIZES.SMALL,
  value,
  onChange,
  ...props
}) {
  return (
    <Creatable
      {...props}
      aria-label={ariaLabel}
      ariaLabelledBy={ariaLabelledBy}
      className={`${className || ''} CreatableSelect`}
      classNamePrefix="Select"
      components={components}
      defaultValue={defaultValue}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      id={id}
      inputId={inputId}
      isClearable={isClearable}
      isDisabled={isDisabled}
      isLoading={isLoading}
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

CreatableSelect.propTypes = {
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  borderedMultiValue: PropTypes.bool,
  className: PropTypes.string,
  components: PropTypes.any,
  defaultValue: PropTypes.object,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  id: PropTypes.string,
  /**
    The value of the search input.
    Required for connecting the input with a form label.
  */
  inputId: PropTypes.string.isRequired,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  menuWidth: PropTypes.string,
  modal: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(Object.values(SELECT_SIZES)),
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default CreatableSelect;
