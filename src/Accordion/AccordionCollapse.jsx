import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordionCollapse from 'react-bootstrap/AccordionCollapse';

import './AccordionCollapse.scss';

const AccordionCollapse = ({
  cardPadding,
  children,
  className,
  eventKey,
  ...props
}) => (
  <RBAccordionCollapse
    className={classNames(className, 'AccordionCollapse')}
    eventKey={eventKey}
    {...props}
  >
    <div className={classNames(
      'AccordionCollapse__container',
      { 'AccordionCollapse__container--card-padding': cardPadding },
    )}
    >
      {children}
    </div>
  </RBAccordionCollapse>
);

AccordionCollapse.propTypes = {
  /**
   Adds default Card padding. Use to align content with other Cards.
  */
  cardPadding: PropTypes.bool,
  className: PropTypes.string,
   /**
  A unique key used to control this item's collapse/expand.
  */
  eventKey: PropTypes.string.isRequired,
};

AccordionCollapse.defaultProps = {
  cardPadding: undefined,
  className: undefined,
};

export default AccordionCollapse;
