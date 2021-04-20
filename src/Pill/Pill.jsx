import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Pill.scss';

const colors = ['blue', 'orange', 'yellow', 'green', 'gray', 'silver'];

const Pill = ({
  color,
  href,
  icon,
  id,
  large,
  onClose,
  text,
}) => (
  href ? (
    <a
      className={
        classNames(
          'Pill',
          { [`Pill--${color}`]: !!color },
          { [`Pill--large`]: !!large },
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
          { [`Pill--large`]: !!large },
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
  color: PropTypes.oneOf(colors),
  href: PropTypes.string,
  icon: PropTypes.any,
  id: PropTypes.string,
  large: PropTypes.bool,
  text: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

Pill.defaultProps = {
  color: 'blue',
  href: undefined,
  icon: undefined,
  id: undefined,
  large: undefined,
  onClose: undefined,
};

export default Pill;
