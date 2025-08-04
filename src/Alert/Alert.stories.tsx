import React, { Fragment } from 'react';

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

export function Success() {
  return (
    <Alert
      id="1"
      message="Success message"
      removeBorderLeft={false}
      title="Success title"
      type={MessageTypes.SUCCESS}
    />
  );
}

export function Info() {
  return (
    <Alert
      id="2"
      message="Info message"
      removeBorderLeft={false}
      title="Info title"
      type={MessageTypes.INFO}
    />
  );
}

export function Feature() {
  return (
    <Alert
      id="3"
      message="Some context around new feature if needed."
      removeBorderLeft={false}
      title="New feature alert!"
      type={MessageTypes.FEATURE}
    />
  );
}

export function Error() {
  return (
    <Alert
      id="4"
      message="Error message"
      removeBorderLeft={false}
      title="Error title"
      type={MessageTypes.ERROR}
    />
  );
}

export function Warning() {
  return (
    <Alert
      id="5"
      message="Warning message"
      removeBorderLeft={false}
      title="Warning title"
      type={MessageTypes.WARNING}
    />
  );
}

export function WithDismiss() {
  return (
    <Alert
      id="6"
      message="Default message"
      removeBorderLeft={false}
      title="Default title"
      type={MessageTypes.SUCCESS}  
      onDismiss={() => {}}
    />
  );
}

export function WithCallToAction() {
  return (
    <Alert
      id="7"
      message="Alert with call to action"
      removeBorderLeft={false}
      title="CTA title"
      type={MessageTypes.INFO}
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      onDismiss={() => {}}
    />
  );
}
