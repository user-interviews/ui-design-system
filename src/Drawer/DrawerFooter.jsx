import React from 'react';
import * as propTypes from 'prop-types';

import Button from 'src/Button';

import './DrawerFooter.scss';

const DrawerFooter = ({
  onPrimaryAction,
  primaryActionDisabled,
  primaryActionIcon,
  primaryActionText,
  primaryActionVariant,
  onSecondaryAction,
  secondaryActionDisabled,
  secondaryActionText,
  children,
}) => (
  <div className="DrawerFooter">
    <div>
      {children}
    </div>
    <div className="DrawerFooter__actions">
      {onSecondaryAction && (
        <Button
          disabled={secondaryActionDisabled}
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
          leadingIcon={primaryActionIcon}
          type="button"
          variant={primaryActionVariant}
        >
          {primaryActionText}
        </Button>
      )}
    </div>
  </div>
);

DrawerFooter.propTypes = {
  children: propTypes.node,
  primaryActionDisabled: propTypes.bool,
  primaryActionIcon: propTypes.object,
  primaryActionText: propTypes.string,
  primaryActionVariant: propTypes.string,
  secondaryActionDisabled: propTypes.bool,
  secondaryActionText: propTypes.string,
  onPrimaryAction: propTypes.func,
  onSecondaryAction: propTypes.func,
};

DrawerFooter.defaultProps = {
  children: undefined,
  onPrimaryAction: undefined,
  primaryActionDisabled: false,
  primaryActionIcon: undefined,
  primaryActionText: undefined,
  primaryActionVariant: undefined,
  onSecondaryAction: undefined,
  secondaryActionDisabled: false,
  secondaryActionText: undefined,
};

export default DrawerFooter;
