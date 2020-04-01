import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { CopyToClipboard as ReactCopyToClipboard } from 'react-copy-to-clipboard';

import Popper from 'src/Popper';
import TrackedButton from 'src/TrackedButton';

import './CopyToClipboard.scss';

function CopyToClipboard(props) {
  const [copied, setCopied] = useState(false);

  const handleClickCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="CopyToClipboard">
      <span className="CopyToClipboard__copy-text">{props.copyText}</span>
      <ReactCopyToClipboard text={props.copyText} onCopy={handleClickCopy}>
        <TrackedButton
          className="btn btn-link btn-link--neutral"
          event={props.trackingEvent}
          type="button"
        >
          <Popper
            dark
            text="Copied!"
            visible={copied}
          >
            <FontAwesomeIcon icon={faCopy} />
          </Popper>
        </TrackedButton>
      </ReactCopyToClipboard>
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
