import React from 'react';

import RBAccordion from 'react-bootstrap/Accordion';

const Accordion = ({ children, ...props }) => (
  <RBAccordion {...props}>
    { children }
  </RBAccordion>
  );

export default Accordion;
