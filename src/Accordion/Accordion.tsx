import React from 'react';
import classNames from 'classnames';

import RBAccordion from 'react-bootstrap/Accordion';

type AccordionProps = {
  children: React.ReactNode;
  /**
    The current active key that corresponds to the currently expanded accordion
  */
  activeKey?: string | string[];
  /**
    Allow accordion items to stay open when another item is opened
  */
  alwaysOpen?: boolean;
  /**
    Sets a custom element for this component
  */
  as?: React.ElementType;
  /**
    The default active key that is expanded on start
  */
  defaultActiveKey?: string | string[];
  /**
    Renders accordion edge-to-edge with its parent container
  */
  flush?: boolean;
  // eslint-disable-next-line camelcase
  UNSAFE_className?: string;
  /**
    Callback fired when the active item changes
  */
  onSelect?: () => void;
};

const Accordion = ({
  activeKey,
  alwaysOpen,
  as,
  defaultActiveKey,
  children,
  flush,
  onSelect,
  // eslint-disable-next-line camelcase
  UNSAFE_className,
}: AccordionProps) => (
  <RBAccordion
    activeKey={activeKey}
    alwaysOpen={alwaysOpen}
    as={as}
    className={classNames(UNSAFE_className, 'Accordion')}
    defaultActiveKey={defaultActiveKey}
    flush={flush}
    onSelect={onSelect}
  >
    { children }
  </RBAccordion>
  );

Accordion.defaultProps = {
  activeKey: undefined,
  alwaysOpen: undefined,
  as: undefined,
  defaultActiveKey: undefined,
  flush: undefined,
  UNSAFE_className: undefined,
  onSelect: undefined,
};

export default Accordion;
