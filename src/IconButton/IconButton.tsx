import React from 'react';
import classnames from 'classnames';
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
} from '@fortawesome/pro-regular-svg-icons';
import Button, { type ButtonProps } from '../Button/Button';

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
  {
    action: keyof typeof IconButtonActions;
    ariaLabel?: string;
    icon?: never;
  } | {
    action?: never;
    ariaLabel: string;
    icon: IconDefinition;
  }
) & {
  size?: 'sm' | 'lg';
} & ButtonProps;

const IconButton = ({
  action,
  ariaLabel,
  className,
  icon,
  isLoading,
  size,
  variant,
  ...props
}: IconButtonProps) => {
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
};

export default IconButton;
