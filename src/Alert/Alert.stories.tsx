import React, { Fragment } from 'react';
import { action } from 'storybook/actions';

import { Alert, AlertType } from 'src/Alert';

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

export function Info() {
  return (
    <Alert
      id="2"
      message="Info message"
      removeBorderLeft={false}
      title="Info title"
      type={AlertType.INFO}
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
      type={AlertType.FEATURE}
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
      type={AlertType.ERROR}
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
      type={AlertType.WARNING}
    />
  );
}

const onDismiss = (id) => {
  action('alert dismissed')(id);
};

export function WithDismiss() {
  return (
    <Alert
      id="6"
      message="Default message"
      removeBorderLeft={false}
      title="Default title"
      type={AlertType.INFO}
      onDismiss={onDismiss}
    />
  );
}

export function WithCallToAction() {
  return (
    <>
      <p>Default CTA rendered by component</p>
      <Alert
        action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
        id="8"
        message="Success message"
        removeBorderLeft={false}
        title="Success title"
        type={AlertType.INFO}
        onDismiss={onDismiss}
      />
      <Alert
        action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
        id="9"
        message="Info message"
        removeBorderLeft={false}
        title="Info title"
        type={AlertType.INFO}
        onDismiss={onDismiss}
      />
      <Alert
        action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
        id="11"
        message="Error message"
        removeBorderLeft={false}
        title="Error title"
        type={AlertType.ERROR}
        onDismiss={onDismiss}
      />
      <Alert
        action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
        id="12"
        message="Warning message"
        removeBorderLeft={false}
        title="Warning title"
        type={AlertType.WARNING}
        onDismiss={onDismiss}
      />
      <Alert
        action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
        id="13"
        message="Some context around new feature if needed"
        removeBorderLeft={false}
        title="New feature alert!"
        type={AlertType.FEATURE}
        onDismiss={onDismiss}
      />
    </>
  );
}
