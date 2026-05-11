import React from 'react';

import classNames from 'classnames';
import RBAccordionItem from 'react-bootstrap/AccordionItem';

import './AccordionItem.scss';

type AccordionItemProps = {
  /** Wrapper element type. Forwarded to React Bootstrap `AccordionItem`. */
  as?: React.ElementType;
  /** Removes the item border. */
  borderless?: boolean;
  UNSAFE_className?: string;
  children: React.ReactNode;
  /** Must match this item’s `AccordionToggle` and `AccordionCollapse` `eventKey`. Forwarded to React Bootstrap `AccordionItem`. */
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
