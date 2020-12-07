import React from 'react';
import PropTypes from 'prop-types';
import CopyToClipboardButton, { ButtonVariants } from 'src/CopyToClipboardButton';

import './CopyToClipboard.scss';

function CopyToClipboard(props) {
  return (
    <div className="CopyToClipboard">
      <span className="CopyToClipboard__copy-text">{props.copyText}</span>
      <CopyToClipboardButton
        aria-label="Copy to clipboard button"
        copyText={props.copyText}
        trackingEvent={props.trackingEvent}
        variant={ButtonVariants.NEUTRAL}
      />
    </div>
  );
}

CopyToClipboard.propTypes = {
  copyText: PropTypes.string,
  trackingEvent: PropTypes.string.isRequired,
};

CopyToClipboard.defaultProps = {
  copyText: '',
};

export default CopyToClipboard;
