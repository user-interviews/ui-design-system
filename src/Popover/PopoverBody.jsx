import React from 'react';

import { Popover as RBPopover } from 'react-bootstrap';

const PopoverBody = ({ children, props }) => (
  <RBPopover.Body {...props}>
    { children }
  </RBPopover.Body>
  );

export default PopoverBody;
