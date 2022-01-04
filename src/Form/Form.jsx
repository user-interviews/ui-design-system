import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Form.scss';

const Form = forwardRef(({
  action,
  children,
  className,
  CSRFParam,
  CSRFToken,
  id,
  method,
  multipart,
  name,
  onSubmit,
}, ref) => {
  const hasMethod = method != null;
  const hasCSRF = CSRFParam && CSRFToken;
  const isGetFormMethod = method === 'GET';

  return (
    <form
      action={action}
      className={classNames('Form', className)}
      id={id}
      method={isGetFormMethod ? 'GET' : 'POST'}
      multipart={multipart}
      name={name}
      ref={ref}
      onSubmit={onSubmit}
    >
      { hasCSRF && !isGetFormMethod && <input name={CSRFParam} type="hidden" value={CSRFToken} /> }
      { hasMethod && !isGetFormMethod && <input name="_method" type="hidden" value={method} /> }
      {children}
    </form>
  );
});

Form.displayName = 'Form';

Form.propTypes = {
  action: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  CSRFParam: PropTypes.string,
  CSRFToken: PropTypes.string,
  id: PropTypes.string.isRequired,
  method: PropTypes.string,
  multipart: PropTypes.string,
  name: PropTypes.string,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  action: undefined,
  children: undefined,
  className: undefined,
  CSRFParam: undefined,
  CSRFToken: undefined,
  method: undefined,
  multipart: undefined,
  name: undefined,
  onSubmit: undefined,
};

export default Form;
