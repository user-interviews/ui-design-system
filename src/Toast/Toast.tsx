import classNames from 'classnames';
import React from 'react';

import Alert from '../Alert/Alert';
import FadeTransition from '../FadeTransition';
import { TransitionGroup } from '../TransitionGroup';
import { type Message } from './useToast';

import './Toast.scss';

type ToastProps = {
  autoDismiss?: boolean;
  header?: boolean;
  messages: Message[];
  onToastClosed?: (...args: unknown[]) => unknown;
};

export default function Toast({ autoDismiss, header = true, messages, onToastClosed }: ToastProps) {
  const groupClassNames = classNames('Toast', { 'Toast--no-header': !header });

  return (
    <TransitionGroup aria-live="polite" className={groupClassNames}>
      {messages.map((message) => (
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
      ))}
    </TransitionGroup>
  );
}
