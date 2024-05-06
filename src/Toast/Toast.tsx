import React from 'react';
import classNames from 'classnames';

import Alert from '../Alert/Alert';
import { type Message } from './useToast';
import { TransitionGroup } from '../TransitionGroup';
import FadeTransition from '../FadeTransition';

import './Toast.scss';

type ToastProps = {
  autoDismiss?: boolean;
  header?: boolean;
  messages: Message[];
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
              action={message.action ?? undefined}
              autoDismiss={props.autoDismiss}
              id={message.id ?? ''}
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
