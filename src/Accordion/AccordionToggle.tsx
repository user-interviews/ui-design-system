import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';

import './AccordionToggle.scss';
import { faChevronUp } from '@fortawesome/pro-solid-svg-icons';

type AccordionToggleProps = {
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
  helperText?: string;
  leadingIcon?: object;
  title?: string;
  // eslint-disable-next-line camelcase
  UNSAFE_className?: string;
};

function AccordionToggle({
  children,
  chevronLateral,
  chevronLeft,
  chevronRight,
  collapsedText,
  disabled,
  eventKey,
  helperText,
  leadingIcon,
  title,

  // eslint-disable-next-line camelcase
  UNSAFE_className,
}: AccordionToggleProps) {
  const { activeEventKey } = React.useContext(AccordionContext);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    if (eventKey !== activeEventKey) {
      setIsCollapsed(false);
    }
    setIsCollapsed((prev) => !prev);
  });

  const handleCloseInactiveToggle = () => {
    setIsCollapsed(true);
  };

  useEffect(() => {
    if (activeEventKey && eventKey !== activeEventKey) {
      handleCloseInactiveToggle();
    }

    if (activeEventKey && eventKey === activeEventKey) {
      setIsCollapsed(((prev) => !prev));
    }
  }, [activeEventKey, eventKey]);

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
      <div className="AccordionToggle__container">
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

AccordionToggle.defaultProps = {
  chevronLateral: false,
  chevronLeft: false,
  chevronRight: true,
  collapsedText: undefined,
  disabled: undefined,
  helperText: undefined,
  leadingIcon: undefined,
  title: undefined,
  UNSAFE_className: undefined,
};

export default AccordionToggle;
