import React from 'react';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './IconCell.scss';

export type IconCellProps = {
  icon: IconDefinition;
};

function IconCell({
  icon,
}: IconCellProps) {
  return (
    <div className="IconCell">
      <FontAwesomeIcon icon={icon} />
    </div>
  );
}

export default IconCell;
