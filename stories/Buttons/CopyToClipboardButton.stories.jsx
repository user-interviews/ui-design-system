import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import CopyToClipboardButton from 'src/CopyToClipboardButton';

export default {
  title: 'Design System/Buttons/Copy To Clipboard Button',
  component: CopyToClipboardButton,
  decorators: [withKnobs({ escapeHTML: false })],
};

export const Default = () => (
  <CopyToClipboardButton
    copyText={text('Copy text', 'Copy me!')}
    displayText={text('Display text', 'Click to copy')}
    trackingEvent="copy-text"
  />
);

export const Secondary = () => (
  <CopyToClipboardButton
    copyText={text('Copy text', 'Copy me!')}
    displayText={text('Display text', 'Click to copy')}
    trackingEvent="copy-text"
    variant="secondary"
  />
);
