import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './FormControl.scss';

function addErrorClass(child) {
  if (!child || !child.props) return child;
  const wrappedClassName = classNames(child.props.className, { 'is-invalid': this.hasErrors });

  return cloneElement(child, { className: wrappedClassName });
}

function renderErrors(errors) {
  if (typeof errors === 'string') {
    return errors;
  }

  return (
    <ol className="invalid-feedback__list">
      {
        // eslint-disable-next-line react/no-array-index-key
        errors.map((e, idx) => <li key={idx}>{e}</li>)
      }
    </ol>
  );
}

export default function FormControl(props) {
  const { errors, inputKey } = props;
  const hasErrors = errors[inputKey] && errors[inputKey].length > 0;

  return (
    <div className={classNames('FormControl', props.inputClassName)}>
      {
        Children.map(
          props.children,
          addErrorClass,
          { hasErrors },
        )
      }
      {
        (props.displayErrorText && hasErrors) && (
          <div className="invalid-feedback">
            {renderErrors(errors[inputKey])}
          </div>
        )
      }
      {
        props.description && (
          <div className="form-input__description">
            {props.description}
          </div>
        )
      }
    </div>
  );
}

FormControl.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  displayErrorText: PropTypes.bool,
  errors: PropTypes.object,
  inputClassName: PropTypes.string,
  inputKey: PropTypes.string,
};

FormControl.defaultProps = {
  children: undefined,
  description: '',
  displayErrorText: true,
  errors: {},
  inputClassName: '',
  inputKey: null,
};
