import React, { createElement } from 'react';
import { type FieldErrors, type FieldError } from 'react-hook-form';

import classNames from 'classnames';

import InputLabel from '../InputLabel';
import InputLegend from '../InputLegend';

import './form_group.scss';

function renderErrors(errors) {
  if (typeof errors === 'string') {
    return errors;
  }

  return (
    <ol className="FormGroup__invalid-feedback__list">
      {
        // oxlint-disable-next-line react/no-array-index-key
        errors.map((e, idx) => (
          <li key={idx}>{e}</li>
        ))
      }
    </ol>
  );
}

function buildErrorMessage(errors, label) {
  if (errors) {
    if (errors.message) {
      return errors.message;
    }
    if (errors.type === 'required') {
      return `${label} cannot be left blank.`;
    }
  }
  return errors;
}

export type FormGroupProps = {
  /** Bordered container styling (`FormGroup--bordered`). */
  bordered?: boolean;
  children?: React.ReactNode;
  className?: string;
  /** Shows the invalid feedback region when `errors` resolves to a message (`true` default). */
  displayErrorText?: boolean;
  /** `fieldset` + `InputLegend` for grouped radios/checkboxes; `div` + `InputLabel` otherwise (`div` default). */
  elementType?: 'div' | 'fieldset';
  /** RHF `FieldErrors` map, a single `FieldError`, or keyed messages; resolved with `inputKey` (default `''`). */
  // oxlint-disable-next-line typescript/no-explicit-any
  errors?: { [key: string]: React.ReactNode } | FieldErrors<any> | FieldError;
  /** Helper line under the label and above the controls. */
  helperText?: React.ReactNode;
  /** Root wrapper `id`. */
  id?: string;
  /** Horizontal label/control layout (`FormGroup--inline`). */
  inline?: boolean;
  /** Selects `errors[inputKey]` (falls back to `''`) for `buildErrorMessage` / `id="form-errors-…"`. */
  inputKey?: string;
  /** Label or legend text when paired with `elementType`. */
  label?: React.ReactNode;
  /** Class forwarded to `InputLabel` / `InputLegend`. */
  labelClassName?: string;
  /** Secondary line on the label component. */
  labelHelperText?: string;
  /** `htmlFor` on `InputLabel` when `elementType` is `div`. */
  labelHtmlFor?: string;
  /** Tooltip content on the label component. */
  labelTooltip?: React.ReactNode;
  /** Drops default vertical margin (`FormGroup--no-margin`). */
  noMargin?: boolean;
  /** Marks the label/legend as required. */
  required?: boolean;
};

export default function FormGroup({
  bordered,
  children,
  className = '',
  displayErrorText = true,
  elementType = 'div',
  errors = {},
  helperText,
  id,
  inline,
  inputKey,
  label = '',
  labelClassName = '',
  labelHelperText,
  labelHtmlFor = '',
  labelTooltip,
  noMargin,
  required,
}: FormGroupProps) {
  const errorMessage = buildErrorMessage(errors[inputKey || ''], label);
  const hasErrors = errorMessage && errorMessage.length > 0;

  const isElementTypeFieldset = elementType === 'fieldset';
  const isElementTypeDiv = elementType === 'div';

  const formGroupChildren = (
    <>
      {isElementTypeFieldset && label && (
        <InputLegend
          className={labelClassName}
          labelHelperText={labelHelperText}
          required={required}
          text={label}
          tooltipText={labelTooltip}
        />
      )}

      {isElementTypeDiv && label && (
        <InputLabel
          className={labelClassName}
          labelHelperText={labelHelperText}
          labelHtmlFor={labelHtmlFor}
          required={required}
          text={label}
          tooltipText={labelTooltip}
        />
      )}

      {helperText && <div className="FormGroup__helper-text">{helperText}</div>}

      {children}

      {displayErrorText && hasErrors && (
        <div
          className="FormGroup__invalid-feedback"
          id={`form-errors-${inputKey}`}
        >
          {renderErrors(errorMessage)}
        </div>
      )}
    </>
  );

  return createElement(
    elementType,
    {
      className: classNames('FormGroup', className, {
        'FormGroup--is-invalid': hasErrors,
        'FormGroup--bordered': bordered,
        'FormGroup--inline': inline,
        'FormGroup--no-margin': noMargin,
      }),
      id,
    },
    formGroupChildren,
  );
}
