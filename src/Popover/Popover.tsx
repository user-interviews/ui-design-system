import classNames from 'classnames';
import React from 'react';
import { Popover as RBPopover, PopoverProps as RBPopoverProps } from 'react-bootstrap';

import './Popover.scss';

type PopoverProps = RBPopoverProps & {
  className?: string;
};

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, className, ...props }, ref) => (
    <RBPopover className={classNames(className, 'Popover')} ref={ref} {...props}>
      {children}
    </RBPopover>
  ),
);

export default Popover;
