import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/pro-regular-svg-icons';

import AccordionContext from './AccordionContext';
import './AccordionHeader.scss';

const AccordionHeader = ({
  children,
  className,
  collapsedIcon,
  expandedIcon,
  helperText,
  label,
  leadingIcon,
  title,
  ariaControls,
  id,
  ...props
}) => {
  const { isCollapsed } = useContext(AccordionContext);

  return (
    <div
      className={classNames(
      'Accordion__header',
      className,
    )}
      id={`${id}-Accordion__header`}
      role="tablist"
      {...props}
    >
      <div>
        { leadingIcon && (
        <FontAwesomeIcon className="Accordion__header__leading-icon" icon={leadingIcon} />
        )}
        { title && (
        <span className="Accordion__header__title">{title}</span>
        )}
        { helperText && (
        <span className="Accordion__header__helper-text">{helperText}</span>
        )}
      </div>
      <div>
        { label && (
        <span className="Accordion__header__label">{label}</span>
        )}
        { isCollapsed && expandedIcon && (
        <span className="Accordion__header__expand-icon">
          <FontAwesomeIcon icon={expandedIcon} />
        </span>
        )}
        { !isCollapsed && collapsedIcon && (
        <span className="Accordion__header__collapse-icon">
          <FontAwesomeIcon icon={collapsedIcon} />
        </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default AccordionHeader;

AccordionHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  collapsedIcon: PropTypes.string,
  expandedIcon: PropTypes.object,
  helperText: PropTypes.string,
  label: PropTypes.string,
  leadingIcon: PropTypes.object,
  title: PropTypes.string,
  ariaControls: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

AccordionHeader.defaultPropTypes = {
  children: undefined,
  className: undefined,
  collapsedIcon: faChevronUp,
  expandedIcon: faChevronDown,
  helperText: undefined,
  label: undefined,
  leadingIcon: undefined,
  ariaControls: undefined,
  id: undefined,
};
