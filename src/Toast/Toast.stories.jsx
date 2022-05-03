import React from 'react';
import { withKnobs, text, radios } from '@storybook/addon-knobs';

import { MessageTypes } from 'src/Alert';
import Button from 'src/Button';
import { withToast, withToastPropTypes } from 'src/Toast';

import '../../scss/global.scss';

export default {
  title: 'Components/Toast',
  component: withToast,
  decorators: [withKnobs],
};

const DummyComponent = ({
 action, type, message, title, setToastMessage,
}) => (
  <div>
    <p>Click the button to see a toast message.  Use the knobs to try different types!</p>
    <Button variant="primary" onClick={() => setToastMessage(type, message, action, title)}>Submit</Button>
  </div>
  );
DummyComponent.propTypes = withToastPropTypes;
const ToastDummyComponent = withToast(DummyComponent);

export const Toast = () => (
  <ToastDummyComponent
    message={text('Message', 'Your action was a success!')}
    title={text('Title', 'Title')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);

export const ToastCustomMessage = () => (
  <ToastDummyComponent
    message={(
      <>
        <strong>[Some strong text]</strong> and additional text that is wrapped in a fragment.
      </>
    )}
    title={text('Title', 'Normal string title')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);

const ManualDismissToastComponent = withToast(DummyComponent, { autoDismiss: false });

export const ManualDismissToast = () => (
  <ManualDismissToastComponent
    message={text('Message', 'Your action was a success!')}
    title={text('Title', 'Title')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);

export const ToastWithAction = () => (
  <ManualDismissToastComponent
    action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
    message={text('Message', 'Your action was a success!')}
    title={text('Title', 'Title')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);
