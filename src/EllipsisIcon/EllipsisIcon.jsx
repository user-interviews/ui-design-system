import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const EllipsisIcon = ({ className }) => (
  <FontAwesomeIcon
    className={classNames(className)}
    icon={faEllipsisV}
  />
);

EllipsisIcon.propTypes = {
  className: PropTypes.string,
};

EllipsisIcon.defaultProps = {
  className: undefined,
};

export default EllipsisIcon;
