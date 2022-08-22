import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordion from 'react-bootstrap/Accordion';

const Accordion = ({
  children,
  // eslint-disable-next-line camelcase
  UNSAFE_className,
  ...props
}) => (
  <RBAccordion
    className={classNames(UNSAFE_className, 'Accordion')}
    {...props}
  >
    { children }
  </RBAccordion>
  );

Accordion.propTypes = {
  UNSAFE_className: PropTypes.string,
};

Accordion.defaultProps = {
  UNSAFE_className: undefined,
};

export default Accordion;
