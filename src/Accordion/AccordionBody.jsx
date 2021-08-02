import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import AccordionContext from './AccordionContext';
import './AccordionBody.scss';

const AccordionBody = ({
  borderless,
  children,
  className,
  id,
  ...props
}) => {
  const { isCollapsed } = useContext(AccordionContext);

  return (
    <div
      aria-labelledby={`body-${id}`}
      className={classNames(
      'Accordion__body',
      className,
      `Accordion__body--${isCollapsed ? `collapsed` : `expanded`}`,
      {
        [`Accordion__body--borderless`]: borderless,
      },
    )}
      id={`${id}-Accordion__body`}
      {...props}
    >
      {children}
    </div>
  );
};

export default AccordionBody;

AccordionBody.propTypes = {
  borderless: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

AccordionBody.defaultPropTypes = {
  borderless: undefined,
  children: undefined,
  className: undefined,
  id: undefined,
};
