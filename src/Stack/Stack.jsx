import React from 'react';

import { Stack as RBStack } from 'react-bootstrap';

const Stack = ({ children, ...props }) => (
  <RBStack {...props}>
    {children}
  </RBStack>
) ;

export default Stack;
