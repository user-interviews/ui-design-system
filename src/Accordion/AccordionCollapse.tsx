import React from 'react';
import classNames from 'classnames';

import RBAccordionCollapse from 'react-bootstrap/AccordionCollapse';

import './AccordionCollapse.scss';

type AccordionCollapseProps = {
  variant?: string;
  children: React.ReactNode;
  /**
   A unique key used to control this item's collapse/expand.
   */
  eventKey: string;
  // eslint-disable-next-line camelcase
  UNSAFE_className?: string;
};

const AccordionCollapse = ({
  variant,
  children,
  eventKey,

  // eslint-disable-next-line camelcase
  UNSAFE_className,

  ...props
}: AccordionCollapseProps) => (
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

AccordionCollapse.defaultProps = {
  variant: undefined,
  UNSAFE_className: undefined,
};

export default AccordionCollapse;
