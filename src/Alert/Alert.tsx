import React, { type ReactNode, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { faTimes } from '../font_awesome/light';

import { Icon } from './components';

import * as styles from './Alert.module.css';

export enum AlertType {
  INFO = 'info',
  FEATURE = 'feature',
  WARNING = 'warning',
  ERROR = 'error',
}

export type AlertProps = {
  action?:
  | {
    url: string;
    content: ReactNode;
  }
  | ReactNode;
  actionTarget?: '_self' | '_blank' | '_parent' | '_top';
  autoDismiss?: boolean;
  id?: string;
  message: string | ReactNode;
  noMargin?: boolean;
  removeBorderLeft?: boolean;
  title?: string | ReactNode;
  type: 'info' | 'feature' | 'warning' | 'error';
  onDismiss?: (id?: string) => void;
};

// eslint-disable-next-line local-rules/max-props
export function Alert({
  action,
  actionTarget,
  autoDismiss = false,
  id = undefined,
  message,
  noMargin = false,
  removeBorderLeft = false,
  title = undefined,
  type,
  onDismiss = undefined,
}: AlertProps) {
  function handleDismiss() {
    if (!onDismiss) return;
    onDismiss(id);
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (autoDismiss && onDismiss) {
      timeout = setTimeout(() => onDismiss(id), 5_000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [autoDismiss, onDismiss, id, type]);

  return (
    <div
      className={classNames(styles.alert, {
        [styles.info]: type === 'info',
        [styles.feature]: type === 'feature',
        [styles.warning]: type === 'warning',
        [styles.error]: type === 'error',
        [styles.removeBorderLeft]: removeBorderLeft,
        [styles.noMargin]: noMargin,
      })}
    >
      <div>
        <div>
          <Icon type={type} />

          <div>
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.message}>{message}</div>
          </div>
        </div>

        {action &&
          (typeof action === 'object' && 'url' in action ? (
            <a
              className={styles.primaryAction}
              href={action.url}
              rel="noopener noreferrer"
              target={actionTarget}
            >
              {action.content}
            </a>
          ) : (
            action
          ))}
      </div>

      {onDismiss && (
        <button
          aria-label={`close ${type} alert`}
          className={styles.close}
          type="button"
          onClick={handleDismiss}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
}
