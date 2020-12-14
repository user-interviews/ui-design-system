import React from 'react';
import { withKnobs, radios, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { MessageTypes, AlertMessage } from 'src/Flash';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/global.scss';

export default {
  title: 'Design System/Alerts',
  component: AlertMessage,
  decorators: [withKnobs],
  excludeStories: ['onDismiss']
};

export const onDismiss = (id) => {
  action('alert dismissed')(id);
};
