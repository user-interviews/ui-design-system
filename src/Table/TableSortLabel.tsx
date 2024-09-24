import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from 'src/font_awesome/solid';

import './TableSortLabel.scss';

function TableSortLabel() {
  return (
    <span className="TableSortLabel">
      <FontAwesomeIcon icon={faSort} />
    </span>
  );
}

export default TableSortLabel;
