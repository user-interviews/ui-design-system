import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordion from 'react-bootstrap/Accordion';

import './Accordion.scss';

const Accordion = ({ children, className, ...props }) => (
  <RBAccordion
    className={classNames(className, 'Accordion')}
    {...props}
  >
    { children }
  </RBAccordion>
  );

Accordion.propTypes = {
  className: PropTypes.string,
};

Accordion.defaultProps = {
  className: undefined,
};

export default Accordion;
