import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputLabel from 'src/InputLabel';

import 'scss/forms/form_group.scss';

const FORM_GROUP_INPUT_TYPES = ['input', 'radio', 'checkbox'];

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

  const isCheckboxOrRadioInputType = props.inputType === 'radio' || props.inputType === 'checkbox';

  // For accessibility purposes, FormGroups with radio or checkbox groups
  // will be rendered as a <fieldset>
  const renderFieldset = () => (
    <fieldset
      className={classNames(
        'FormGroup',
        props.className, {
          'FormGroup--is-invalid': hasErrors,
          'FormGroup--bordered': props.bordered,
          'FormGroup--inline': props.inline,
        },
      )}
      id={props.id}
    >
      {formGroupChildren}
    </fieldset>
  );

  // All other FormGroups will be rendered in a normal div
  const renderDiv = () => (
    <div
      className={classNames(
        'FormGroup',
        props.className, {
          'FormGroup--is-invalid': hasErrors,
          'FormGroup--bordered': props.bordered,
          'FormGroup--inline': props.inline,
        },
      )}
      id={props.id}
    >
      {formGroupChildren}
    </div>
  );

  const formGroupChildren = (
    <>
      {props.label && (
        <InputLabel
          className={props.labelClassName}
          elementType={props.inputType}
          labelHelperText={props.labelHelperText}
          labelHtmlFor={props.labelHtmlFor}
          required={props.required}
          text={props.label}
          tooltipText={props.labelTooltip}
        />
      )}

      {props.children}

      {props.displayErrorText && hasErrors && (
        <div
          className="FormGroup__invalid-feedback"
          id={`form-errors-${inputKey}`}
        >
          {renderErrors(errorMessage)}
        </div>
      )}

      {
        helperText && !hasErrors && (
          <div className="FormGroup__helper-text">
            {helperText}
          </div>
        )
      }
    </>
  );

  if (isCheckboxOrRadioInputType) {
    return renderFieldset();
  }
    return renderDiv();
}

FormGroup.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  displayErrorText: PropTypes.bool,
  errors: PropTypes.object,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  inputKey: PropTypes.string,
  inputType: PropTypes.oneOf(FORM_GROUP_INPUT_TYPES),
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelHelperText: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  labelTooltip: PropTypes.string,
  required: PropTypes.bool,
};

FormGroup.defaultProps = {
  bordered: undefined,
  children: undefined,
  className: '',
  displayErrorText: true,
  errors: {},
  helperText: undefined,
  inline: false,
  inputKey: null,
  inputType: undefined,
  label: '',
  labelClassName: '',
  labelHelperText: undefined,
  labelHtmlFor: '',
  labelTooltip: undefined,
  required: false,
};
