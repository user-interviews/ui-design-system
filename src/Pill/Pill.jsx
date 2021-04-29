import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Pill.scss';

export const PILL_COLORS = {
 BLUE: 'blue', ORANGE: 'orange', YELLOW: 'yellow', GREEN: 'green', GRAY: 'gray', SILVER: 'silver',
};

const Pill = ({
  children,
  color,
  icon,
  id,
  onClose,
  ...props
}) => (
  <span
    className={
        classNames(
          'Pill',
          { [`Pill--${color}`]: !!color },
        )
      }
    {...props}
  >
    { icon && (
    <FontAwesomeIcon className="Pill__icon--lead" icon={icon} />
      )}
    { children }
    { onClose && (
      <button className="Pill__button--close" type="button" onClick={() => onClose(id)}> &times;</button>
        )}
  </span>
  );

Pill.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(Object.values(PILL_COLORS)),
  icon: PropTypes.any,
  id: PropTypes.string,
  onClose: PropTypes.func,
};

Pill.defaultProps = {
  color: PILL_COLORS.BLUE,
  icon: undefined,
  id: undefined,
  onClose: undefined,
};

export default Pill;
