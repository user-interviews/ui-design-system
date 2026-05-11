import React from 'react';

import classNames from 'classnames';

import Tooltip from '../Tooltip';

import './input_label.scss';

type LabelProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

export type InputLabelProps = {
  className?: string;
  /** Shown in parentheses after the label text. */
  labelHelperText?: React.ReactNode;
  /** Passed to `htmlFor` to associate with an input `id`. */
  labelHtmlFor?: string;
  /** Appends “(Required)” helper copy. */
  required?: boolean;
  /** Primary label text. */
  text: React.ReactNode;
  /** Renders a trailing `Tooltip` with right placement. */
  tooltipText?: React.ReactNode;
} & LabelProps;

function InputLabel({
  className = '',
  labelHtmlFor = '',
  text,
  required,
  labelHelperText = '',
  tooltipText,
  ...props
}: InputLabelProps) {
  const inputLabelChildren = (
    <>
      {text}
      {required && (
        <span className="InputLabel__helper-text">&nbsp;(Required)</span>
      )}
      {labelHelperText && (
        <span className="InputLabel__helper-text">
          &nbsp;({labelHelperText})
        </span>
      )}
      {tooltipText && (
        <Tooltip
          iconClasses="Tooltip__icon"
          placement="right"
          text={tooltipText}
        />
      )}
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
}

export default InputLabel;
