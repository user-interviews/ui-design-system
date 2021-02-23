import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullhorn,
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

import './AlertMessage.scss';

export const MessageTypes = {
  SUCCESS: 'success',
  INFO: 'info',
  ANNOUNCEMENT: 'announcement',
  WARNING: 'warning',
  ERROR: 'error',
};

const AUTO_DISMISS_TIMEOUT = 5000;

const getAlertMessageClassName = (type) => {
  if (!Object.values(MessageTypes).includes(type)) {
    throw new TypeError(`Unexpected type ${type} used for an alert message.`);
  }

  return `AlertMessage AlertMessage-${type}`;
};

const getAlertMessageIcon = (type) => {
  switch (type) {
    case 'success':
      return faCheckCircle;
    case 'info':
      return faInfoCircle;
    case 'announcement':
      return faBullhorn;
    case 'warning':
      return faExclamationTriangle;
    case 'error':
      return faExclamationTriangle;
    default:
      return null;
  }
};

function AlertMessage(props) {
  const { autoDismiss, id, onDismiss } = props;

  useEffect(() => {
    let timeout;
    if (autoDismiss) {
      timeout = setTimeout(() => (onDismiss(id)), AUTO_DISMISS_TIMEOUT);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [autoDismiss, onDismiss, id]);

  return (
    <div className={getAlertMessageClassName(props.type)}>
      <div className="AlertMessage__icon">
        <FontAwesomeIcon icon={getAlertMessageIcon(props.type)} />
      </div>
      <div className="AlertMessage__content">
        {
          props.title && (
            <p className="AlertMessage__title">
              {props.title}
            </p>
          )
        }
        {props.message}
      </div>
      {
        props.onDismiss && (
          <div className="AlertMessage__close">
            <button
              className="close"
              type="button"
              onClick={() => props.onDismiss(props.id)}
            >
              &times;
            </button>
          </div>
        )
      }
    </div>
  );
}

AlertMessage.propTypes = {
  autoDismiss: PropTypes.bool,
  id: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
};

AlertMessage.defaultProps = {
  autoDismiss: false,
  title: undefined,
  onDismiss: undefined,
};

export default React.memo(AlertMessage);
