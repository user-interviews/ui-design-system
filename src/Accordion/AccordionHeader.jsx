import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
}) => {

  const { isExpanded } = useContext(AccordionContext);

  return (
  <div className={classNames(
      'Accordion__header',
      className,
    )}
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
      { isExpanded && expandedIcon && (
      <span className="Accordion__header__expand-icon">
        <FontAwesomeIcon icon={expandedIcon} />
      </span>
        )}
        { !isExpanded && collapsedIcon && (
      <span className="Accordion__header__collapse-icon">
        <FontAwesomeIcon icon={collapsedIcon} />
      </span>
        )}
    </div>
    {children}
  </div>
  )};

export default AccordionHeader;

AccordionHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
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
  expandedIcon: undefined,
  helperText: undefined,
  label: undefined,
  leadingIcon: undefined,
  ariaControls: undefined,
  id: undefined,
};
