import React from 'react';
import Button from 'src/Button';
import { Dropdown, DropdownMenu } from 'src/Dropdown';
import PropTypes from 'prop-types';

import './DrawerDropdownToggleFooter.scss';

export function DrawerDropdownToggleFooter({
  children,
  isSecondaryActionLoading,
  renderDropdownToggle,
  renderDropdownItems,
  secondaryActionDisabled,
  secondaryActionLoadingText,
  secondaryActionText,
  onSecondaryAction,
}) {
	const dropdownToggle = renderDropdownToggle({
	  variant: 'primary',
	});

  const dropdownItems = renderDropdownItems();

  return (
    <div className="DrawerDropdownToggleFooter">
      <div>
        {children}
      </div>
      <div className="DrawerDropdownToggleFooter__actions">
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
        <Dropdown>
          {dropdownToggle}
          <DropdownMenu>
            {dropdownItems}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

DrawerDropdownToggleFooter.propTypes = {
  children: PropTypes.node,
  isSecondaryActionLoading: PropTypes.bool,
  renderDropdownItems: PropTypes.func.isRequired,
  renderDropdownToggle: PropTypes.func.isRequired,
  secondaryActionDisabled: PropTypes.bool,
  secondaryActionLoadingText: PropTypes.string,
  secondaryActionText: PropTypes.string,
  onSecondaryAction: PropTypes.func,
};

DrawerDropdownToggleFooter.defaultProps = {
  children: undefined,
  isSecondaryActionLoading: false,
  secondaryActionDisabled: false,
  secondaryActionLoadingText: undefined,
  secondaryActionText: undefined,
  onSecondaryAction: undefined,
};
