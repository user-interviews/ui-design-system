import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Pill.scss';

export const PILL_COLORS = {
 BLUE: 'blue', ORANGE: 'orange', YELLOW: 'yellow', GREEN: 'green', GRAY: 'gray', SILVER: 'silver',
};

const Pill = ({
  color,
  href,
  icon,
  id,
  onClose,
  text,
}) => (
  href ? (
    <a
      className={
        classNames(
          'Pill',
          { [`Pill--${color}`]: !!color },
        )
      }
      href={href}
    >
      { icon && (
        <FontAwesomeIcon className="Pill__icon--lead" icon={icon} />
      )}
      { text }
      { onClose && (
      <button className="Pill__button--close" type="button" onClick={() => onClose(id)}> &times;</button>
        )}
    </a>
  ) : (
    <span
      className={
        classNames(
          'Pill',
          { [`Pill--${color}`]: !!color },
        )
      }
    >
      { icon && (
        <FontAwesomeIcon className="Pill__icon--lead" icon={icon} />
      )}
      { text }
      { onClose && (
      <button className="Pill__button--close" type="button" onClick={() => onClose(id)}> &times;</button>
        )}
    </span>
  )
);

Pill.propTypes = {
  color: PropTypes.oneOf(Object.values(PILL_COLORS)),
  href: PropTypes.string,
  icon: PropTypes.any,
  id: PropTypes.string,
  text: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

Pill.defaultProps = {
  color: PILL_COLORS.BLUE,
  href: undefined,
  icon: undefined,
  id: undefined,
  onClose: undefined,
};

export default Pill;
