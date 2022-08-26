import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import RBAccordionItem from 'react-bootstrap/AccordionItem';

import './AccordionItem.scss';

const AccordionItem = ({
  as,
  borderless,
  children,
  // eslint-disable-next-line camelcase
  UNSAFE_className,
}) => (
  <RBAccordionItem
    as={as}
    className={classNames(
      UNSAFE_className,
      'AccordionItem',
      borderless && 'AccordionItem--borderless',
    )}
  >
    { children }
  </RBAccordionItem>
);

AccordionItem.propTypes = {
  /**
    Sets a custom element for this component
  */
  as: PropTypes.elementType,
  /**
    Removes border from accordion item
  */
  borderless: PropTypes.bool,
  UNSAFE_className: PropTypes.string,
};

AccordionItem.defaultProps = {
  as: undefined,
  borderless: undefined,
  UNSAFE_className: undefined,
};
export default AccordionItem;
