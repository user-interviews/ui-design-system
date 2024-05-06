import React, { useEffect } from 'react';
import classNames from 'classnames';

import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
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

export const MessageTypes = {
  SUCCESS: 'success',
  INFO: 'info',
  FEATURE: 'feature',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

type MessageType = typeof MessageTypes[keyof typeof MessageTypes];

const getAlertIcon = (type: MessageType) => {
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

const getAlertClassName = (type: MessageType) => {
  if (!Object.values(MessageTypes).includes(type)) {
    throw new TypeError(`Unexpected type ${type} used for an alert.`);
  }

  return `Alert Alert-${type}`;
};

type AlertProps = {
  /**
   Creates a CTA button on the Alert
  */
  action?: {
    url: string;
    content: React.ReactNode;
  } | React.ReactNode;
  /**
    Specifies where to open the linked document
  */
  actionTarget?: string;
  /**
   Determines whether the Alert will disappear automatically
  */
  autoDismiss?: boolean;
  id: string;
  message: string | React.ReactNode;
  removeBorderLeft?: boolean;
  title?: string;
  /**
   One of the MessageTypes
  */
  type: MessageType;
  onDismiss?: (arg0: string) => void;
};

function Alert(props: AlertProps) {
  const { autoDismiss, id, onDismiss } = props;

  useEffect(() => {
    let timeout;
    if (autoDismiss && onDismiss) {
      timeout = setTimeout(() => (onDismiss(id)),
      props.type === MessageTypes.SUCCESS ?
      AUTO_DISMISS_TIMEOUT_SUCCESS : AUTO_DISMISS_TIMEOUT_DEFAULT);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [autoDismiss, onDismiss, id, props.type]);

  return (
    <div
      className={getAlertClassName(props.type)}
      style={props.removeBorderLeft ? { borderLeft: 'none' } : undefined}
    >
      <div className="Alert__icon">
        {getAlertIcon(props.type)}
      </div>
      <div className="Alert__content">
        {
          props.title && (
            <div className="Alert__title">
              {props.title}
            </div>
          )
        }
        <div
          className="Alert__message"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={props.type === MessageTypes.ERROR ? -1 : undefined}
        >
          {props.message}
        </div>
      </div>
      {
        props.action && (
        <div className="Alert__action">
          { (typeof props.action === 'object' && 'url' in props.action) ? (
            <a
              className={classNames(`Alert-${(props.type)}`, 'primary-action')}
              href={props.action.url}
              rel="noopener noreferrer"
              target={props.actionTarget}
            >
              {props.action.content}
            </a>
          ) : (props.action)}
        </div>
      )
}
      {
        props.onDismiss && (
          <div className="Alert__close">
            <button
              aria-label={`close ${props.type}`}
              className="close"
              type="button"
              onClick={() => props.onDismiss && props.onDismiss(props.id)}
            >
              <FontAwesomeIcon icon={faTimes as IconDefinition} />
            </button>
          </div>
        )
      }
    </div>
  );
}

Alert.defaultProps = {
  action: undefined,
  actionTarget: undefined,
  autoDismiss: false,
  removeBorderLeft: false,
  title: undefined,
  onDismiss: undefined,
};

export default React.memo(Alert);
