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
  chevronLeft,
  chevronRight,
  className,
  disabled,
  eventKey,
  helperText,
  label,
  leadingIcon,
  title,
  ...props
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
          className,
          'AccordionToggle',
          isCollapsed && 'collapsed',
          disabled && 'AccordionToggle--disabled',
        )
      }
      disabled={disabled}
      type="button"
      onClick={decoratedOnClick}
      {...props}
    >
      <div className="AccordionToggle__container">
        <div className="AccordionToggle__container--left">
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
          {helperText && (
            <span className="AccordionToggle__helper-text">({helperText})</span>
          )}
          {children}
        </div>
        <div className="AccordionToggle__container--right">
          {label && (
            <span className="AccordionToggle__label">{label}</span>
          )}
          {chevronRight && !chevronLeft && (
            <span className="AccordionToggle__chevron-right">
              <FontAwesomeIcon icon={faChevronUp} />
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

AccordionToggle.propTypes = {
  /**
   Aligns the Chevron icon to the left
  */
  chevronLeft: PropTypes.bool,
  /**
   Aligns the Chevron icon to the right (default)
  */
  chevronRight: PropTypes.bool,
  className: PropTypes.string,
   /**
  A unique key used to control this item's collapse/expand.
  */
  disabled: PropTypes.bool,
  eventKey: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  label: PropTypes.string,
  leadingIcon: PropTypes.object,
  title: PropTypes.string,
};

AccordionToggle.defaultProps = {
  chevronLeft: false,
  chevronRight: true,
  className: undefined,
  disabled: undefined,
  helperText: undefined,
  label: undefined,
  leadingIcon: undefined,
  title: undefined,
};

export default AccordionToggle;
