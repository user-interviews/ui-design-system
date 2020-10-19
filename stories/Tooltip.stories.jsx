import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';

import Tooltip from 'src/Tooltip';

export default {
  title: 'Design System/Tooltip',
  component: Tooltip,
  decorators: [withKnobs],
};

export const Default = () => (
  <Tooltip
    placement="right"
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
    text={<span>I am html <br/> with a linebreak!</span>}
  />
);

export const GreenIcon = () => (
  <Tooltip
    iconClasses="Tooltip__icon--primary"
    placement="right"
    text={text('Tooltip Text', 'Green Icon')}
  />
);

export const GrayIcon = () => (
  <Tooltip
    iconClasses="Tooltip__icon--gray"
    placement="right"
    text={text('Tooltip Text', 'Gray Icon')}
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
