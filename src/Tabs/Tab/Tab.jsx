import React from 'react';
import PropTypes from 'prop-types';

import ReactBootstrapTab from 'react-bootstrap/Tab';

const Tab = ({
  ...props
}) => (
  <ReactBootstrapTab {...props} />
);

export default Tab;

Tab.propTypes = {
  disabled: PropTypes.bool,
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabClassName: PropTypes.string,
  title: PropTypes.node,
};

Tab.defaultProps = {
  disabled: false,
  eventKey: undefined,
  tabClassName: undefined,
  title: undefined,
};
