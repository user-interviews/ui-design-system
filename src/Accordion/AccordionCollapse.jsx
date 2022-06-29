import React from 'react';
import classNames from 'classnames';

import RBAccordionCollapse from 'react-bootstrap/AccordionCollapse';

import './AccordionCollapse.scss';

const AccordionCollapse = ({ 
  children, 
  className, 
  eventKey, 
}) => {

  return (
    <RBAccordionCollapse
      className={classNames(className, 'AccordionCollapse')}
      eventKey={eventKey}
    >
      <div className="AccordionCollapse__container">
        {children}
      </div>
    </RBAccordionCollapse>
  )
} 

export default AccordionCollapse;
