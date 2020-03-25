import React from 'react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs, text } from '@storybook/addon-knobs';

import CopyToClipboard from '../src/CopyToClipboard/CopyToClipboard';

import { withPadding } from './decorators';

export default {
  title: 'Design System/Copy To Clipboard',
  component: CopyToClipboard,
  decorators: [withA11y, withKnobs({ escapeHTML: false }), withPadding],
};

export const Default = () => (
  <CopyToClipboard
    copyText={text('Copy text', 'Copy me!')}
    trackingEvent="copy-text"
  />
);
