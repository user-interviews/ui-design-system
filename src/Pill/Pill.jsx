import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Pill.scss';

const colors = ['blue', 'orange', 'yellow', 'green', 'gray', 'silver'];

const Pill = ({
  color,
  icon,
  id,
  large,
  onClose,
  text,
}) => (
  <span
    className={
      classNames(
        'Pill',
        { [`Pill--${color}`]: !!color },
        { [`Pill--large`]: !!large },
      )
    }
  >
    { icon && (
      <FontAwesomeIcon className="Pill__icon--lead" icon={icon} />
    )}
    {text}
    { onClose && (
    <button className="Pill__button--close" type="button" onClick={() => onClose(id)}> &times;</button>
      )}
  </span>
);

Pill.propTypes = {
  color: PropTypes.oneOf(colors),
  icon: PropTypes.any,
  id: PropTypes.string,
  large: PropTypes.bool,
  text: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

Pill.defaultProps = {
  color: 'blue',
  icon: undefined,
  id: undefined,
  large: undefined,
  onClose: undefined,
};

export default Pill;
