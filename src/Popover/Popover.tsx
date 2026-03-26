import React from 'react';
import { Popover as RBPopover } from 'react-bootstrap';
import type { PopoverProps as RBPopoverProps } from 'react-bootstrap';

import classNames from 'classnames';

import './Popover.scss';

type PopoverProps = RBPopoverProps & {
  className?: string;
};

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, className, ...props }, ref) => (
    <RBPopover
      className={classNames(className, 'Popover')}
      ref={ref}
      {...props}
    >
      {children}
    </RBPopover>
  ),
);

Popover.displayName = 'Popover';

export default Popover;
