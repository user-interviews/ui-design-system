import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import {
  faCircle,
  faInfo,
  faBullhorn,
  faExclamationTriangle,
} from '../../font_awesome/solid';

import * as styles from './icon.module.css';

type IconProps = {
  type: 'info' | 'feature' | 'warning' | 'error';
};

export function Icon({ type }: IconProps) {
  switch (type) {
    case 'info':
      return (
        <span className={classNames(styles.layers, styles.info)}>
          <FontAwesomeIcon
            className={styles.circleIcon}
            icon={faCircle}
            transform="grow-8"
          />
          <FontAwesomeIcon
            className={styles.infoIcon}
            icon={faInfo}
            transform="shrink-4"
          />
        </span>
      );
    case 'feature':
      return (
        <FontAwesomeIcon
          className={classNames(styles.featureIcon)}
          icon={faBullhorn}
          transform="grow-2"
        />
      );
    case 'warning':
      return (
        <FontAwesomeIcon
          className={styles.warningIcon}
          icon={faExclamationTriangle}
          transform="grow-2"
        />
      );
    case 'error':
      return (
        <FontAwesomeIcon
          className={styles.errorIcon}
          icon={faExclamationTriangle}
          transform="grow-2"
        />
      );
    default:
      return null;
  }
}
