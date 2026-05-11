import React from 'react';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';

import Button from '../Button';

import './DrawerFooter.scss';

type DrawerFooterProps = {
  children?: React.ReactNode;
  /** Primary `Button` `isLoading`. */
  isPrimaryActionLoading?: boolean;
  /** Secondary `Button` `isLoading`. */
  isSecondaryActionLoading?: boolean;
  /** Primary `Button` `disabled`. */
  primaryActionDisabled?: boolean;
  /** Primary `Button` `leadingIcon`. */
  primaryActionIcon?: IconDefinition;
  /** Primary `Button` `loadingText` while loading. */
  primaryActionLoadingText?: string;
  /** Primary `Button` label. */
  primaryActionText?: string;
  /** Primary `Button` `variant`. */
  primaryActionVariant?: string;
  /** Secondary transparent `Button` `disabled`. */
  secondaryActionDisabled?: boolean;
  /** Secondary `Button` `loadingText` while loading. */
  secondaryActionLoadingText?: string;
  /** Secondary `Button` label. */
  secondaryActionText?: string;
  /** Renders the primary button only when set. */
  onPrimaryAction?: () => void;
  /** Renders the secondary button only when set. */
  onSecondaryAction?: () => void;
};

function DrawerFooter({
  children,
  isPrimaryActionLoading = false,
  isSecondaryActionLoading = false,
  primaryActionDisabled = false,
  primaryActionIcon,
  primaryActionLoadingText,
  primaryActionText,
  primaryActionVariant,
  secondaryActionDisabled = false,
  secondaryActionLoadingText,
  secondaryActionText,
  onPrimaryAction,
  onSecondaryAction,
}: DrawerFooterProps) {
  return (
    <div className="DrawerFooter">
      <div>{children}</div>
      <div className="DrawerFooter__actions">
        {onSecondaryAction && (
          <Button
            disabled={secondaryActionDisabled}
            isLoading={isSecondaryActionLoading}
            loadingText={secondaryActionLoadingText}
            type="button"
            variant="transparent"
            onClick={onSecondaryAction}
          >
            {secondaryActionText}
          </Button>
        )}
        {onPrimaryAction && (
          <Button
            disabled={primaryActionDisabled}
            isLoading={isPrimaryActionLoading}
            leadingIcon={primaryActionIcon}
            loadingText={primaryActionLoadingText}
            type="button"
            variant={primaryActionVariant}
            onClick={onPrimaryAction}
          >
            {primaryActionText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default DrawerFooter;
