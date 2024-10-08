import React from 'react';
import classNames from 'classnames';

import {
  Dropdown as RBDropdown,
} from 'react-bootstrap';

import './DropdownDivider.scss';

type DropdownDividerProps = {
  /**
    You can use a custom element type for this component.
    */
  as?: React.ElementType;
  /**
   Change the underlying component CSS base class name and modifier class names prefix.
    This is an escape hatch for working with heavily customized bootstrap css.
    */
  bsPrefix?: string;
  className?: string;
};

function DropdownDivider({
  as = 'hr',
  bsPrefix = 'dropdown',
  className,
}: DropdownDividerProps) {
  return (
    <RBDropdown.Divider
      as={as}
      bsPrefix={bsPrefix}
      className={classNames('DropdownDivider', className)}
    />
  );
}

export default DropdownDivider;
