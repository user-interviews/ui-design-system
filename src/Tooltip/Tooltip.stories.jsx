import React from 'react';
import { fn } from '@storybook/test';

import { faExclamationTriangle } from '../font_awesome/solid';

import Tooltip from '.';
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

export function Default() {
  return (
    <Tooltip
      placement="right"
      text="Default Tooltip"
    />
  );
}

export function Light() {
  return (
    <Tooltip
      placement="right"
      text="Light Tooltip"
      theme="light"
    />
  );
}

export function WithHeader() {
  return (
    <Tooltip
      header="Default Header"
      placement="right"
      text="Tooltip with Header"
    />
  );
}

export function WithHtml() {
  return (
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
}

export function NeutralIcon() {
  return (
    <Tooltip
      iconClasses="Tooltip__icon--neutral"
      placement="right"
      text="Neutral Icon"
    />
  );
}

export function WarningIcon() {
  return (
    <Tooltip
      icon={faExclamationTriangle}
      iconClasses="Tooltip__icon--warning"
      placement="right"
      text="Warning Icon"
    />
  );
}

export function ErrorIcon() {
  return (
    <Tooltip
      icon={faExclamationTriangle}
      iconClasses="Tooltip__icon--error"
      placement="right"
      text="Error Icon"
    />
  );
}

export function WithHover() {
  return (
    <Tooltip
      placement="right"
      text="Default Tooltip"
      withHover
    />
  );
}

const trackingEvent = {
  event: 'test tracking event',
  eventData: { userId: 1 },
};

const handleShow = fn();

export function WithTracking() {
  return (
    <Tooltip
      placement="right"
      text="Tracked Tooltip"
      onShow={handleShow}
    />
  );
}
