import React from 'react';
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';

import Button from 'src/Button';

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

const DrawerFooter = ({
  children,
  isPrimaryActionLoading,
  isSecondaryActionLoading,
  primaryActionDisabled,
  primaryActionIcon,
  primaryActionLoadingText,
  primaryActionText,
  primaryActionVariant,
  secondaryActionDisabled,
  secondaryActionLoadingText,
  secondaryActionText,
  onPrimaryAction,
  onSecondaryAction,
}: DrawerFooterProps) => (
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

DrawerFooter.defaultProps = {
  children: undefined,
  isPrimaryActionLoading: false,
  isSecondaryActionLoading: false,
  primaryActionDisabled: false,
  primaryActionIcon: undefined,
  primaryActionLoadingText: undefined,
  primaryActionText: undefined,
  primaryActionVariant: undefined,
  secondaryActionDisabled: false,
  secondaryActionLoadingText: undefined,
  secondaryActionText: undefined,
  onPrimaryAction: undefined,
  onSecondaryAction: undefined,
};

export default DrawerFooter;
