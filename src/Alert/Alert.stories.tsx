import React, { Fragment } from 'react';
import { action } from '@storybook/addon-actions';

import { Alert, MessageTypes } from 'src/Alert';

import mdx from './Alert.mdx';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Success = () => (
  <Alert
    id="1"
    message="Success message"
    removeBorderLeft={false}
    title="Success title"
    type={MessageTypes.SUCCESS}
  />
);

export const Info = () => (
  <Alert
    id="2"
    message="Info message"
    removeBorderLeft={false}
    title="Info title"
    type={MessageTypes.INFO}
  />
);

export const Feature = () => (
  <Alert
    id="3"
    message="Some context around new feature if needed."
    removeBorderLeft={false}
    title="New feature alert!"
    type={MessageTypes.FEATURE}
  />
);

export const Error = () => (
  <Alert
    id="4"
    message="Error message"
    removeBorderLeft={false}
    title="Error title"
    type={MessageTypes.ERROR}
  />
);

export const Warning = () => (
  <Alert
    id="5"
    message="Warning message"
    removeBorderLeft={false}
    title="Warning title"
    type={MessageTypes.WARNING}
  />
);

const onDismiss = (id) => {
  action('alert dismissed')(id);
};

export const WithDismiss = () => (
  <Alert
    id="6"
    message="Default message"
    removeBorderLeft={false}
    title="Default title"
    type={MessageTypes.SUCCESS}
    onDismiss={onDismiss}
  />
);

export const WithCallToAction = () => (
  <>
    <p>Default CTA rendered by component</p>
    <Alert
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      id="8"
      message="Success message"
      removeBorderLeft={false}
      title="Success title"
      type={MessageTypes.SUCCESS}
      onDismiss={onDismiss}
    />
    <Alert
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      id="9"
      message="Info message"
      removeBorderLeft={false}
      title="Info title"
      type={MessageTypes.INFO}
      onDismiss={onDismiss}
    />
    <Alert
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      id="11"
      message="Error message"
      removeBorderLeft={false}
      title="Error title"
      type={MessageTypes.ERROR}
      onDismiss={onDismiss}
    />
    <Alert
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      id="12"
      message="Warning message"
      removeBorderLeft={false}
      title="Warning title"
      type={MessageTypes.WARNING}
      onDismiss={onDismiss}
    />
    <Alert
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      id="13"
      message="Some context around new feature if needed"
      removeBorderLeft={false}
      title="New feature alert!"
      type={MessageTypes.FEATURE}
      onDismiss={onDismiss}
    />
  </>
);
