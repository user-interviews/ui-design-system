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
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
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
  disabled: false,
  intlConfig: { locale: 'en-US', currency: 'USD' },
  maxLength: undefined,
  placeholder: undefined,
  prefix: '$ ',
  step: undefined,
  transformRawValue: undefined,
  value: undefined,
  onValueChange: undefined,
};

export default MoneyInput;
