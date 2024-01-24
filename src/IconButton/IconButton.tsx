import React from 'react';
import classnames from 'classnames';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
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

import Button, {
  ButtonSizes,
  ButtonVariants,
  type ButtonProps,
 } from '../Button/Button';

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

type BaseProps = Omit<ButtonProps, 'leadingIcon' | 'trailingIcon'>;

export type IconButtonWithActionProps = BaseProps & {
  action: keyof typeof IconButtonActions;
  ariaLabel?: string;
};

export type IconButtonWithIconProps = BaseProps & {
  ariaLabel: string;
  icon: FontAwesomeIconProps['icon'];
};

export type IconButtonProps = IconButtonWithActionProps | IconButtonWithIconProps;

function IconButton(props: IconButtonWithActionProps): JSX.Element;
function IconButton(props: IconButtonWithIconProps): JSX.Element;
function IconButton({
  className,
  size = ButtonSizes.SMALL,
  variant = ButtonVariants.TRANSPARENT,
  ...props
}: IconButtonProps): JSX.Element {
  const icon = ('action' in props ? IconButtonActions[props.action].icon : props.icon);
  const ariaLabel = 'action' in props ? props.ariaLabel || IconButtonActions[props.action].ariaLabel : props.ariaLabel;

  return (
    <Button
      aria-label={ariaLabel}
      className={classnames('IconButton', className)}
      size={size}
      variant={variant}
    >
      <FontAwesomeIcon
        className={classnames(
          'fa-fw', {
            'fa-lg': size === ButtonSizes.MEDIUM,
          },
        )}
        icon={icon as IconDefinition}
      />
    </Button>
  );
}

export default IconButton;
