import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CurrencyInput from 'react-currency-input-field';

import './MoneyInput.scss';

const MoneyInput = ({ className, ...props }) => (
  <CurrencyInput className={classNames(className, 'MoneyInput', 'form-control')} {...props} />
);

MoneyInput.propTypes = {
  /**
    Allow decimals in input
  */
  allowDecimals: PropTypes.bool,
  /**
    Allow user to enter negative value
  */
  allowNegativeValue: PropTypes.bool,
  className: PropTypes.string,
  /**
    Specify decimal scale for padding/trimming eg. 1.5 -> 1.50 or 1.234 -> 1.23 if decimal scale 2
  */
  decimalScale: PropTypes.number,
  /**
    Separator between integer part and fractional part of value
  */
  decimalSeparator: PropTypes.string,
  /**
    Limit length of decimals allowed
  */
  decimalsLimit: PropTypes.number,
  defaultValue: PropTypes.number,
  /**
    Disable abbreviations eg. 1k -> 1,000, 2m -> 2,000,000
  */
  disableAbbreviations: PropTypes.bool,
  disabled: PropTypes.bool,
  /**
    Disable auto adding the group separator between values, eg. 1000 -> 1,000
  */
  disableGroupSeparators: PropTypes.bool,
  /**
    Value will always have the specified length of decimals
  */
  fixedDecimalLength: PropTypes.number,
  /**
    Separator between thousand, million and billion
  */
  groupSeparator: PropTypes.string,
  /**
    International locale config
  */
  intlConfig: PropTypes.object,
  /**
    Maximum characters the user can enter
  */
  maxLength: PropTypes.number,
  /**
    Placeholder if no value
  */
  placeholder: PropTypes.string,
  /**
    Include a prefix eg. £ or $
  */
  prefix: PropTypes.string,
  /**
    Incremental value change on arrow down and arrow up key press
  */
  step: PropTypes.number,
  /**
    Include a suffix eg. € or %
  */
  suffix: PropTypes.string,
  /**
    Transform the raw value from the input before parsing. Needs to return string.
  */
  transformRawValue: PropTypes.func,
  value: PropTypes.number,
  onValueChange: PropTypes.func,
};

MoneyInput.defaultProps = {
  allowDecimals: true,
  allowNegativeValue: true,
  className: undefined,
  defaultValue: undefined,
  value: undefined,
  onValueChange: undefined,
  placeholder: undefined,
  decimalsLimit: 2,
  decimalScale: undefined,
  fixedDecimalLength: undefined,
  prefix: undefined,
  suffix: undefined,
  decimalSeparator: undefined,
  groupSeparator: undefined,
  intlConfig: undefined,
  disabled: false,
  disableAbbreviations: false,
  disableGroupSeparators: false,
  maxLength: undefined,
  step: undefined,
  transformRawValue: undefined,
};

export default MoneyInput;
