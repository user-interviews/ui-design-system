import React, { useContext } from 'react';
import classNames from 'classnames';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes, faCompressAlt, faExpandAlt,
} from '../font_awesome/solid';

import './DrawerHeader.scss';

import { ExpandContext } from './Drawer';

type DrawerHeaderProps = {
  bordered?: boolean;
  title?: string;
  onRequestClose: (...args: unknown[]) => unknown;
};

function DrawerHeader({
  bordered = true,
  title,
  onRequestClose,
}: DrawerHeaderProps) {
  const { expandable, expanded, handleExpand } = useContext(ExpandContext);

  return (
    <div className={classNames('Drawer__header', {
      'Drawer__header--bordered': bordered,
    })}
    >
      {
        expandable && (
          <button
            aria-label="Expand"
            className="Drawer__header-action"
            type="button"
            onClick={handleExpand}
          >
            <FontAwesomeIcon icon={(expanded ? faCompressAlt : faExpandAlt) as IconDefinition} />
          </button>
        )
      }

      <div className="Drawer__title">
        {title}
      </div>

      <button
        aria-label="Close"
        className="Drawer__header-action"
        type="button"
        onClick={onRequestClose}
      >
        <FontAwesomeIcon icon={faTimes as IconDefinition} />
      </button>
    </div>
  );
}

DrawerHeader.defaultProps = {
  bordered: true,
  title: null,
};

export default DrawerHeader;
