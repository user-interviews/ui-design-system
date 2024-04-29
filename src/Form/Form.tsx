import React, { forwardRef } from 'react';
import classNames from 'classnames';

import './Form.scss';

export type FormProps = {
  action?: string;
  children?: React.ReactNode;
  className?: string;
  CSRFParam?: string;
  CSRFToken?: string;
  id: string;
  method?: string;
  name?: string;
  onSubmit?: (...args: unknown[]) => unknown;
};

const Form = forwardRef<HTMLFormElement, FormProps>(({
  action,
  children,
  className,
  CSRFParam,
  CSRFToken,
  id,
  method,
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

export default Form;
