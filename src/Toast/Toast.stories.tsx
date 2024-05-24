import React from 'react';

import { MessageTypes } from '../Alert';
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

const DummyComponent = ({
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
}) => (
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
const ToastDummyComponent = withToast(DummyComponent);

export const Default = () => (
  <ToastDummyComponent
    message="Your action was a success!"
    title="Title"
    type={MessageTypes.SUCCESS}
  />
);

export const ToastCustomMessage = () => (
  <ToastDummyComponent
    message={(
      <>
        <strong>[Some strong text]</strong> and additional text that is wrapped in a fragment.
      </>
    )}
    title="Normal string title"
    type={MessageTypes.SUCCESS}
  />
);

const ManualDismissToastComponent = withToast(DummyComponent, { autoDismiss: false });

export const ManualDismissToast = () => (
  <ManualDismissToastComponent
    message="Your action was a success!"
    title="Title"
    type={MessageTypes.SUCCESS}
  />
);

export const ToastWithAction = () => (
  <ManualDismissToastComponent
    action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
    message="Your action was a success!"
    title="Title"
    type={MessageTypes.SUCCESS}
  />
);
