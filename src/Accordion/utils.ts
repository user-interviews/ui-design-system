import type { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';

export function isEventKeyActive(eventKey: string | null | undefined,
  activeEventKey: AccordionEventKey) {
  if (!eventKey) return false;

  return (Array.isArray(activeEventKey) && activeEventKey.includes(eventKey)) ||
    eventKey === activeEventKey;
}
