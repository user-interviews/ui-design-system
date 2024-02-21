import React, { useEffect, type ReactNode, type ReactElement } from 'react';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export enum MessageTypes {
  SUCCESS = 'success',
  INFO = 'info',
  ANNOUNCEMENT = 'announcement',
  FEATURE = 'feature',
  WARNING = 'warning',
  ERROR = 'error',
}

const getAlertIcon = (type: MessageTypes) => {
  switch (type) {
    case MessageTypes.SUCCESS:
      return (
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle as IconDefinition} transform="grow-8" />
          <FontAwesomeIcon icon={faCheck as IconDefinition} transform="shrink-4" />
        </span>
);
    case MessageTypes.INFO:
      return (
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle as IconDefinition} transform="grow-8" />
          <FontAwesomeIcon icon={faInfo as IconDefinition} transform="shrink-4" />
        </span>
      );
    case MessageTypes.ANNOUNCEMENT:
      return (<FontAwesomeIcon icon={faBullhorn as IconDefinition} transform="grow-2" />);
    case MessageTypes.FEATURE:
      return (<FontAwesomeIcon icon={faBullhorn as IconDefinition} transform="grow-2" />);
    case MessageTypes.WARNING:
      return (<FontAwesomeIcon icon={faExclamationTriangle as IconDefinition} transform="grow-2" />);
    case MessageTypes.ERROR:
      return (<FontAwesomeIcon icon={faExclamationTriangle as IconDefinition} transform="grow-2" />);
    default:
      return null;
  }
};

const AUTO_DISMISS_TIMEOUT_SUCCESS = 3000;
const AUTO_DISMISS_TIMEOUT_DEFAULT = 5000;

const getAlertClassName = (type: MessageTypes) => {
  if (!Object.values(MessageTypes).includes(type)) {
    throw new TypeError(`Unexpected type ${type} used for an alert.`);
  }

  return `Alert Alert-${type}`;
};

type AlertProps = {
/**
   Creates a CTA button on the Alert
  */
  action?: ReactElement | {
    url: string;
    content: ReactNode;
  };
  /**
    Specifies where to open the linked document
  */
  actionTarget?: string;
  /**
   Determines whether the Alert will disappear automatically
  */
  autoDismiss?: boolean;
  id: string;
  message: string | ReactNode;
  removeBorderLeft?: boolean;
  title?: string;
  /**
   One of the MessageTypes
  */
  type: MessageTypes;
  onDismiss?: (arg0: string) => void;
}

function Alert({
  action,
  actionTarget,
  autoDismiss,
  id,
  message,
  onDismiss,
  removeBorderLeft,
  title,
  type,
}: AlertProps) {
  useEffect(() => {
    let timeout;
    if (autoDismiss && onDismiss) {
      timeout = setTimeout(() => (onDismiss(id)),
      type === MessageTypes.SUCCESS ?
      AUTO_DISMISS_TIMEOUT_SUCCESS : AUTO_DISMISS_TIMEOUT_DEFAULT);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [autoDismiss, onDismiss, id, type]);

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
          { /* eslint-disable-next-line @typescript-eslint/no-explicit-any */ }
          { React.isValidElement<any>(action) ?
            action : (
              <a
                className={classNames(`Alert-${(type)}`, 'primary-action')}
                href={action.url}
                rel="noopener noreferrer"
                target={actionTarget}
              >
                {action.content}
              </a>
          )}
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
              onClick={() => onDismiss(id)}
            >
              <FontAwesomeIcon icon={faTimes as IconDefinition} />
            </button>
          </div>
        )
      }
    </div>
  );
}

// Alert.propTypes = {
//   /**
//    Creates a CTA button on the Alert
//   */
//   action: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
//   /**
//     Specifies where to open the linked document
//   */
//   actionTarget: PropTypes.string,
//   /**
//    Determines whether the Alert will disappear automatically
//   */
//   autoDismiss: PropTypes.bool,
//   id: PropTypes.string.isRequired,
//   message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
//   removeBorderLeft: PropTypes.bool,
//   title: PropTypes.string,
//   /**
//    One of the MessageTypes
//   */
//   type: PropTypes.oneOf(Object.values(MessageTypes)).isRequired,
//   onDismiss: PropTypes.func,
// };

// Alert.defaultProps = {
//   action: undefined,
//   actionTarget: undefined,
//   autoDismiss: false,
//   removeBorderLeft: false,
//   title: undefined,
//   onDismiss: undefined,
// };

export default React.memo(Alert);
