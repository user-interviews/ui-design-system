import React from "react";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAccordionButton } from "react-bootstrap";

import './AccordionCustomToggle.scss';
import { faChevronUp } from "@fortawesome/pro-solid-svg-icons";

const AccordionCustomToggle = ({ 
  children,
  chevronLeft, 
  className, 
  eventKey,
}) => {
  
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <button
      className={classNames(className, 'AccordionCustomToggle')}
      type="button"
      onClick={decoratedOnClick}
    >
      <div className="AccordionCustomToggle__container">
      {chevronLeft && (
        <FontAwesomeIcon icon={faChevronUp}/>
      )}
      {children}
      </div>
    </button>
  )
}

export default AccordionCustomToggle;
