import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordion from 'react-bootstrap/Accordion';

const Accordion = ({
  activeKey,
  alwaysOpen,
  as,
  defaultActiveKey,
  children,
  flush,
  onSelect,
  // eslint-disable-next-line camelcase
  UNSAFE_className,
}) => (
  <RBAccordion
    activeKey={activeKey}
    alwaysOpen={alwaysOpen}
    as={as}
    className={classNames(UNSAFE_className, 'Accordion')}
    defaultActiveKey={defaultActiveKey}
    flush={flush}
    onSelect={onSelect}
  >
    { children }
  </RBAccordion>
  );

Accordion.propTypes = {
  /**
    The current active key that corresponds to the currently expanded accordion
  */
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /**
    Allow accordion items to stay open when another item is opened
  */
  alwaysOpen: PropTypes.bool,
  /**
    Sets a custom element for this component
  */
  as: PropTypes.elementType,
  /**
    The default active key that is expanded on start
  */
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /**
    Renders accordion edge-to-edge with its parent container
  */
  flush: PropTypes.bool,
  UNSAFE_className: PropTypes.string,
  /**
    Callback fired when the active item changes
  */
  onSelect: PropTypes.func,
};

Accordion.defaultProps = {
  activeKey: undefined,
  alwaysOpen: undefined,
  as: undefined,
  defaultActiveKey: undefined,
  flush: undefined,
  UNSAFE_className: undefined,
  onSelect: undefined,
};

export default Accordion;
