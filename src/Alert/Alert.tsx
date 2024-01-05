import React, { useEffect, type ReactNode } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import {
  faBullhorn,
  faCircle,
  faCheck,
  faExclamationTriangle,
  faInfo,
  faTimes,
} from '@fortawesome/pro-solid-svg-icons';

import './Alert.scss';
import classNames from 'classnames';

export const MessageTypes = {
  SUCCESS: 'success',
  INFO: 'info',
  ANNOUNCEMENT: 'announcement',
  FEATURE: 'feature',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

type MessageType = typeof MessageTypes[keyof typeof MessageTypes]

const getAlertIcon = (type: MessageType) => {
  switch (type) {
    case MessageTypes.SUCCESS:
      return (
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle as FontAwesomeIconProps['icon']} transform="grow-8" />
          <FontAwesomeIcon icon={faCheck as FontAwesomeIconProps['icon']} transform="shrink-4" />
        </span>
);
    case MessageTypes.INFO:
      return (
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle as FontAwesomeIconProps['icon']} transform="grow-8" />
          <FontAwesomeIcon icon={faInfo as FontAwesomeIconProps['icon']} transform="shrink-4" />
        </span>
      );
    case MessageTypes.ANNOUNCEMENT:
      return (<FontAwesomeIcon icon={faBullhorn as FontAwesomeIconProps['icon']} transform="grow-2" />);
    case MessageTypes.FEATURE:
      return (<FontAwesomeIcon icon={faBullhorn as FontAwesomeIconProps['icon']} transform="grow-2" />);
    case MessageTypes.WARNING:
      return (<FontAwesomeIcon icon={faExclamationTriangle as FontAwesomeIconProps['icon']} transform="grow-2" />);
    case MessageTypes.ERROR:
      return (<FontAwesomeIcon icon={faExclamationTriangle as FontAwesomeIconProps['icon']} transform="grow-2" />);
    default:
      return null;
  }
};

const AUTO_DISMISS_TIMEOUT = 5000;

const getAlertClassName = (type: MessageType) => {
  if (!Object.values(MessageTypes).includes(type)) {
    throw new TypeError(`Unexpected type ${type} used for an alert.`);
  }

  return `Alert Alert-${type}`;
};

export type AlertProps = {
  /**
   Creates a CTA button on the Alert
  */
  action?: {
    url: string;
    content: ReactNode;
  } | ReactNode;
  /**
    Specifies where to open the linked document
  */
  actionTarget?: string;
  /**
   Determines whether the Alert will disappear automatically
  */
  autoDismiss?: boolean;
  id: string;
  message: ReactNode;
  removeBorderLeft?: boolean;
  title: string;
  /**
   One of the MessageTypes
  */
  type: MessageType;
  onDismiss?: (arg0: string) => void;
}

function Alert({
  action,
  actionTarget,
  autoDismiss = false,
  id,
  message,
  removeBorderLeft = false,
  title,
  type,
  onDismiss,
}: AlertProps) {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (autoDismiss && onDismiss) {
      timeout = setTimeout(() => (onDismiss(id)), AUTO_DISMISS_TIMEOUT);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [autoDismiss, onDismiss, id]);

  function handleDismiss() {
    if (onDismiss) {
      onDismiss(id);
    }
  }

  return (
    <div
      className={getAlertClassName(type)}
      style={removeBorderLeft ? { borderLeft: 'none' } : undefined}
    >
      <div className="Alert__icon">
        {getAlertIcon(type)}
      </div>
      <div className="Alert__content">
        {
          title && (
            <div className="Alert__title">
              {title}
            </div>
          )
        }
        <div
          className="Alert__message"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={type === MessageTypes.ERROR ? -1 : undefined}
        >
          {message}
        </div>
      </div>
      {
        action && (
        <div className="Alert__action">
          {(typeof action === 'object' && 'url' in action) ? (
            <a
              className={classNames(`Alert-${(type)}`, 'primary-action')}
              href={action.url}
              rel="noopener noreferrer"
              target={actionTarget}
            >
              {action.content}
            </a>
          ) : (action)}
        </div>
      )
}
      {
        onDismiss && (
          <div className="Alert__close">
            <button
              aria-label={`close ${type}`}
              className="close"
              type="button"
              onClick={handleDismiss}
            >
              <FontAwesomeIcon icon={faTimes as FontAwesomeIconProps['icon']} />
            </button>
          </div>
        )
      }
    </div>
  );
}

Alert.propTypes = {
  /**
   Creates a CTA button on the Alert
  */
  action: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
  /**
    Specifies where to open the linked document
  */
  actionTarget: PropTypes.string,
  /**
   Determines whether the Alert will disappear automatically
  */
  autoDismiss: PropTypes.bool,
  id: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  removeBorderLeft: PropTypes.bool,
  title: PropTypes.string,
  /**
   One of the MessageTypes
  */
  type: PropTypes.oneOf(Object.values(MessageTypes)).isRequired,
  onDismiss: PropTypes.func,
};

Alert.defaultProps = {
  action: undefined,
  actionTarget: undefined,
  autoDismiss: false,
  removeBorderLeft: false,
  title: undefined,
  onDismiss: undefined,
};

export default React.memo(Alert);
