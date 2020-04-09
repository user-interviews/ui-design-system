import React from 'react';
import { withKnobs, radios, text } from '@storybook/addon-knobs';

import { MessageTypes, AlertMessage } from 'src/Flash';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/global.scss';

export default {
  title: 'Design System/Alert',
  component: AlertMessage,
  decorators: [withKnobs],
};

export const alertMessage = () => (
  <AlertMessage
    message={text('Message', 'Default message')}
    showDismiss={false}
    title={text('Title', 'Default title')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);

alertMessage.story = {
  name: 'alert message',
};
