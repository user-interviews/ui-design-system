import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputLabel from 'src/InputLabel';
import InputLegend from 'src/InputLegend';

import 'scss/forms/form_group.scss';

// For accessibility purposes, FormGroups with radio or checkbox groups
// should be rendered as a <fieldset> element.
// All other FormGroups will be rendered as a normal <div> by default.
const FORM_GROUP_ELEMENT_TYPES = ['div', 'fieldset'];

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

export default function FormGroup(props) {
  const { errors, helperText, inputKey } = props;
  const errorMessage = buildErrorMessage(errors[inputKey], props.label);
  const hasErrors = errorMessage && errorMessage.length > 0;

  const isElementTypeFieldset = props.elementType === 'fieldset';
  const isElementTypeDiv = props.elementType === 'div';

  const formGroupChildren = (
    <>
      {isElementTypeFieldset && props.label && (
        <InputLegend
          className={props.labelClassName}
          elementType={props.elementType}
          labelHelperText={props.labelHelperText}
          labelHtmlFor={props.labelHtmlFor}
          required={props.required}
          text={props.label}
          tooltipText={props.labelTooltip}
        />
      )}

      {isElementTypeDiv && props.label && (
        <InputLabel
          className={props.labelClassName}
          elementType={props.elementType}
          labelHelperText={props.labelHelperText}
          labelHtmlFor={props.labelHtmlFor}
          required={props.required}
          text={props.label}
          tooltipText={props.labelTooltip}
        />
      )}

      {
        helperText && !hasErrors && (
          <div className="FormGroup__helper-text">
            {helperText}
          </div>
        )
      }

      {props.children}

      {props.displayErrorText && hasErrors && (
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
    props.elementType,
     {
       className: classNames(
         'FormGroup',
         props.className, {
           'FormGroup--is-invalid': hasErrors,
           'FormGroup--bordered': props.bordered,
           'FormGroup--inline': props.inline,
         },
       ),
       id: props.id,
     },
     formGroupChildren,
   );
}

FormGroup.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  displayErrorText: PropTypes.bool,
  elementType: PropTypes.oneOf(FORM_GROUP_ELEMENT_TYPES),
  errors: PropTypes.object,
  helperText: PropTypes.string,
  id: PropTypes.string,
  inline: PropTypes.bool,
  inputKey: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelHelperText: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  labelTooltip: PropTypes.node,
  required: PropTypes.bool,
};

FormGroup.defaultProps = {
  bordered: undefined,
  children: undefined,
  className: '',
  displayErrorText: true,
  elementType: 'div',
  errors: {},
  helperText: undefined,
  id: undefined,
  inline: false,
  inputKey: null,
  label: '',
  labelClassName: '',
  labelHelperText: undefined,
  labelHtmlFor: '',
  labelTooltip: undefined,
  required: false,
};
