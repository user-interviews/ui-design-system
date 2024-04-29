import React, { createElement } from 'react';
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
        // eslint-disable-next-line react/no-array-index-key
        errors.map((e, idx) => <li key={idx}>{e}</li>)
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
  bordered?: boolean;
  children?: React.ReactNode;
  className?: string;
  displayErrorText?: boolean;
  // For accessibility purposes, FormGroups with radio or checkbox groups
  // should be rendered as a <fieldset> element.
  // All other FormGroups will be rendered as a normal <div> by default.
  elementType?: 'div' | 'fieldset';
  errors?: { [key: string]: React.ReactNode };
  helperText?: React.ReactNode;
  id?: string;
  inline?: boolean;
  inputKey?: string;
  label?: string;
  labelClassName?: string;
  labelHelperText?: string;
  labelHtmlFor?: string;
  labelTooltip?: React.ReactNode;
  required?: boolean;
};

export default function FormGroup({
  bordered,
  children,
  className,
  displayErrorText,
  elementType = 'div',
  errors = {},
  helperText,
  id,
  inline,
  inputKey,
  label,
  labelClassName,
  labelHelperText,
  labelHtmlFor,
  labelTooltip,
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
          elementType={elementType}
          labelHelperText={labelHelperText}
          labelHtmlFor={labelHtmlFor}
          required={required}
          text={label}
          tooltipText={labelTooltip}
        />
      )}

      {isElementTypeDiv && label && (
        <InputLabel
          className={labelClassName}
          elementType={elementType}
          labelHelperText={labelHelperText}
          labelHtmlFor={labelHtmlFor}
          required={required}
          text={label}
          tooltipText={labelTooltip}
        />
      )}

      {
        helperText && !hasErrors && (
          <div className="FormGroup__helper-text">
            {helperText}
          </div>
        )
      }

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
       className: classNames(
         'FormGroup',
         className, {
           'FormGroup--is-invalid': hasErrors,
           'FormGroup--bordered': bordered,
           'FormGroup--inline': inline,
         },
       ),
       id,
     },
     formGroupChildren,
   );
}
