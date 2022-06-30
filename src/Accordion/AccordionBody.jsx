import React from 'react';

import RBAccordionBody from 'react-bootstrap/AccordionBody';

const AccordionBody = ({ children, ...props }) => (
  <RBAccordionBody {...props}>
    { children }
  </RBAccordionBody>
  );

export default AccordionBody;
