import React from 'react';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import Button, { type ButtonProps } from '../Button/Button';
import {
  faPlusCircle,
  faMinusCircle,
  faTrashAlt,
  faCopy,
  faChevronLeft,
  faChevronRight,
  faPencil,
  faTimes,
  faExpandAlt,
} from '../font_awesome/regular';

export const IconButtonActions = {
  ADD: {
    ariaLabel: 'Add',
    icon: faPlusCircle,
  },
  SUBTRACT: {
    ariaLabel: 'Subtract',
    icon: faMinusCircle,
  },
  EDIT: {
    ariaLabel: 'Edit',
    icon: faPencil,
  },
  DELETE: {
    ariaLabel: 'Delete',
    icon: faTrashAlt,
  },
  COPY: {
    ariaLabel: 'Copy',
    icon: faCopy,
  },
  NEXT: {
    ariaLabel: 'Next',
    icon: faChevronRight,
  },
  PREVIOUS: {
    icon: faChevronLeft,
    ariaLabel: 'Previous',
  },
  CLOSE: {
    icon: faTimes,
    ariaLabel: 'Close',
  },
  EXPAND: {
    icon: faExpandAlt,
    ariaLabel: 'Expand',
  },
} as const;

export type IconButtonProps = (
  | {
      /** Preset icon + default `aria-label` (override label with `ariaLabel`). */
      action: keyof typeof IconButtonActions;
      ariaLabel?: string;
      icon?: never;
    }
  | {
      action?: never;
      /** Required when not using `action`. */
      ariaLabel: string;
      icon: IconDefinition;
    }
) & {
  /** `sm` (default) or `lg` icon button sizing. */
  size?: 'sm' | 'lg';
} & ButtonProps;

function IconButton({
  action,
  ariaLabel,
  className,
  icon,
  isLoading,
  size = 'sm',
  variant = 'transparent',
  ...props
}: IconButtonProps) {
  const getAriaLabel = () => {
    if (action) {
      return ariaLabel || IconButtonActions[action]?.ariaLabel;
    }
    return ariaLabel;
  };

  return (
    <Button
      aria-label={getAriaLabel()}
      className={classnames('IconButton', className)}
      isLoading={isLoading}
      loadingText=""
      size={size}
      variant={variant}
      {...props}
    >
      <FontAwesomeIcon
        className={classnames('fa-fw')}
        icon={action ? IconButtonActions[action]?.icon : icon}
      />
    </Button>
  );
}

export default IconButton;
