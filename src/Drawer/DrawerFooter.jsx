import React from 'react';
import * as propTypes from 'prop-types';

import Button from 'src/Button';

import './DrawerFooter.scss';

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
}) => (
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

DrawerFooter.propTypes = {
  children: propTypes.node,
  isPrimaryActionLoading: propTypes.bool,
  isSecondaryActionLoading: propTypes.bool,
  primaryActionDisabled: propTypes.bool,
  primaryActionIcon: propTypes.object,
  primaryActionLoadingText: propTypes.string,
  primaryActionText: propTypes.string,
  primaryActionVariant: propTypes.string,
  secondaryActionDisabled: propTypes.bool,
  secondaryActionLoadingText: propTypes.string,
  secondaryActionText: propTypes.string,
  onPrimaryAction: propTypes.func,
  onSecondaryAction: propTypes.func,
};

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
