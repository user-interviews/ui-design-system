import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';

import { faChevronUp } from '../font_awesome/solid';

import './AccordionToggle.scss';

import { isEventKeyActive } from './utils';

type AccordionToggleProps = {
  borderBottom?: boolean;
  /**
   Set Chevron icon to open/close quarter turn from lateral
  */
  chevronLateral?: boolean;
  /**
   Aligns the Chevron icon to the left
  */
  chevronLeft?: boolean;
  /**
   Aligns the Chevron icon to the right (default)
  */
  chevronRight?: boolean;
  children?: React.ReactNode;
  collapsedText?: string;
  /**
   A unique key used to control this item's collapse/expand.
   */
  disabled?: boolean;
  eventKey: string;
  flush?: boolean;
  helperText?: string;
  leadingIcon?: object;
  title?: string;
  // eslint-disable-next-line camelcase
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

  // eslint-disable-next-line camelcase
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
      setIsCollapsed(((prev) => !prev));
    }
  }, [eventKeyIsActive]);

  return (
    <button
      className={
        classNames(
          UNSAFE_className,
          'AccordionToggle',
          { collapsed: isCollapsed },
          { 'AccordionToggle--chevron-lateral': chevronLateral },
          { 'AccordionToggle--disabled': disabled },
        )
      }
      disabled={disabled}
      type="button"
      onClick={decoratedOnClick}
    >
      <div className={classNames('AccordionToggle__container', { flush }, { borderBottom })}>
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
          {title && (
            <span className="AccordionToggle__title">{title}</span>
          )}
          {collapsedText && isCollapsed && (
            <span className="AccordionToggle__collapsed-text">{collapsedText} </span>
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
