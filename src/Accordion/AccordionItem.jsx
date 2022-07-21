import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordionItem from 'react-bootstrap/AccordionItem';

import './AccordionItem.scss';

const AccordionItem = ({
 borderless, children, className, ...props
}) => (
  <RBAccordionItem
    className={classNames(
      className,
      'AccordionItem',
      borderless && 'AccordionItem--borderless',
    )}
    {...props}
  >
    { children }
  </RBAccordionItem>
);

AccordionItem.propTypes = {
  borderless: PropTypes.bool,
  className: PropTypes.string,
};

AccordionItem.defaultProps = {
  borderless: undefined,
  className: undefined,
};
export default AccordionItem;
