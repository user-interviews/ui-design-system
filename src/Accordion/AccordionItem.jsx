import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordionItem from 'react-bootstrap/AccordionItem';

import './AccordionItem.scss';

const AccordionItem = ({ children, className, ...props }) => (
  <RBAccordionItem
    className={classNames(className, 'AccordionItem')}
    {...props}
  >
    { children }
  </RBAccordionItem>
);

AccordionItem.propTypes = {
  className: PropTypes.string,
};

AccordionItem.defaultProps = {
  className: undefined,
};
export default AccordionItem;
