import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/pro-regular-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Popper from 'src/Popper';
import TrackedButton from 'src/TrackedButton';

import './CopyToClipboardButton.scss';
import 'scss/buttons.scss';

export const ButtonVariants = {
  NEUTRAL: 'neutral',
  SECONDARY: 'secondary',
};

function CopyToClipboardButton(props) {
  const [copied, setCopied] = useState(false);

  const handleClickCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="CopyToClipboardButton">
      <CopyToClipboard text={props.copyText} onCopy={handleClickCopy}>
        <TrackedButton
          aria-label="Copy to clipboard"
          className={classNames(
            'CopyToClipboardButton',
            'btn', {
            'btn-outline-secondary': props.variant === ButtonVariants.SECONDARY,
            },
          )}
          event={props.trackingEvent}
          type="button"
        >
          <Popper
            dark
            text="Copied!"
            visible={copied}
          >
            <span>
              <FontAwesomeIcon
                icon={faCopy}
              />
              {props.displayText && (
                <span className="CopyToClipboardButton__display-text">
                  {props.displayText}
                </span>
              )}
            </span>
          </Popper>
        </TrackedButton>
      </CopyToClipboard>
    </div>
  );
}

CopyToClipboardButton.propTypes = {
  copyText: PropTypes.string,
  displayText: PropTypes.string,
  trackingEvent: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.values(ButtonVariants)),
};

CopyToClipboardButton.defaultProps = {
  copyText: '',
  displayText: undefined,
  variant: ButtonVariants.NEUTRAL,
};

export default CopyToClipboardButton;
