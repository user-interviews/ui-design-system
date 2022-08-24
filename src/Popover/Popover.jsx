import React from 'react';
import classNames from 'classnames';

import { Popover as RBPopover } from 'react-bootstrap';

import './Popover.scss';

const Popover = React.forwardRef(({ children, className, ...props }, ref) => (
  <RBPopover 
    className={classNames(className, 'Popover')}
    ref={ref} 
    {...props}
  >
    { children }
  </RBPopover>
  ));

export default Popover;
