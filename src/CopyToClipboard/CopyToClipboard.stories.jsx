import React from 'react';

import CopyToClipboard from 'src/CopyToClipboard';

export default {
  title: 'Components/Copy To Clipboard',
  component: CopyToClipboard,
};

export const Default = () => (
  <CopyToClipboard
    copyText="Copy me!"
    trackingEvent="copy-text"
  />
);
