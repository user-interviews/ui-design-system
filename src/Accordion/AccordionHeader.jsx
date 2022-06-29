import React from 'react';
import classNames from 'classnames';

import RBAccordionHeader from 'react-bootstrap/AccordionHeader';

import './AccordionHeader.scss';

const AccordionHeader = ({ children, className, ...props }) => (
  <RBAccordionHeader 
    className={classNames(className, 'AccordionHeader')}
    {...props}
  >
    { children }
  </RBAccordionHeader>
  );

export default AccordionHeader;
