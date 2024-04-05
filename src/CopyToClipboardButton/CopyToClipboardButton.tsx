import React, { useState } from 'react';
import classNames from 'classnames';
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
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
} as const;

type CopyToClipboardButtonProps = {
  copyText?: string;
  displayText?: string;
  trackingEvent: string;
  variant?: 'neutral' | 'secondary';
};

function CopyToClipboardButton({
  copyText = '',
  displayText = undefined,
  trackingEvent,
  variant = ButtonVariants.NEUTRAL,
}: CopyToClipboardButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClickCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="CopyToClipboardButton">
      <CopyToClipboard text={copyText} onCopy={handleClickCopy}>
        <TrackedButton
          aria-label="Copy to clipboard"
          className={classNames(
            'CopyToClipboardButton',
            'btn', {
            'btn-outline-secondary': variant === ButtonVariants.SECONDARY,
            },
          )}
          event={trackingEvent}
          type="button"
        >
          <Popper
            dark
            text="Copied!"
            visible={copied}
          >
            <span>
              <FontAwesomeIcon icon={faCopy as IconDefinition} />
              {displayText && (
                <span className="CopyToClipboardButton__display-text">
                  {displayText}
                </span>
              )}
            </span>
          </Popper>
        </TrackedButton>
      </CopyToClipboard>
    </div>
  );
}

CopyToClipboardButton.defaultProps = {
  copyText: '',
  displayText: undefined,
  variant: ButtonVariants.NEUTRAL,
};

export default CopyToClipboardButton;
