import React from "react";
import Button from "../Button";
import "./ModalFooter.scss";
import classNames from "classnames";

type ModalFooterProps = {
  children?: React.ReactNode;
  closingIsDisabled?: boolean;
  dismissButtonText?: string;
  isSticky?: boolean;
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

  const btnText = dismissButtonText ?? "Cancel";

  return (
    <div
      className={classNames("ModalFooter", { ModalFooter__sticky: isSticky })}
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
