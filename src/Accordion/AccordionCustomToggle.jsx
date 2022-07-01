import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';

import './AccordionCustomToggle.scss';
import { faChevronUp } from '@fortawesome/pro-solid-svg-icons';

const AccordionCustomToggle = ({
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
}) => {
  const { activeEventKey } = React.useContext(AccordionContext);

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

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <button
      className={
        classNames(
          className,
          'AccordionCustomToggle',
          isCollapsed && 'collapsed',
          disabled && 'AccordionCustomToggle--disabled',
        )
      }
      disabled={disabled}
      type="button"
      onClick={decoratedOnClick}
    >
      <div className="AccordionCustomToggle__container">
        <span className="AccordionCustomToggle__container--left">
          {chevronLeft && (
            <span className="AccordionCustomToggle__chevron-left">
              <FontAwesomeIcon icon={faChevronUp} />
            </span>
          )}
          {leadingIcon && (
            <span className="AccordionCustomToggle__leading-icon">
              <FontAwesomeIcon icon={leadingIcon} />
            </span>
          )}
          {title && (
            <span className="AccordionCustomToggle__title">{title}</span>
          )}
          {helperText && (
            <span className="AccordionCustomToggle__helper-text">({helperText})</span>
          )}
        </span>
        <span className="AccordionCustomToggle__container--right">
          {label && (
            <span className="AccordionCustomToggle__label">{label}</span>
          )}
          {chevronRight && !chevronLeft && (
            <span className="AccordionCustomToggle__chevron-right">
              <FontAwesomeIcon icon={faChevronUp} />
            </span>
          )}
        </span>
        {children}
      </div>
    </button>
  );
};

AccordionCustomToggle.propTypes = {
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

AccordionCustomToggle.defaultProps = {
  chevronLeft: false,
  chevronRight: true,
  className: undefined,
  disabled: undefined,
  helperText: undefined,
  label: undefined,
  leadingIcon: undefined,
  title: undefined,
};

export default AccordionCustomToggle;
