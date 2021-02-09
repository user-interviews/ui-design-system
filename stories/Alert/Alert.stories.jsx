import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { MessageTypes, AlertMessage } from 'src/Flash';
import mdx from './Alert.mdx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/global.scss';

export default {
  title: 'Design System/Alert',
  component: AlertMessage,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Success = () => (
  <AlertMessage
    id="1"
    message={text('Message', 'Default message')}
    title={text('Title', 'Default title')}
    type={MessageTypes.SUCCESS}
  />
);

export const Info = () => (
  <AlertMessage
    id="2"
    message={text('Message', 'Default message')}
    title={text('Title', 'Information')}
    type={MessageTypes.INFO}
  />
);

export const Error = () => (
  <AlertMessage
    id="3"
    message={text('Message', 'Default message')}
    title={text('Title', 'Default title')}
    type={MessageTypes.ERROR}
  />
);

export const Other = () => (
  <AlertMessage
    id="4"
    message={text('Message', 'Default message')}
    title={text('Title', 'Default title')}
    type={MessageTypes.WARNING}
  />
);

const onDismiss = (id) => {
  action('alert dismissed')(id);
};

export const WithDismiss = () => (
  <AlertMessage
    id="5"
    message={text('Message', 'Default message')}
    title={text('Title', 'Default title')}
    type={MessageTypes.SUCCESS}
    onDismiss={onDismiss}
  />
);
