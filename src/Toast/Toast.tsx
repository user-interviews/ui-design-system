import React from 'react';
import classNames from 'classnames';

import { Alert } from '../Alert';
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

export default function Toast({
  autoDismiss,
  header = true,
  messages,
  onToastClosed,
}: ToastProps) {
  const groupClassNames = classNames(
    'Toast',
    { 'Toast--no-header': !header },
  );

  return (
    <TransitionGroup
      aria-live="polite"
      className={groupClassNames}
    >
      {
        messages.map((message) => (
          <FadeTransition key={message.id}>
            <Alert
              action={message.action ?? undefined}
              autoDismiss={autoDismiss}
              id={message.id ?? ''}
              message={message.message}
              title={message.title}
              type={message.type}
              onDismiss={onToastClosed}
            />
          </FadeTransition>
        ))
      }
    </TransitionGroup>
  );
}
