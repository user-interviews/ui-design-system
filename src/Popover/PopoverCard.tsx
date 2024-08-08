import React, { ReactNode } from 'react';
import classNames from 'classnames';
import PopoverBody from './PopoverBody';

import styles from './PopoverCard.module.scss';

const handleWidth = (cardSize) => {
  switch (cardSize) {
    case 'md':
      return styles['popover-card-md'];
    default:
      return styles['popover-card-sm'];
  }
};

interface PopoverCardProps {
  className?: string;
  children?: ReactNode;
  size?: 'sm' | 'md';
}

function PopoverCard({
  children,
  className,
  size = 'sm',
}: PopoverCardProps) {
  const widthClass = handleWidth(size);

  return (
    <PopoverBody className={classNames(styles['popover-card'], widthClass, className)}>
      {children}
    </PopoverBody>
  );
}

export default PopoverCard;
