import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
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

import Button, { ButtonSizes, ButtonVariants } from 'src/Button';

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
};

const IconButton = ({
 action, ariaLabel, className, icon, isLoading, size, variant, ...props
}) => {
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
        className={classnames('fa-fw', size === ButtonSizes.MEDIUM && 'fa-lg')}
        icon={action ? IconButtonActions[action]?.icon : icon}
      />
    </Button>
  );
};

export default IconButton;

IconButton.propTypes = {
  action: PropTypes.oneOf(Object.keys(IconButtonActions)),
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(ButtonSizes)),
  variant: PropTypes.string,
};

IconButton.defaultProps = {
  action: undefined,
  className: undefined,
  isLoading: false,
  size: ButtonSizes.SMALL,
  variant: ButtonVariants.TRANSPARENT,
};
