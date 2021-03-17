import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Pill.scss';

const Pill = ({
  color,
  icon,
  id,
  onClose,
  size,
  text,
}) => (
  <span
    className={
      classNames(
        'Pill',
        { [`Pill--${color}`]: !!color },
        { [`Pill--${size}`]: !!size },
      )
    }
  >
    { icon && (
    <FontAwesomeIcon className="icon--lead" icon={icon} style={{ marginRight: '0.25rem' }} />
      )}
    {text}
    { onClose && (
    <button className="btn--close" type="button" onClick={() => onClose(id)}> &times;</button>
      )}
  </span>
);

Pill.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.any,
  id: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

Pill.defaultProps = {
  color: undefined,
  icon: undefined,
  id: undefined,
  size: undefined,
  onClose: undefined,
};

export default Pill;
