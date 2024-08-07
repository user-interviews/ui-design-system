import React from 'react';
import classNames from 'classnames';

import { Popover as RBPopover } from 'react-bootstrap';

import './PopoverBody.scss';

type PopoverBodyProps = {
  className?: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} & any;

function PopoverBody({
  children,
  className,
  ...props
}: PopoverBodyProps) {
  return (
    <RBPopover.Body
      className={classNames(className, 'PopoverBody')}
      {...props}
    >
      { children }
    </RBPopover.Body>
  );
}

PopoverBody.defaultProps = {
  className: undefined,
};

export default PopoverBody;
