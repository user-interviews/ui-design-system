import React from 'react';
import classNames from 'classnames';

import { Alert } from 'src/Alert';
import { TransitionGroup } from 'src/TransitionGroup';
import FadeTransition from 'src/FadeTransition';

import './Toast.scss';

type ToastProps = {
  autoDismiss?: boolean;
  header?: boolean;
  messages: {
    action?: {
      content?: string;
      url?: string;
    };
    id?: string;
    message?: string | React.ReactNode;
    title?: string;
    type?: string;
  }[];
  onToastClosed?: (...args: unknown[]) => unknown;
};

export default function Toast(props: ToastProps) {
  const groupClassNames = classNames(
    'Toast',
    { 'Toast--no-header': !props.header },
  );

  return (
    <TransitionGroup
      aria-live="polite"
      className={groupClassNames}
    >
      {
        props.messages.map((message) => (
          <FadeTransition key={message.id}>
            <Alert
              action={message.action}
              autoDismiss={props.autoDismiss}
              id={message.id}
              message={message.message}
              title={message.title}
              type={message.type}
              onDismiss={props.onToastClosed}
            />
          </FadeTransition>
        ))
      }
    </TransitionGroup>
  );
}
