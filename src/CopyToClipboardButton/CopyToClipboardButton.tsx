import React, { useState } from 'react';
import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCopy } from '../font_awesome/regular';

import TrackedButton from '../TrackedButton';
import Popper from '../Popper';

import './CopyToClipboardButton.scss';

export const ButtonVariants = {
  NEUTRAL: 'neutral',
  SECONDARY: 'secondary',
} as const;

type CopyToClipboardButtonProps = {
  copyText?: string;
  displayText?: string;
  trackingEvent: string;
  variant?: typeof ButtonVariants[keyof typeof ButtonVariants];
};

function CopyToClipboardButton({
  copyText = '',
  displayText,
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
            'btn',
{
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

export default CopyToClipboardButton;
