import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Popover as RBPopover } from 'react-bootstrap';

import './Popover.scss';

const Popover = React.forwardRef(({
  children,
  size,
  className,
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
  /**
   Sets the size of the Popover. The sizes map to the small and medium CardSizes
   */
  size: PropTypes.oneOf(['sm', 'md']),
};

Popover.defaultProps = {
  className: undefined,
  size: undefined,
};

export default Popover;
