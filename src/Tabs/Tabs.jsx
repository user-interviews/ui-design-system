import React from 'react';
import PropTypes from 'prop-types';

import ReactBootstrapTabs from 'react-bootstrap/Tabs';

import { StyledTabsWrapper } from './Tabs.styles';

const Tabs = ({
  children,
  flexWrapUnset,
  navItemButtonFullHeight,
  ...props
}) => (
  <StyledTabsWrapper
    flexWrapUnset={flexWrapUnset}
    navItemButtonFullHeight={navItemButtonFullHeight}
  >
    <ReactBootstrapTabs variant="tabs" {...props}>
      {children}
    </ReactBootstrapTabs>
  </StyledTabsWrapper>
);

export default Tabs;

Tabs.propTypes = {
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flexWrapUnset: PropTypes.bool,
  id: PropTypes.string.isRequired,
  mountOnEnter: PropTypes.bool,
  navItemButtonFullHeight: PropTypes.bool,
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
  flexWrapUnset: false,
  mountOnEnter: undefined,
  navItemButtonFullHeight: false,
  transition: undefined,
  unmountOnExit: undefined,
  onSelect: undefined,
};
