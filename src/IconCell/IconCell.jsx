import React from 'react';
import propTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './IconCell.scss';

const IconCell = ({
  icon,
}) => (
  <div className="IconCell">
    <FontAwesomeIcon icon={icon} />
  </div>
);

IconCell.propTypes = {
  icon: propTypes.object.isRequired,
};

export default IconCell;
