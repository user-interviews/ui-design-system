import React from 'react';
import CopyToClipboardButton, { ButtonVariants } from 'src/CopyToClipboardButton';

import './CopyToClipboard.scss';

type CopyToClipboardProps = {
  copyText?: string;
  trackingEvent: string;
};

function CopyToClipboard({ copyText = '', trackingEvent }: CopyToClipboardProps) {
  return (
    <div className="CopyToClipboard">
      <span className="CopyToClipboard__copy-text">{copyText}</span>
      <CopyToClipboardButton
        copyText={copyText}
        trackingEvent={trackingEvent}
        variant={ButtonVariants.NEUTRAL}
      />
    </div>
  );
}

export default CopyToClipboard;
