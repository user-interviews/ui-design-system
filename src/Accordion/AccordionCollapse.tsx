import classNames from 'classnames';
import React from 'react';
import RBAccordionCollapse from 'react-bootstrap/AccordionCollapse';

import './AccordionCollapse.scss';

type AccordionCollapseProps = {
  variant?: string;
  children: React.ReactNode;
  /**
   A unique key used to control this item's collapse/expand.
   */
  eventKey: string;
  UNSAFE_className?: string;
};

function AccordionCollapse({
  variant,
  children,
  eventKey,

  UNSAFE_className,

  ...props
}: AccordionCollapseProps) {
  return (
    <RBAccordionCollapse
      className={classNames(
        UNSAFE_className,
        'AccordionCollapse',
        variant === 'info' && 'AccordionCollapse--info',
      )}
      eventKey={eventKey}
      {...props}
    >
      <div
        className={classNames(
          UNSAFE_className,
          'AccordionCollapse__container',
          variant === 'info' && 'AccordionCollapse--noTopPadding',
        )}
      >
        {children}
      </div>
    </RBAccordionCollapse>
  );
}

export default AccordionCollapse;
