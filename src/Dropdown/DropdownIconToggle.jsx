import React from 'react';
import PropTypes from 'prop-types';

import Button from 'src/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';

const DropdownIconToggle = React.forwardRef(({
  ariaLabel,
  ariaLabelledBy,
  children,
  icon,
  onClick,
}, ref) => (
  <Button
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    className="DropdownIconToggle"
    ref={ref}
    type="button"
    variant="transparent"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <FontAwesomeIcon icon={icon} size="lg" />
    {children}
  </Button>
));

DropdownIconToggle.propTypes = {
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  icon: PropTypes.object,
  onClick: PropTypes.func,
};

DropdownIconToggle.defaultProps = {
  ariaLabel: 'icon toggle dropdown',
  ariaLabelledBy: undefined,
  icon: faEllipsisV,
  onClick: undefined,
};

export default DropdownIconToggle;
