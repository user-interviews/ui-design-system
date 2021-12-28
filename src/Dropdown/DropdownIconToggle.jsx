import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';

import './DropdownIconToggle.scss';

const DropdownIconToggle = React.forwardRef(({
  ariaLabel,
  ariaLabelledBy,
  children,
  icon,
  onClick,
}, ref) => (
  <button
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy}
    className="DropdownIconToggle"
    ref={ref}
    type="button"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <FontAwesomeIcon icon={icon} />
    {children}
  </button>
));

DropdownIconToggle.propTypes = {
  ariaLabel: PropTypes.string,
  ariaLabelledBy: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.object,
  onClick: PropTypes.func,
};

DropdownIconToggle.defaultProps = {
  ariaLabel: undefined,
  ariaLabelledBy: undefined,
  children: undefined,
  icon: faEllipsisV,
  onClick: undefined,
};

export default DropdownIconToggle;
