import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import AccordionContext from './AccordionContext';
import './AccordionBody.scss';

const AccordionBody = ({
  children,
  className,
  id,
}) => {

  const { isExpanded } = useContext(AccordionContext);

  return (
  <div className={classNames(
      'Accordion__body',
      className,
      {
        [`Accordion__body--collapsed`]: isExpanded,
        [`Accordion__body--expanded`]: !!isExpanded,
      },
    )}
  >
    {children}
  </div>
  )};

export default AccordionBody;

AccordionBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

AccordionBody.defaultPropTypes = {
  children: undefined,
  className: undefined,
  id: undefined,
};
