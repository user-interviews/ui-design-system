import React from 'react';
import Creatable from 'react-select/creatable';
import PropTypes from 'prop-types';

import zStack from 'src/Styles/zStack';

import { defaultTheme, defaultStyles, SELECT_SIZES } from './styles';

const CreatableSelect = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
  components,
  defaultValue,
  disabled,
  getOptionValue,
  getOptionLabel,
  id,
  inputId,
  isClearable,
  isLoading,
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
  <Creatable
    {...props}
    ariaLabel={ariaLabel}
    ariaLabelledBy={ariaLabelledBy}
    className={`${className || ''} CreatableSelect`}
    classNamePrefix="Select"
    components={components}
    defaultValue={defaultValue}
    disabled={disabled}
    getOptionLabel={getOptionLabel}
    getOptionValue={getOptionValue}
    id={id}
    inputId={inputId}
    isClearable={isClearable}
    isLoading={isLoading}
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

CreatableSelect.propTypes = {
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  className: PropTypes.string,
  components: PropTypes.any,
  defaultValue: PropTypes.object,
  disabled: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  id: PropTypes.string,
  /**
    The value of the search input.
    Required for connecting the input with a form label.
  */
  inputId: PropTypes.string.isRequired,
  isClearable: PropTypes.bool,
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

CreatableSelect.defaultProps = {
  'aria-label': undefined,
  'aria-labelledby': undefined,
  className: undefined,
  components: undefined,
  defaultValue: undefined,
  disabled: false,
  getOptionLabel: undefined,
  getOptionValue: undefined,
  isClearable: false,
  id: undefined,
  isLoading: undefined,
  menuWidth: undefined,
  modal: undefined,
  name: undefined,
  placeholder: undefined,
  size: SELECT_SIZES.SMALL,
  value: undefined,
};

export default CreatableSelect;
