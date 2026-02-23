import React from "react";
import classNames from "classnames";
import "./ModalHeader.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "../font_awesome/solid";

type ModalHeaderProps = {
  children?: React.ReactNode;
  closingIsDisabled?: boolean;
  subtitle?: string;
  title?: React.ReactNode;
  titleClass?: string;
  titleId?: string;
  variant?: string;
  isSticky?: boolean;
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
  const titleClassName = classNames("ModalHeader__title", titleClass);

  return (
    <header
      className={classNames("ModalHeader", {
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
