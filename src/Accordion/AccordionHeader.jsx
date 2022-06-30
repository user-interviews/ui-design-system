import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordionHeader from 'react-bootstrap/AccordionHeader';

import './AccordionHeader.scss';

const AccordionHeader = ({ children, className, ...props }) => (
  <RBAccordionHeader
    className={classNames(className, 'AccordionHeader')}
    {...props}
  >
    { children }
  </RBAccordionHeader>
);

AccordionHeader.propTypes = {
  className: PropTypes.string,
};

AccordionHeader.defaultProps = {
  className: undefined,
};

export default AccordionHeader;
