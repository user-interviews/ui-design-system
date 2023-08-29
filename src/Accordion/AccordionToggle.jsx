import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';

import './AccordionToggle.scss';
import { faChevronUp } from '@fortawesome/pro-solid-svg-icons';

const AccordionToggle = ({
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
}) => {
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
              <FontAwesomeIcon icon={faChevronUp} />
            </span>
          )}
          {leadingIcon && (
            <span className="AccordionToggle__leading-icon">
              <FontAwesomeIcon icon={leadingIcon} />
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
              <FontAwesomeIcon icon={faChevronUp} />
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

AccordionToggle.propTypes = {
  /**
   Set Chevron icon to open/close quarter turn from lateral
  */
  chevronLateral: PropTypes.bool,
  /**
   Aligns the Chevron icon to the left
  */
  chevronLeft: PropTypes.bool,
  /**
   Aligns the Chevron icon to the right (default)
  */
  chevronRight: PropTypes.bool,
  collapsedText: PropTypes.string,
  /**
   A unique key used to control this item's collapse/expand.
   */
  disabled: PropTypes.bool,
  eventKey: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  leadingIcon: PropTypes.object,
  title: PropTypes.string,
  UNSAFE_className: PropTypes.string,
};

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
