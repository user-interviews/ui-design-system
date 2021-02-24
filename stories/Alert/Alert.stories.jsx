import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Alert, MessageTypes } from 'src/Alert';
import mdx from './Alert.mdx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/global.scss';

export default {
  title: 'Design System/Alert',
  component: Alert,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Success = () => (
  <Alert
    id="1"
    message={text('Message', 'Success message')}
    title={text('Title', 'Success title')}
    type={MessageTypes.SUCCESS}
  />
);

export const Info = () => (
  <Alert
    id="2"
    message={text('Message', 'Info message')}
    title={text('Title', 'Info title')}
    type={MessageTypes.INFO}
  />
);

export const Announcement = () => (
  <Alert
    id="3"
    message={text('Message', 'Announcement message')}
    title={text('Title', 'Announcement title')}
    type={MessageTypes.ANNOUNCEMENT}
  />
);

export const Error = () => (
  <Alert
    id="4"
    message={text('Message', 'Error message')}
    title={text('Title', 'Error title')}
    type={MessageTypes.ERROR}
  />
);

export const Warning = () => (
  <Alert
    id="5"
    message={text('Message', 'Warning message')}
    title={text('Title', 'Warning title')}
    type={MessageTypes.WARNING}
  />
);

const onDismiss = (id) => {
  action('alert dismissed')(id);
};

export const WithDismiss = () => (
  <Alert
    id="6"
    message={text('Message', 'Default message')}
    title={text('Title', 'Default title')}
    type={MessageTypes.SUCCESS}
    onDismiss={onDismiss}
  />
);
