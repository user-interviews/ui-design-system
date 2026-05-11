import React, { useEffect, useState } from 'react';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';

import { faChevronUp } from '../font_awesome/solid';
import { isEventKeyActive } from './utils';

import './AccordionToggle.scss';

type AccordionToggleProps = {
  /** Bottom border on the header inner container. */
  borderBottom?: boolean;
  /** Chevron at 90° at rest; open/close rotation differs from default. */
  chevronLateral?: boolean;
  /** Chevron before content; hides the trailing chevron. */
  chevronLeft?: boolean;
  /** Trailing chevron (default `true`). */
  chevronRight?: boolean;
  children?: React.ReactNode;
  /** Shown only while this panel is collapsed. */
  collapsedText?: string;
  /** Disables the header button and mutes appearance. */
  disabled?: boolean;
  /** Must match this item’s `AccordionItem` and `AccordionCollapse` `eventKey`. */
  eventKey: string;
  /** Tighter horizontal padding on the header. */
  flush?: boolean;
  /** Parenthetical text after the title. */
  helperText?: string;
  /** Font Awesome icon definition rendered before the title. */
  leadingIcon?: object;
  title?: string;
  UNSAFE_className?: string;
};

function AccordionToggle({
  borderBottom,
  children,
  chevronLateral = false,
  chevronLeft = false,
  chevronRight = true,
  collapsedText,
  disabled,
  eventKey,
  flush,
  helperText,
  leadingIcon,
  title,

  UNSAFE_className,
}: AccordionToggleProps) {
  const { activeEventKey } = React.useContext(AccordionContext);

  const eventKeyIsActive = isEventKeyActive(eventKey, activeEventKey);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    if (!eventKeyIsActive) {
      setIsCollapsed(false);
    }
    setIsCollapsed((prev) => !prev);
  });

  const handleCloseInactiveToggle = () => {
    setIsCollapsed(true);
  };

  useEffect(() => {
    if (!eventKeyIsActive) {
      handleCloseInactiveToggle();
    }

    if (eventKeyIsActive) {
      setIsCollapsed((prev) => !prev);
    }
  }, [eventKeyIsActive]);

  return (
    <button
      className={classNames(
        UNSAFE_className,
        'AccordionToggle',
        { collapsed: isCollapsed },
        { 'AccordionToggle--chevron-lateral': chevronLateral },
        { 'AccordionToggle--disabled': disabled },
      )}
      disabled={disabled}
      type="button"
      onClick={decoratedOnClick}
    >
      <div
        className={classNames(
          'AccordionToggle__container',
          { flush },
          { borderBottom },
        )}
      >
        <div className="AccordionToggle__container--content">
          {chevronLeft && (
            <span className="AccordionToggle__chevron-left">
              <FontAwesomeIcon icon={faChevronUp as IconDefinition} />
            </span>
          )}
          {leadingIcon && (
            <span className="AccordionToggle__leading-icon">
              <FontAwesomeIcon icon={leadingIcon as IconDefinition} />
            </span>
          )}
          {title && <span className="AccordionToggle__title">{title}</span>}
          {collapsedText && isCollapsed && (
            <span className="AccordionToggle__collapsed-text">
              {collapsedText}{' '}
            </span>
          )}
          {helperText && (
            <span className="AccordionToggle__helper-text">({helperText})</span>
          )}
          {children}
        </div>
        {chevronRight && !chevronLeft && (
          <div className="AccordionToggle__container--right">
            <span className="AccordionToggle__chevron-right">
              <FontAwesomeIcon icon={faChevronUp as IconDefinition} />
            </span>
          </div>
        )}
      </div>
    </button>
  );
}

export default AccordionToggle;
