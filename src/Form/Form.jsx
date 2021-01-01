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
  inline,
  method,
  multipart,
  name,
  onSubmit,
}, ref) => {
  const hasMethod = method != null;
  const hasCSRF = CSRFParam && CSRFToken;

  return (
    <form
      action={action}
      className={classNames('Form', className,)}
      id={id}
      method="POST"
      multipart={multipart}
      name={name}
      ref={ref}
      onSubmit={onSubmit}
    >
      { hasCSRF && <input name={CSRFParam} type="hidden" value={CSRFToken} /> }
      { hasMethod && <input name="_method" type="hidden" value={method} /> }
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
  inline: PropTypes.bool,
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
  inline: false,
  method: undefined,
  multipart: undefined,
  name: undefined,
  onSubmit: undefined,
};

export default Form;
