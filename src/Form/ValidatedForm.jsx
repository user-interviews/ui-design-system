import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

export default function ValidatedForm(props) {
  const { errors: serverErrors } = props;
  const {
    register,
    control,
    errors,
    handleSubmit,
    setError,
  } = useForm();

  useEffect(() => {
    if (serverErrors) {
      Object.keys(serverErrors)
        .forEach((errorKey) => {
          setError(errorKey, {
            type: 'custom',
            message: serverErrors[errorKey].join(' '),
          });
        });
    }
  }, [serverErrors]);

  return (
    <form
      className={classNames('Form', props.className, { 'Form--inline': props.inline })}
      id={props.id}
      onSubmit={handleSubmit(props.onSubmit)}
    >
      { props.children(register, errors, control) }
    </form>
  );
}

ValidatedForm.propTypes = {
  className: PropTypes.string,
  errors: PropTypes.object,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

ValidatedForm.defaultProps = {
  className: undefined,
  errors: undefined,
  inline: false,
};
