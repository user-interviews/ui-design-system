import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Popover as RBPopover } from 'react-bootstrap';

import './Popover.scss';

const Popover = React.forwardRef(({
  children,
  className,
  size,
  ...props
}, ref) => (
  <RBPopover
    className={classNames(
      className,
      'Popover',
      { [`Popover--${size}`]: size },
    )}
    ref={ref}
    {...props}
  >
    { children }
  </RBPopover>
));

Popover.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md']),
};

Popover.defaultProps = {
  className: undefined,
  size: undefined,
};

export default Popover;
