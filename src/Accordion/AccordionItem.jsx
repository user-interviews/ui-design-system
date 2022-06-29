import React from 'react';
import classNames from 'classnames';

import RBAccordionItem from 'react-bootstrap/AccordionItem';

import './AccordionItem.scss';

const AccordionItem = ({ children, className, ...props }) => (
  <RBAccordionItem 
    className={classNames(className, 'AccordionItem')}
    {...props}
  >
    { children }
  </RBAccordionItem>
  );

export default AccordionItem;
