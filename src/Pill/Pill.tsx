import React from 'react';
import classNames from 'classnames';
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '../font_awesome/solid';

import './Pill.scss';

export const PILL_COLORS = {
  BLUE: 'blue',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  RED: 'red',
  GREEN: 'green',
  GRAY: 'gray',
  SILVER: 'silver',
} as const;

type PillProps = {
  children?: React.ReactNode;
  color?: typeof PILL_COLORS[keyof typeof PILL_COLORS];
  icon?: IconDefinition;
  id?: string;
  text?: React.ReactNode;
  onClose?: (...args: unknown[]) => unknown;
};

function Pill({
  children,
  color = 'blue',
  icon,
  id,
  onClose,
  text,
  ...props
}: PillProps) {
  return (
    <span
      className={
        classNames(
          'Pill',
          {
            [`Pill--${color}`]: !!color,
            [`Pill--closeable`]: !!onClose,
          },
        )
      }
      {...props}
    >
      { icon && (
      <FontAwesomeIcon className="Pill__icon--lead" icon={icon} />
      )}
      { children }
      { text }
      { onClose && (
      <button
        aria-label={`Remove ${text}`}
        className="Pill__button--close"
        type="button"
        onClick={() => onClose(id)}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
        )}
    </span>
  );
}

export default Pill;
