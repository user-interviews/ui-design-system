import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, radios, text } from '@storybook/addon-knobs';

import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons';

import Tooltip from 'src/Tooltip';
import mdx from './Tooltip.mdx';

const withContainer = (story) => <div style={{ padding: '4rem' }}>{story()}</div>;

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [withKnobs, withContainer],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <Tooltip
    placement={radios('Placement', ['right', 'top', 'bottom', 'left', 'auto'], 'right')}
    text={text('Tooltip Text', 'Default Tooltip')}
  />
);

export const Light = () => (
  <Tooltip
    placement="right"
    text={text('Tooltip Text', 'Light Tooltip')}
    theme="light"
  />
);

export const WithHeader = () => (
  <Tooltip
    header={text('Header Text', 'Default Header')}
    placement="right"
    text={text('Tooltip Text', 'Tooltip with Header')}
  />
);

export const WithHtml = () => (
  <Tooltip
    header={text('Header Text', 'Default Header')}
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
    text={text('Tooltip Text', 'Neutral Icon')}
  />
);

export const WarningIcon = () => (
  <Tooltip
    icon={faExclamationCircle}
    iconClasses="Tooltip__icon--warning"
    placement="right"
    text={text('Tooltip Text', 'Warning Icon')}
  />
);

export const ErrorIcon = () => (
  <Tooltip
    icon={faExclamationCircle}
    iconClasses="Tooltip__icon--error"
    placement="right"
    text={text('Tooltip Text', 'Error Icon')}
  />
);

export const WithHover = () => (
  <Tooltip
    placement={radios('Placement', ['right', 'top', 'bottom', 'left', 'auto'], 'right')}
    text={text('Tooltip Text', 'Default Tooltip')}
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
    text={text('Tooltip Text', 'Tracked Tooltip')}
    onShow={handleShow}
  />
);
