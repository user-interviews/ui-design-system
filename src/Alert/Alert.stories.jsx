import React, { Fragment } from 'react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
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
    removeBorderLeft={boolean('removeBorderLeft', false)}
    title={text('Title', 'Success title')}
    type={MessageTypes.SUCCESS}
  />
);

export const Info = () => (
  <Alert
    id="2"
    message={text('Message', 'Info message')}
    removeBorderLeft={boolean('removeBorderLeft', false)}
    title={text('Title', 'Info title')}
    type={MessageTypes.INFO}
  />
);

export const Feature = () => (
  <Alert
    id="3"
    message={text('Message', 'Some context around new feature if needed.')}
    removeBorderLeft={boolean('removeBorderLeft', false)}
    title={text('Title', 'New feature alert!')}
    type={MessageTypes.FEATURE}
  />
);

export const Error = () => (
  <Alert
    id="4"
    message={text('Message', 'Error message')}
    removeBorderLeft={boolean('removeBorderLeft', false)}
    title={text('Title', 'Error title')}
    type={MessageTypes.ERROR}
  />
);

export const Warning = () => (
  <Alert
    id="5"
    message={text('Message', 'Warning message')}
    removeBorderLeft={boolean('removeBorderLeft', false)}
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
    removeBorderLeft={boolean('removeBorderLeft', false)}
    title={text('Title', 'Default title')}
    type={MessageTypes.SUCCESS}
    onDismiss={onDismiss}
  />
);

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
    <FontAwesomeIcon icon={faGoogle} style={{ height: '1rem', marginRight: '0.5rem' }} />
    Connect Google Calendar
  </button>
);

export const WithCallToAction = () => (
  <>
    <p>Default CTA rendered by component</p>
    <Alert
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      id="8"
      message="Success message"
      removeBorderLeft={boolean('removeBorderLeft', false)}
      title="Success title"
      type={MessageTypes.SUCCESS}
      onDismiss={onDismiss}
    />
    <Alert
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      id="9"
      message="Info message"
      removeBorderLeft={boolean('removeBorderLeft', false)}
      title="Info title"
      type={MessageTypes.INFO}
      onDismiss={onDismiss}
    />
    <Alert
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      id="11"
      message="Error message"
      removeBorderLeft={boolean('removeBorderLeft', false)}
      title="Error title"
      type={MessageTypes.ERROR}
      onDismiss={onDismiss}
    />
    <Alert
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      id="12"
      message="Warning message"
      removeBorderLeft={boolean('removeBorderLeft', false)}
      title="Warning title"
      type={MessageTypes.WARNING}
      onDismiss={onDismiss}
    />
    <Alert
      action={{ content: 'Primary action', url: 'https://www.userinterviews.com/' }}
      id="13"
      message="Some context around new feature if needed"
      removeBorderLeft={boolean('removeBorderLeft', false)}
      title="New feature alert!"
      type={MessageTypes.FEATURE}
      onDismiss={onDismiss}
    />

    <p>Custom CTA via <code>message</code> prop</p>
    <Alert
      id="7"
      message={(
        <Fragment>
          <div>When you confirm a session we’ll automatically
            add an event and reminders to your Google Calendar.
          </div>
          <GoogleCalendarButton />
        </Fragment>
      )}
      removeBorderLeft={boolean('removeBorderLeft', false)}
      title={text('Title', 'Connect to Google Calendar to create reminders automatically')}
      type={MessageTypes.ANNOUNCEMENT}
      onDismiss={onDismiss}
    />

    <p>Custom CTA via <code>action</code> prop</p>
    <Alert
      action={<GoogleCalendarButton />}
      id="8"
      message={text('Message', `When you confirm a session we’ll automatically
      add an event and reminders to your Google Calendar.`)}
      removeBorderLeft={boolean('removeBorderLeft', false)}
      title={text('Title', 'Connect to Google Calendar to create reminders automatically')}
      type={MessageTypes.ANNOUNCEMENT}
      onDismiss={onDismiss}
    />
  </>
);
