import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordionCollapse from 'react-bootstrap/AccordionCollapse';

import './AccordionCollapse.scss';

const AccordionCollapse = ({
  children,
  className,
  eventKey,
}) => (
  <RBAccordionCollapse
    className={classNames(className, 'AccordionCollapse')}
    eventKey={eventKey}
  >
    <div className="AccordionCollapse__container">
      {children}
    </div>
  </RBAccordionCollapse>
);

AccordionCollapse.propTypes = {
  className: PropTypes.string,
   /**
  A unique key used to control this item's collapse/expand.
  */
  eventKey: PropTypes.string.isRequired,
};

AccordionCollapse.defaultProps = {
  className: undefined,
};

export default AccordionCollapse;
