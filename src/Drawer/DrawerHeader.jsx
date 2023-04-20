import React, { useContext } from 'react';
import * as propTypes from 'prop-types';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes, faCompressAlt, faExpandAlt,
} from '@fortawesome/pro-solid-svg-icons';

import './DrawerHeader.scss';

import { ExpandContext } from './Drawer';

const DrawerHeader = ({
  bordered,
  title,
  onRequestClose,
}) => {
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
            <FontAwesomeIcon icon={expanded ? faCompressAlt : faExpandAlt} />
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
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

DrawerHeader.propTypes = {
  bordered: propTypes.bool,
  title: propTypes.string,
  onRequestClose: propTypes.func.isRequired,
};

DrawerHeader.defaultProps = {
  bordered: true,
  title: null,
};

export default DrawerHeader;
