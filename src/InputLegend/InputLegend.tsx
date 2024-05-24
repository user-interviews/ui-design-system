import React from 'react';
import classNames from 'classnames';

import Tooltip from '../Tooltip';

import './InputLegend.scss';

type LegendProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLLegendElement>,
  HTMLLegendElement
>;

export type InputLegendProps = {
  className?: string;
  labelHelperText?: React.ReactNode;
  labelHtmlFor?: string;
  required?: boolean;
  text: string;
  tooltipText?: React.ReactNode;
} & LegendProps;

const InputLegend = ({
  className,
  text,
  required,
  labelHelperText,
  tooltipText,
  ...props
}: InputLegendProps) => {
  const inputLegendChildren = (
    <>
      {text}
      {required && <span className="InputLegend__helper-text">&nbsp;(Required)</span>}
      {labelHelperText && <span className="InputLegend__helper-text">&nbsp;({labelHelperText})</span>}
      {tooltipText && <Tooltip iconClasses="Tooltip__icon" placement="right" text={tooltipText} />}
    </>
  );

  return (
    <legend
      className={classNames('InputLegend', className)}
      {...props}
    >
      {inputLegendChildren}
    </legend>
  );
};

export default InputLegend;
