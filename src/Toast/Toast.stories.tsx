import React from 'react';

import { AlertType } from '../Alert';
import Button from '../Button';
import { withToast } from '.';
import mdx from './Toast.mdx';

export default {
  title: 'Components/Toast',
  component: withToast,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

function DummyComponent({
  action,
  type,
  message,
  title,
  setToastMessage,
}: {
  action?: {
    content?: string;
    url?: string;
  };
  type: string;
  message: string;
  title: string;
  setToastMessage: ({
    type, message, action, title,
  }) => void;
}) {
  return (
    <div>
      <p>Click the button to see a toast message.</p>
      <Button
        variant="primary"
        onClick={() => setToastMessage({
          type,
          message,
          action,
          title,
        })}
      >
        Submit
      </Button>
    </div>
  );
}
const ToastDummyComponent = withToast(DummyComponent);

export function Default() {
  return (
    <ToastDummyComponent
      message="Your action was a success!"
      title="Title"
      type={AlertType.INFO}
    />
  );
}

export function ToastCustomMessage() {
  return (
    <ToastDummyComponent
      message={(
        <>
          <strong>[Some strong text]</strong> and additional text that is wrapped in a fragment.
        </>
      )}
      title="Normal string title"
      type={AlertType.INFO}
    />
  );
}

const ManualDismissToastComponent = withToast(DummyComponent, { autoDismiss: false });

export function ManualDismissToast() {
  return (
    <ManualDismissToastComponent
      message="Your action was a success!"
      title="Title"
      type={AlertType.INFO}
    />
  );
}

export function ToastWithAction() {
  return (
    <ManualDismissToastComponent
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      message="Your action was a success!"
      title="Title"
      type={AlertType.INFO}
    />
  );
}
