import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';

import './Pill.scss';

export const PILL_COLORS = {
 BLUE: 'blue', ORANGE: 'orange', YELLOW: 'yellow', RED: 'red', GREEN: 'green', GRAY: 'gray', SILVER: 'silver',
};

const Pill = ({
  children,
  color,
  icon,
  id,
  onClose,
  text,
  ...props
}) => (
  <span
    className={
        classNames(
          'Pill',
          {
            [`Pill--${color}`]: !!color,
            [`Pill--closeable`]: !!onClose,
          },
        )
      }
    {...props}
  >
    { icon && (
    <FontAwesomeIcon className="Pill__icon--lead" icon={icon} />
      )}
    { children }
    { text }
    { onClose && (
      <button
        aria-label={`Remove ${text}`}
        className="Pill__button--close"
        type="button"
        onClick={() => onClose(id)}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
        )}
  </span>
  );

Pill.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(Object.values(PILL_COLORS)),
  icon: PropTypes.any,
  id: PropTypes.string,
  text: PropTypes.node,
  onClose: PropTypes.func,
};

Pill.defaultProps = {
  children: undefined,
  color: PILL_COLORS.BLUE,
  icon: undefined,
  id: undefined,
  text: undefined,
  onClose: undefined,
};

export default Pill;
