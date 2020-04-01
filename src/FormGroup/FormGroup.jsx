import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InputLabel from 'src/InputLabel';

import './FormGroup.scss';

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

export default function FormGroup(props) {
  const { errors, inputKey } = props;
  const hasErrors = errors[inputKey] && errors[inputKey].length > 0;

  return (
    <div
      className={classNames('FormGroup', props.className, { 'FormGroup--is-invalid': hasErrors })}
      id={props.id}
    >
      {props.label && (
        <InputLabel
          className={props.labelClassName}
          labelHtmlFor={props.labelHtmlFor}
          required={props.required}
          text={props.label}
        />
      )}

      {props.children}

      {props.displayErrorText && hasErrors && (
        <div className="FormGroup__invalid-feedback">
          {renderErrors(errors[inputKey])}
        </div>
      )}

      {
        props.description && (
          <div className="FormGroup__description">
            {props.description}
          </div>
        )
      }
    </div>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  description: PropTypes.string,
  displayErrorText: PropTypes.bool,
  errors: PropTypes.object,
  id: PropTypes.string.isRequired,
  inputKey: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  required: PropTypes.bool,
};

FormGroup.defaultProps = {
  children: undefined,
  className: '',
  description: undefined,
  displayErrorText: true,
  errors: {},
  inputKey: null,
  label: '',
  labelClassName: '',
  labelHtmlFor: '',
  required: false,
};
