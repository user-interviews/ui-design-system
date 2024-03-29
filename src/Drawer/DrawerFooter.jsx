import React from 'react';
import * as propTypes from 'prop-types';

import Button from 'src/Button';
import {
 Dropdown, DropdownToggle, DropdownItem, DropdownMenu,
} from 'src/Dropdown';

import './DrawerFooter.scss';

const DrawerFooter = ({
  children,
  additionalPrimaryActions,
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
}) => {
  const isDropdownToggle = !!additionalPrimaryActions.length;

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
        {!isDropdownToggle && onPrimaryAction && (
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
        {isDropdownToggle && (
          <Dropdown>
            <DropdownToggle>{primaryActionText}</DropdownToggle>
            <DropdownMenu>
              {additionalPrimaryActions.map((action) => (
                <DropdownItem
                  disabled={action.disabled}
                  key={action.text}
                  leadingIcon={action.leadingIcon}
                  trailingIcon={action.trailingIcon}
                  onClick={action.onClick}
                >
                  {action.text}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

DrawerFooter.propTypes = {
  additionalPrimaryActions: propTypes.arrayOf(
    propTypes.shape({
      disabled: propTypes.bool,
      leadingIcon: propTypes.object,
      text: propTypes.string.isRequired,
      trailingIcon: propTypes.object,
      onClick: propTypes.func.isRequired,
    }),
  ),
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
  additionalPrimaryActions: [],
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
