import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordionCollapse from 'react-bootstrap/AccordionCollapse';

import './AccordionCollapse.scss';

const AccordionCollapse = ({
  children,
  eventKey,
  // eslint-disable-next-line camelcase
  UNSAFE_className,
  ...props
}) => (
  <RBAccordionCollapse
    className={classNames(UNSAFE_className, 'AccordionCollapse')}
    eventKey={eventKey}
    {...props}
  >
    <div className="AccordionCollapse__container">
      {children}
    </div>
  </RBAccordionCollapse>
);

AccordionCollapse.propTypes = {
  /**
   A unique key used to control this item's collapse/expand.
   */
  eventKey: PropTypes.string.isRequired,
  UNSAFE_className: PropTypes.string,
};

AccordionCollapse.defaultProps = {
  UNSAFE_className: undefined,
};

export default AccordionCollapse;
