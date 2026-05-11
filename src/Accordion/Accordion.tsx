import React from 'react';

import classNames from 'classnames';
import RBAccordion from 'react-bootstrap/Accordion';

type AccordionProps = {
  children: React.ReactNode;
  /** Controlled open panel(s); values must match each `AccordionItem` `eventKey`. Use `string[]` when `alwaysOpen`. Forwarded to React Bootstrap `Accordion`. */
  activeKey?: string | string[];
  /** Multiple panels may stay open; pair with `activeKey` / `defaultActiveKey` as arrays when needed. Forwarded to React Bootstrap `Accordion`. */
  alwaysOpen?: boolean;
  /** Root element type. Forwarded to React Bootstrap `Accordion`. */
  as?: React.ElementType;
  /** Initial open key(s) when uncontrolled; ignored if `activeKey` is set. */
  defaultActiveKey?: string | string[];
  /** Edge-to-edge (flush) styling. Forwarded to React Bootstrap `Accordion`. */
  flush?: boolean;
  UNSAFE_className?: string;
  /** Fires when the expanded item changes. Forwarded to React Bootstrap `Accordion`. */
  onSelect?: () => void;
};

function Accordion({
  activeKey,
  alwaysOpen,
  as,
  defaultActiveKey,
  children,
  flush,
  onSelect,
  UNSAFE_className,
}: AccordionProps) {
  return (
    <RBAccordion
      activeKey={activeKey}
      alwaysOpen={alwaysOpen}
      as={as}
      className={classNames(UNSAFE_className, 'Accordion')}
      defaultActiveKey={defaultActiveKey}
      flush={flush}
      onSelect={onSelect}
    >
      {children}
    </RBAccordion>
  );
}

export default Accordion;
