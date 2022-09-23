import React from 'react';
import PropTypes from 'prop-types';

import ReactBootstrapTabs from 'react-bootstrap/Tabs';

import { StyledTabsWrapper } from './Tabs.styles';

const Tabs = ({
  children,
  ...props
}) => (
  <StyledTabsWrapper>
    <ReactBootstrapTabs variant="tabs" {...props}>
      {children}
    </ReactBootstrapTabs>
  </StyledTabsWrapper>
);

export default Tabs;

Tabs.propTypes = {
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired,
  mountOnEnter: PropTypes.bool,
  transition: PropTypes.oneOfType([
      PropTypes.oneOf([false]),
      PropTypes.elementType,
  ]),
  unmountOnExit: PropTypes.bool,
  onSelect: PropTypes.func,
};

Tabs.defaultProps = {
  activeKey: undefined,
  defaultActiveKey: 1,
  mountOnEnter: undefined,
  transition: undefined,
  unmountOnExit: undefined,
  onSelect: undefined,
};
