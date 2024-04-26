import React from 'react';
import { action } from '@storybook/addon-actions';

import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';

import Tooltip from 'src/Tooltip';
import mdx from './Tooltip.mdx';

const withContainer = (story) => <div style={{ padding: '4rem' }}>{story()}</div>;

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [withContainer],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Tooltip
    placement="right"
    text="Default Tooltip"
  />
);

export const Light = () => (
  <Tooltip
    placement="right"
    text="Light Tooltip"
    theme="light"
  />
);

export const WithHeader = () => (
  <Tooltip
    header="Default Header"
    placement="right"
    text="Tooltip with Header"
  />
);

export const WithHtml = () => (
  <Tooltip
    header="Default Header"
    placement="right"
    text={(
      <span>
        I am html <br /> with a linebreak!
        And a <a href="#test">link</a>!
      </span>
    )}
  />
);

export const NeutralIcon = () => (
  <Tooltip
    iconClasses="Tooltip__icon--neutral"
    placement="right"
    text="Neutral Icon"
  />
);

export const WarningIcon = () => (
  <Tooltip
    icon={faExclamationTriangle}
    iconClasses="Tooltip__icon--warning"
    placement="right"
    text="Warning Icon"
  />
);

export const ErrorIcon = () => (
  <Tooltip
    icon={faExclamationTriangle}
    iconClasses="Tooltip__icon--error"
    placement="right"
    text="Error Icon"
  />
);

export const WithHover = () => (
  <Tooltip
    placement="right"
    text="Default Tooltip"
    withHover
  />
);

const trackingEvent = {
  event: 'test tracking event',
  eventData: { userId: 1 },
};

const handleShow = () => {
  action('Track toggle open')(trackingEvent);
};

export const WithTracking = () => (
  <Tooltip
    placement="right"
    text="Tracked Tooltip"
    onShow={handleShow}
  />
);
