import React from 'react';
import { withKnobs, text, radios } from '@storybook/addon-knobs';

import { MessageTypes } from 'src/Alert';
import Button from 'src/Button';
import { withToast, withToastPropTypes } from 'src/Toast';

import '../../scss/global.scss';

export default {
  title: 'Design System/Toast',
  component: withToast,
  decorators: [withKnobs],
  parameters: {
    a11y: {},
  },
};

const DummyComponent = ({
 action, type, message, setToastMessage,
}) => (
  <div>
    <p>Click the button to see a toast message.  Use the knobs to try different types!</p>
    <Button variant="primary" onClick={() => setToastMessage(type, message, action)}>Submit</Button>
  </div>
  );
DummyComponent.propTypes = withToastPropTypes;
const ToastDummyComponent = withToast(DummyComponent);

export const Toast = () => (
  <ToastDummyComponent
    message={text('Message', 'Your action was a success!')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);

const ManualDismissToastComponent = withToast(DummyComponent, { autoDismiss: false });

export const ManualDismissToast = () => (
  <ManualDismissToastComponent
    message={text('Message', 'Your action was a success!')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);

export const ToastWithAction = () => (
  <ManualDismissToastComponent
    action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
    message={text('Message', 'Your action was a success!')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);
