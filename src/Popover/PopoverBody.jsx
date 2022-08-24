import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Popover as RBPopover } from 'react-bootstrap';

import './PopoverBody.scss';

const PopoverBody = ({
  children,
  className,
  variant,
  ...props
}) => (
  <RBPopover.Body
    className={classNames(
      className,
      'PopoverBody',
      { 'PopoverBody--card': variant === 'card' },
    )}
    {...props}
  >
    { children }
  </RBPopover.Body>
  );

PopoverBody.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['card']),
};

PopoverBody.defaultProps = {
  className: undefined,
  variant: undefined,
};

export default PopoverBody;
