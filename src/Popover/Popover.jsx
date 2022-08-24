import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Popover as RBPopover } from 'react-bootstrap';

import './Popover.scss';

const Popover = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => (
  <RBPopover
    className={classNames(className, 'Popover')}
    ref={ref}
    {...props}
  >
    { children }
  </RBPopover>
));

Popover.propTypes = {
  className: PropTypes.string,
};

Popover.defaultProps = {
  className: undefined,
};

export default Popover;
