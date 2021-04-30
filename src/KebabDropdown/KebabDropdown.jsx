import React from 'react';
import PropTypes from 'prop-types';

import EllipsisIcon from '../EllipsisIcon';

const KebabDropdown = ({
  ariaLabel,
  children,
}) => (
  <span className="dropdown ui-dropdown">
    <button
      aria-expanded="false"
      aria-haspopup="true"
      aria-label={`Open ${ariaLabel}`}
      className="btn btn-link btn-link"
      data-toggle="dropdown"
      type="button"
    >
      <EllipsisIcon />
    </button>
    <span
      aria-label={ariaLabel}
      className="dropdown-menu dropdown-menu-right"
    >
      {children}
    </span>
  </span>
);

KebabDropdown.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default KebabDropdown;
