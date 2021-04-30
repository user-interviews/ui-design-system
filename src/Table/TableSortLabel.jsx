import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

import './TableSortLabel.scss';

const TableSortLabel = () => (
  <span className="TableSortLabel">
    <FontAwesomeIcon icon={faSort} />
  </span>
);

export default TableSortLabel;
