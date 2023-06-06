import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button, { ButtonVariants } from 'src/Button';

const IconButton = ({
 ariaLabel, className, icon, variant, ...props
}) => (
  <Button
    aria-label={ariaLabel}
    className={classnames('IconButton', className)}
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
  variant: PropTypes.string,
};

IconButton.defaultProps = {
  className: undefined,
  variant: ButtonVariants.TRANSPARENT,
};
