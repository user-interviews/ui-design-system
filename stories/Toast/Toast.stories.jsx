import React from 'react';
import { withKnobs, text, radios } from '@storybook/addon-knobs';

import { MessageTypes } from 'src/Alert';
import { withToast, withToastPropTypes } from 'src/Toast';

import '../../scss/global.scss';

export default {
  title: 'Design System/Toast',
  component: withToast,
  decorators: [withKnobs],
};

const DummyComponent = ({ type, message, setToastMessage }) => (
  <div>
    <p>Click the button to see a toast message.  Use the knobs to try different types!</p>
    <button className="btn btn-primary" type="button" onClick={() => setToastMessage(type, message)}>Submit</button>
  </div>
  );
DummyComponent.propTypes = withToastPropTypes;
const ToastDummyComponent = withToast(DummyComponent);

export const ToastMessage = () => (
  <ToastDummyComponent
    message={text('Message', 'Your action was a success!')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);

const AutoDismissToastComponent = withToast(DummyComponent, { autoDismiss: true });

export const AutoDismissToastMessage = () => (
  <AutoDismissToastComponent
    message={text('Message', 'Your action was a success!')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);
