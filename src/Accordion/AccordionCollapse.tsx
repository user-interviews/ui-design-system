import React from 'react';
import classNames from 'classnames';

import RBAccordionCollapse from 'react-bootstrap/AccordionCollapse';

import './AccordionCollapse.scss';

type AccordionCollapseProps = {
  /**
   A unique key used to control this item's collapse/expand.
   */
  eventKey: string;
  // eslint-disable-next-line camelcase
  UNSAFE_className?: string;
  children: React.ReactNode;
};

const AccordionCollapse = ({
  children,
  eventKey,

  // eslint-disable-next-line camelcase
  UNSAFE_className,

  ...props
}: AccordionCollapseProps) => (
  <RBAccordionCollapse
    className={classNames(UNSAFE_className, 'AccordionCollapse')}
    eventKey={eventKey}
    {...props}
  >
    <div className="AccordionCollapse__container">
      {children}
    </div>
  </RBAccordionCollapse>
);

AccordionCollapse.defaultProps = {
  UNSAFE_className: undefined,
};

export default AccordionCollapse;
