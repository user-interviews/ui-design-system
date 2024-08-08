import React from 'react';

import CopyToClipboardButton from '.';

export default {
  title: 'Components/Copy To Clipboard Button',
  component: CopyToClipboardButton,
};

export function Default() {
  return (
    <CopyToClipboardButton
      copyText="Copy me!"
      displayText="Click to copy"
      trackingEvent="copy-text"
    />
  );
}

export function Secondary() {
  return (
    <CopyToClipboardButton
      copyText="Copy me!"
      displayText="Click to copy"
      trackingEvent="copy-text"
      variant="secondary"
    />
  );
}
