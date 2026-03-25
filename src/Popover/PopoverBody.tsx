import classNames from 'classnames';
import React from 'react';
import { Popover as RBPopover } from 'react-bootstrap';

import './PopoverBody.scss';

type PopoverBodyProps = {
  className?: string;
  // oxlint-disable-next-line typescript/no-explicit-any
} & any;

function PopoverBody({ children, className, ...props }: PopoverBodyProps) {
  return (
    <RBPopover.Body className={classNames(className, 'PopoverBody')} {...props}>
      {children}
    </RBPopover.Body>
  );
}

export default PopoverBody;
