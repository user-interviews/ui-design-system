import React from 'react';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './IconCell.scss';

type IconCellProps = {
  icon: IconDefinition;
};

const IconCell = ({
  icon,
}: IconCellProps) => (
  <div className="IconCell">
    <FontAwesomeIcon icon={icon} />
  </div>
);

export default IconCell;
