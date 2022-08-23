import React from 'react';

import { OverlayTrigger as RBOverlayTrigger } from 'react-bootstrap';

const OverlayTrigger = ({ children, ...props }) => (
  <RBOverlayTrigger {...props}>
    {children}
  </RBOverlayTrigger>
);

export default OverlayTrigger;
