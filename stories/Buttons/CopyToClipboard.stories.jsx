import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';

import CopyToClipboard from 'src/CopyToClipboard';

export default {
  title: 'Design System/Buttons/Copy To Clipboard',
  component: CopyToClipboard,
  decorators: [withKnobs({ escapeHTML: false })],
};

export const Default = () => (
  <CopyToClipboard
    copyText={text('Copy text', 'Copy me!')}
    trackingEvent="copy-text"
  />
);
