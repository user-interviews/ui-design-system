import React from 'react';
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';

import Button from '../Button';

import './DrawerFooter.scss';

type DrawerFooterProps = {
  children?: React.ReactNode;
  isPrimaryActionLoading?: boolean;
  isSecondaryActionLoading?: boolean;
  primaryActionDisabled?: boolean;
  primaryActionIcon?: IconDefinition;
  primaryActionLoadingText?: string;
  primaryActionText?: string;
  primaryActionVariant?: string;
  secondaryActionDisabled?: boolean;
  secondaryActionLoadingText?: string;
  secondaryActionText?: string;
  onPrimaryAction?: () => void;
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
      <div>
        {children}
      </div>
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
