import React from 'react';
import { withKnobs, radios, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { MessageTypes, AlertMessage } from 'src/Flash';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/global.scss';

export default {
  title: 'Design System/Alert',
  component: AlertMessage,
  decorators: [withKnobs],
};

export const WithoutDismiss = () => (
  <AlertMessage
    id="1"
    message={text('Message', 'Default message')}
    title={text('Title', 'Default title')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
  />
);

const onDismiss = (id) => {
  action('alert dismissed')(id);
};

export const WithDismiss = () => (
  <AlertMessage
    id="1"
    message={text('Message', 'Default message')}
    title={text('Title', 'Default title')}
    type={radios('Message Type', MessageTypes, MessageTypes.SUCCESS)}
    onDismiss={onDismiss}
  />
);
