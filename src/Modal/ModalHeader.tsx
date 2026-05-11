import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { faExclamationTriangle } from '../font_awesome/solid';

import './ModalHeader.scss';

type ModalHeaderProps = {
  /** When set, replaces the built-in `h1` / subtitle layout entirely. */
  children?: React.ReactNode;
  /** Disables the close button when `onRequestClose` is set. */
  closingIsDisabled?: boolean;
  /** Secondary heading under `title` when not using `children`. */
  subtitle?: string;
  /** Primary heading when not using `children`. */
  title?: React.ReactNode;
  /** Extra classes merged onto the default `h1`. */
  titleClass?: string;
  /** `id` on the default `h1` for `aria-labelledby`. */
  titleId?: string;
  /** When truthy, shows a warning icon with this string as its `className`. */
  variant?: string;
  /** Sticky header positioning (`false` default). */
  isSticky?: boolean;
  /** Invoked with no arguments on close click (not an event handler). */
  onRequestClose?: (...args: unknown[]) => unknown;
};

// Don’t pass event to props callback; the callback is not always called from
// event listeners:
export default function ModalHeader({
  children,
  closingIsDisabled,
  subtitle,
  title,
  titleClass,
  titleId,
  variant,
  isSticky = false,
  onRequestClose,
}: ModalHeaderProps) {
  const handleCloseClick = () => onRequestClose && onRequestClose();
  const titleClassName = classNames('ModalHeader__title', titleClass);

  return (
    <header
      className={classNames('ModalHeader', {
        ModalHeader__sticky: isSticky,
      })}
    >
      <div className="ModalHeader__heading">
        {children ? (
          children
        ) : (
          <>
            <h1 className={titleClassName} id={titleId}>
              {variant && (
                <FontAwesomeIcon
                  className={variant}
                  icon={faExclamationTriangle}
                />
              )}
              {title}
            </h1>
            {subtitle && <h2 className="ModalHeader__subtitle">{subtitle}</h2>}
          </>
        )}
      </div>
      {onRequestClose && (
        <button
          aria-label="Close"
          className="btn btn-sm btn-close"
          disabled={closingIsDisabled}
          type="button"
          onClick={handleCloseClick}
        />
      )}
    </header>
  );
}
