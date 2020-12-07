import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { CopyToClipboard as ReactCopyToClipboard } from 'react-copy-to-clipboard';

import Popper from 'src/Popper';
import TrackedButton from 'src/TrackedButton';

import './CopyToClipboardButton.scss';

function CopyToClipboard(props) {
  const [copied, setCopied] = useState(false);

  const handleClickCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="CopyToClipboardButton">
      <ReactCopyToClipboard text={props.copyText} onCopy={handleClickCopy}>
        <TrackedButton
          className="btn-outline-secondary"
          event={props.trackingEvent}
          type="button"
        >
          <Popper
            dark
            text="Copied!"
            visible={copied}
          >
            <FontAwesomeIcon
              className="CopyToClipboardButton__icon"
              icon={faCopy}
            />
            <span className="CopyToClipboardButton__display-text">
              {props.displayText}
            </span>
          </Popper>
        </TrackedButton>
      </ReactCopyToClipboard>
    </div>
  );
}

CopyToClipboard.propTypes = {
  copyText: PropTypes.string,
  displayText: PropTypes.string,
  trackingEvent: PropTypes.string.isRequired,
};

CopyToClipboard.defaultProps = {
  copyText: '',
  displayText: '',
};

export default CopyToClipboard;
