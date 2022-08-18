import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordion from 'react-bootstrap/Accordion';

import './Accordion.scss';

const Accordion = ({
 children, className, variant, ...props
}) => (
  <RBAccordion
    className={classNames(className, 'Accordion')}
    {...props}
  >
    { children }
  </RBAccordion>
  );

Accordion.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['card']),
};

Accordion.defaultProps = {
  className: undefined,
  variant: undefined,
};

export default Accordion;
