import React from 'react';

import { Popover as RBPopover } from 'react-bootstrap';

const Popover = React.forwardRef(({ children, ...props }, ref) => (
  <RBPopover ref={ref} {...props}>
    { children }
  </RBPopover>
  ));

export default Popover;
