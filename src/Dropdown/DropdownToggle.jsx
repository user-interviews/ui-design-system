import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Dropdown as RBDropdown } from 'react-bootstrap';

import './DropdownToggle.scss';

const DropdownToggle = ({
  as,
  childBsPrefix,
  children,
  className,
  id,
  ...props
}) => (
  <RBDropdown.Toggle
    as={as}
    childBsPrefix={childBsPrefix}
    className={classNames('DropdownToggle', className)}
    id={id}
    {...props}
  >
    { children }
  </RBDropdown.Toggle>
  );

DropdownToggle.propTypes = {
  /**
    You can use a custom element type for this component.
   */
  as: PropTypes.elementType,
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
   This is an escape hatch for working with heavily customized bootstrap css.
  */
  bsPrefix: PropTypes.string,
  /**
    To pass through to the underlying button or whatever from DropdownButton
  */
  childBsPrefix: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  /**
    An html id attribute, necessary for assistive technologies, such as screen readers.
  */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DropdownToggle.defaultProps = {
  as: undefined,
  bsPrefix: 'dropdown-toggle',
  className: undefined,
  childBsPrefix: undefined,
  children: undefined,
  id: undefined,
};

export default DropdownToggle;
