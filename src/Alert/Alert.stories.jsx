import React from 'react';
import { action } from '@storybook/addon-actions';

import { Alert, MessageTypes } from 'src/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import mdx from './Alert.mdx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/global.scss';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    controls: { exclude: [] },
    docs: { page: mdx },
  },
  args: {
    id: '1',
    title: 'Example title',
    message: 'Example message',
    type: MessageTypes.SUCCESS,
    onDismiss: () => alert('alert dismissed'),
  },
  argTypes: {
    message: { control: 'text' },
    title: { control: 'text' },
    type: {
      options: Object.values(MessageTypes),
      mapping: MessageTypes,
      control: { type: 'select' },
    },
  },
};

export const Success = {
  args: {
    type: MessageTypes.SUCCESS,
  },
};

export const Info = {
  args: {
    type: MessageTypes.INFO,
  },
};

export const Feature = {
  args: {
    type: MessageTypes.FEATURE,
  },
};

export const Error = {
  args: {
    type: MessageTypes.ERROR,
  },
};

export const Warning = {
  args: {
    type: MessageTypes.WARNING,
  },
};

const onDismiss = (id) => {
  action('alert dismissed')(id);
};

export const WithDismiss = {
  args: {
    onDismiss,
  },
};

const googleButtonStyle = {
  backgroundColor: '#4285F4',
  border: '1px solid #4285F4',
  borderRadius: '4px',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  lineHeight: '1.25rem',
  margin: '16px 0',
  padding: '8px 16px',
  color: '#FFFFFF',
  whiteSpace: 'nowrap',
};

const GoogleCalendarButton = () => (
  <button style={googleButtonStyle} type="button">
    <FontAwesomeIcon icon={faGoogle} style={{ height: '16px', marginRight: '8px' }} />
    Connect Google Calendar
  </button>
);

export const WithCallToAction = {
  args: {
    action: { content: 'Primary action', url: 'https://www.userinterviews.com/' },
    actionTarget: '_blank',
  },
};

export const WithCustomCallToAction = {
  args: {
    action: <GoogleCalendarButton />,
  },
};
