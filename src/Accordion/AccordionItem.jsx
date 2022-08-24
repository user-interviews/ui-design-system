import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordionItem from 'react-bootstrap/AccordionItem';

import './AccordionItem.scss';

const AccordionItem = ({
  borderless,
  children,
  // eslint-disable-next-line camelcase
  UNSAFE_className,
  ...props
}) => (
  <RBAccordionItem
    className={classNames(
      UNSAFE_className,
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
  UNSAFE_className: PropTypes.string,
};

AccordionItem.defaultProps = {
  borderless: undefined,
  UNSAFE_className: undefined,
};
export default AccordionItem;
