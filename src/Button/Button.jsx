import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Button.scss';

const Button = ({
  children,
  name,
  type,
  onClick,
  startIcon,
  endIcon,
  ...props
}) => (
  <button
    className={classNames('Button')}
    name={name}
    type={type}
    onClick={onClick}
    {...props}
  >
    {startIcon && (
      <span className="Button__startIcon">
        <FontAwesomeIcon icon={startIcon} />
      </span>
    )}
    {children}
    {endIcon && (
      <span className="Button__endIcon">
        <FontAwesomeIcon icon={endIcon} />
      </span>
    )}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  endIcon: PropTypes.node,
  name: PropTypes.string,
  startIcon: PropTypes.node,
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  endIcon: undefined,
  name: undefined,
  startIcon: undefined,
  type: 'button',
  onClick: undefined,
};

export default Button;
