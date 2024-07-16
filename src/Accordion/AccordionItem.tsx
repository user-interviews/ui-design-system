import React from 'react';
import classNames from 'classnames';

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
  // eslint-disable-next-line camelcase
  UNSAFE_className?: string;
  children: React.ReactNode;
  eventKey: string;
  variant?: string;
};

const AccordionItem = ({
  variant,
  as,
  borderless,
  children,
  eventKey,
  // eslint-disable-next-line camelcase
  UNSAFE_className,
}: AccordionItemProps) => (
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
    { children }
  </RBAccordionItem>
);

AccordionItem.defaultProps = {
  variant: undefined,
  as: undefined,
  borderless: undefined,
  UNSAFE_className: undefined,
};
export default AccordionItem;
