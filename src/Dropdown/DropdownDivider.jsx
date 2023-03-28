import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Dropdown as RBDropdown } from 'react-bootstrap';

import './DropdownDivider.scss';

const DropdownDivider = ({ as, bsPrefix, className }) => (
  <RBDropdown.Divider
    as={as}
    bsPrefix={bsPrefix}
    className={classNames('DropdownDivider', className)}
  />
  );

DropdownDivider.propTypes = {
  /**
    You can use a custom element type for this component.
    */
  as: PropTypes.elementType,
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
    This is an escape hatch for working with heavily customized bootstrap css.
    */
  bsPrefix: PropTypes.string,
  className: PropTypes.string,
};

DropdownDivider.defaultProps = {
  as: 'hr',
  bsPrefix: 'dropdown',
  className: undefined,
};

export default DropdownDivider;
