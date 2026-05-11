import React, { forwardRef } from 'react';

import classNames from 'classnames';

import './Form.scss';

export type FormProps = {
  action?: string;
  children?: React.ReactNode;
  className?: string;
  /** Hidden input `name` for CSRF; paired with `CSRFToken`, omitted when `method` is `GET`. */
  CSRFParam?: string;
  /** Hidden input `value` for CSRF; paired with `CSRFParam`, omitted when `method` is `GET`. */
  CSRFToken?: string;
  /** Required `id` on the `<form>`. */
  id: string;
  /** `GET` submits as GET and skips CSRF/`_method` fields; other values render `<form method="POST">` and, when this prop is set, a hidden `_method` carrying the verb. */
  method?: string;
  name?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
};

const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      action,
      children,
      className,
      CSRFParam,
      CSRFToken,
      id,
      method,
      name,
      onSubmit,
    },
    ref,
  ) => {
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
        {hasCSRF && !isGetFormMethod && (
          <input name={CSRFParam} type="hidden" value={CSRFToken} />
        )}
        {hasMethod && !isGetFormMethod && (
          <input name="_method" type="hidden" value={method} />
        )}
        {children}
      </form>
    );
  },
);

Form.displayName = 'Form';

export default Form;
