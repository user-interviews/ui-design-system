import React from 'react';

import classNames from 'classnames';

import Button from '../Button';

import './ModalFooter.scss';

type ModalFooterProps = {
  children?: React.ReactNode;
  /** Disables the dismiss control when `onRequestClose` is set. */
  closingIsDisabled?: boolean;
  /** Cancel button label (`Cancel` default). */
  dismissButtonText?: string;
  /** Sticky footer positioning class (`false` default). */
  isSticky?: boolean;
  /** Invoked with no arguments on dismiss click (not an event handler). */
  onRequestClose?: (...args: unknown[]) => unknown;
};

// Don’t pass event to props callback; the callback is not always called from
// event listeners:
export default function ModalFooter({
  children,
  closingIsDisabled,
  dismissButtonText,
  isSticky = false,
  onRequestClose,
}: ModalFooterProps) {
  const handleCloseClick = () => onRequestClose && onRequestClose();

  const btnText = dismissButtonText ?? 'Cancel';

  return (
    <div
      className={classNames('ModalFooter', { ModalFooter__sticky: isSticky })}
    >
      {onRequestClose && (
        <Button
          disabled={closingIsDisabled}
          type="button"
          variant="transparent"
          onClick={handleCloseClick}
        >
          {btnText}
        </Button>
      )}
      {children}
    </div>
  );
}
