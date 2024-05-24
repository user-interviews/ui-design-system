import React from 'react';
import classNames from 'classnames';

import Tooltip from '../Tooltip';

import './input_label.scss';

type LabelProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

export type InputLabelProps = {
  className?: string;
  labelHelperText?: React.ReactNode;
  labelHtmlFor?: string;
  required?: boolean;
  text: string;
  tooltipText?: React.ReactNode;
} & LabelProps;

const InputLabel = ({
  className = '',
  labelHtmlFor = '',
  text,
  required,
  labelHelperText = '',
  tooltipText,
  ...props
}: InputLabelProps) => {
  const inputLabelChildren = (
    <>
      {text}
      {required && <span className="InputLabel__helper-text">&nbsp;(Required)</span>}
      {labelHelperText && <span className="InputLabel__helper-text">&nbsp;({labelHelperText})</span>}
      {tooltipText && <Tooltip iconClasses="Tooltip__icon" placement="right" text={tooltipText} />}
    </>
  );

  return (
    <label
      className={classNames('InputLabel', className)}
      htmlFor={labelHtmlFor}
      {...props}
    >
      {inputLabelChildren}
    </label>
  );
};

export default InputLabel;
