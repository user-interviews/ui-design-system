import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAccordionButton } from 'react-bootstrap';

import './AccordionCustomToggle.scss';
import { faChevronUp } from '@fortawesome/pro-solid-svg-icons';

const AccordionCustomToggle = ({
  children,
  chevronLeft,
  chevronRight,
  className,
  eventKey,
  helperText,
  label,
  title,
}) => {
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    setIsCollapsed((prev) => !prev);
  });

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <button
      className={
        classNames(
          className,
          'AccordionCustomToggle',
          isCollapsed && 'collapsed',
        )
      }
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
  eventKey: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
};

AccordionCustomToggle.defaultProps = {
  chevronLeft: false,
  chevronRight: true,
  className: undefined,
  helperText: undefined,
  label: undefined,
  title: undefined,
};

export default AccordionCustomToggle;
