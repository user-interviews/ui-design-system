import React, { Children, useMemo, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import AccordionContext from './AccordionContext';
import './Accordion.scss';

const Accordion = ({
  borderless,
  children: childrenProp,
  className,
  defaultCollapsed,
}) => {
  
  const [isExpanded, setIsExpanded] = useState(defaultCollapsed);

  const onAccordionClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    handleToggle();
  };

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  const contextValue = useMemo(() => ({ isExpanded }), [isExpanded]);
  const [header, ...children] = Children.toArray(childrenProp)

  return (
    <div
      className={classNames(
      'Accordion',
      className,
      {
        [`Accordion--borderless`]: !!borderless,
      },
    )}
      onClick={onAccordionClick}
    >
      <AccordionContext.Provider value={contextValue}>{header}</AccordionContext.Provider>
      <div className='dummy-div' style={ isExpanded ? {display: 'none'} : null}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;

Accordion.propTypes = {
  borderless: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  defaultCollapsed: PropTypes.bool,
};

Accordion.defaultPropTypes = {
  borderless: undefined,
  children: undefined,
  className: undefined,
  defaultCollapsed: false,
};
