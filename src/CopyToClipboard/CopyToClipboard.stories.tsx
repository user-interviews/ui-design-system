import React from 'react';

import CopyToClipboard from '.';

export default {
  title: 'Components/Copy To Clipboard',
  component: CopyToClipboard,
};

export function Default() {
  return (
    <CopyToClipboard
      copyText="Copy me!"
      trackingEvent="copy-text"
    />
  );
}
