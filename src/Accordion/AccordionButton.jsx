import React from 'react';

import RBAccordionButton from 'react-bootstrap/AccordionButton';

const AccordionButton = ({ children, ...props }) => (
  <RBAccordionButton {...props} >
    { children }
  </RBAccordionButton>
  );

export default AccordionButton;
