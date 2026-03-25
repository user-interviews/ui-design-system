import classNames from 'classnames';
import React from 'react';
import RBAccordionItem from 'react-bootstrap/AccordionItem';

import './AccordionItem.scss';

type AccordionItemProps = {
  /**
    Sets a custom element for this component
  */
  as?: React.ElementType;
  /**
    Removes border from accordion item
  */
  borderless?: boolean;
  UNSAFE_className?: string;
  children: React.ReactNode;
  eventKey: string;
  variant?: string;
};

function AccordionItem({
  variant,
  as,
  borderless,
  children,
  eventKey,
  UNSAFE_className,
}: AccordionItemProps) {
  return (
    <RBAccordionItem
      as={as}
      className={classNames(
        UNSAFE_className,
        'AccordionItem',
        variant === 'info' && 'AccordionItem--info',
        borderless && 'AccordionItem--borderless',
      )}
      eventKey={eventKey}
    >
      {children}
    </RBAccordionItem>
  );
}

export default AccordionItem;
