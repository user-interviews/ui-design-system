import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button, { ButtonSizes, ButtonVariants } from 'src/Button';

const IconButton = ({
 ariaLabel, className, icon, size, variant, ...props
}) => (
  <Button
    aria-label={ariaLabel}
    className={classnames('IconButton', className)}
    size={size}
    variant={variant}
    {...props}
  >
    <FontAwesomeIcon icon={icon} />
  </Button>
);

export default IconButton;

IconButton.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.object.isRequired,
  size: PropTypes.oneOf(Object.values(ButtonSizes)),
  variant: PropTypes.string,
};

IconButton.defaultProps = {
  className: undefined,
  size: ButtonSizes.SMALL,
  variant: ButtonVariants.TRANSPARENT,
};
