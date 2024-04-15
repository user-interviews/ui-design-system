import React from 'react';

import CopyToClipboardButton from 'src/CopyToClipboardButton';

export default {
  title: 'Components/Copy To Clipboard Button',
  component: CopyToClipboardButton,
};

export const Default = () => (
  <CopyToClipboardButton
    copyText="Copy me!"
    displayText="Click to copy"
    trackingEvent="copy-text"
  />
);

export const Secondary = () => (
  <CopyToClipboardButton
    copyText="Copy me!"
    displayText="Click to copy"
    trackingEvent="copy-text"
    variant="secondary"
  />
);
