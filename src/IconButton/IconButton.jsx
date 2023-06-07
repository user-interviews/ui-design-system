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
};

const IconButton = ({
 action, ariaLabel, className, icon, size, variant, ...props
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
      size={size}
      variant={variant}
      {...props}
    >
      <FontAwesomeIcon className="fa-fw" icon={action ? IconButtonActions[action]?.icon : icon} />
    </Button>
  );
};

export default IconButton;

IconButton.propTypes = {
  action: PropTypes.oneOf(Object.keys(IconButtonActions)),
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.object.isRequired,
  size: PropTypes.oneOf(Object.values(ButtonSizes)),
  variant: PropTypes.string,
};

IconButton.defaultProps = {
  action: undefined,
  className: undefined,
  size: ButtonSizes.SMALL,
  variant: ButtonVariants.TRANSPARENT,
};
