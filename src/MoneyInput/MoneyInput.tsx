import React from 'react';
import classNames from 'classnames';

import CurrencyInput, { type CurrencyInputProps } from 'react-currency-input-field';

import './MoneyInput.scss';

export type MoneyInputProps = CurrencyInputProps & {
  /**
    Allow decimals in input
  */
  allowDecimals?: boolean;
  /**
    Allow user to enter negative value
  */
  allowNegativeValue?: boolean;
  className?: string;
  defaultValue?: number;
  disabled?: boolean;
  /**
    International locale config
  */
  intlConfig?: object;
  /**
    Maximum characters the user can enter
  */
  maxLength?: number;
  /**
    Placeholder if no value
  */
  placeholder?: string;
  /**
    Include a prefix eg. £ or $
  */
  prefix?: string;
  /**
    Incremental value change on arrow down and arrow up key press
  */
  step?: number;
  /**
    Transform the raw value from the input before parsing. Needs to return string.
  */
  transformRawValue?: (...args: unknown[]) => unknown;
  value?: number;
  onValueChange?: (...args: unknown[]) => unknown;
};

const MoneyInput = ({
  className,
  ...props
}: MoneyInputProps) => (
  <CurrencyInput className={classNames(className, 'MoneyInput', 'form-control')} {...props} />
);

export default MoneyInput;
