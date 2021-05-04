import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputLabel from 'src/InputLabel';

import 'scss/forms/form_group.scss';

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

  return (
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
      {props.label && (
        <InputLabel
          className={props.labelClassName}
          labelHelperText={props.labelHelperText}
          labelHtmlFor={props.labelHtmlFor}
          required={props.required}
          text={props.label}
          tooltipText={props.labelTooltip}
        />
      )}

      {props.children}

      {props.displayErrorText && hasErrors && (
        <div className="FormGroup__invalid-feedback">
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
    </div>
  );
}

FormGroup.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  displayErrorText: PropTypes.bool,
  errors: PropTypes.object,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputKey: PropTypes.string,
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
  inputKey: null,
  label: '',
  labelClassName: '',
  labelHelperText: undefined,
  labelHtmlFor: '',
  labelTooltip: undefined,
  required: false,
};
