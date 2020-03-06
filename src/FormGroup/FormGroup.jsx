import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormControl from '../FormControl/FormControl';
import FormLabel from '../FormLabel/FormLabel';

import './FormGroup.scss';

export default function FormGroup(props) {
  return (
    <div className={classNames('FormGroup', props.className)} id={props.id}>
      {props.label && (
        <FormLabel
          className={props.labelClassName}
          labelHtmlFor={props.labelHtmlFor}
          legend={props.legend}
          required={props.required}
          text={props.label}
        />
      )}

      <FormControl
        description={props.description}
        displayErrorText={props.displayErrorText}
        errors={props.errors}
        inputClassName={props.inputClassName}
        inputKey={props.inputKey}
      >
        {props.children}
      </FormControl>
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
  inputClassName: PropTypes.string,
  inputKey: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelHtmlFor: PropTypes.string,
  legend: PropTypes.node,
  required: PropTypes.bool,
};

FormGroup.defaultProps = {
  children: undefined,
  className: '',
  description: '',
  displayErrorText: true,
  errors: {},
  inputClassName: '',
  inputKey: null,
  label: '',
  labelClassName: '',
  labelHtmlFor: '',
  legend: undefined,
  required: false,
};
