import React, {
 Children, Fragment, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import * as keyCodes from '../utils/keycodes';

import AccordionContext from './AccordionContext';
import './Accordion.scss';

const Accordion = ({
  borderless,
  children: childrenProp,
  className,
  defaultCollapsed,
  id,
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState();

  const onKeyboardPress = (ev) => {
    if (ev.keyCode !== keyCodes.ENTER) return null;

    return handleToggle();
  };

  const onAccordionClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    handleToggle();
  };

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  const contextValue = useMemo(() => ({ isCollapsed }), [isCollapsed]);
  const [header, ...children] = Children.toArray(childrenProp);

  useEffect(() => {
    if (defaultCollapsed) {
      setIsCollapsed(true);
    }
  }, [defaultCollapsed]);

  return (
    <Fragment>
      <div
        className={classNames(
      'Accordion',
      className,
      {
        [`Accordion--borderless`]: !!borderless,
      },
      `Accordion--${isCollapsed ? `collapsed` : `expanded`}`,
    )}
        id={`${id}-Accordion`}
        role="tablist"
        onClick={onAccordionClick}
        onKeyUp={onKeyboardPress}
        {...props}
      >
        <AccordionContext.Provider value={contextValue}>{header}</AccordionContext.Provider>
      </div>
      <Fragment>
        <AccordionContext.Provider value={contextValue}>{children}</AccordionContext.Provider>
      </Fragment>
    </Fragment>
  );
};

export default Accordion;

Accordion.propTypes = {
  borderless: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  defaultCollapsed: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

Accordion.defaultPropTypes = {
  borderless: false,
  children: undefined,
  className: undefined,
  defaultCollapsed: false,
  id: undefined,
};
