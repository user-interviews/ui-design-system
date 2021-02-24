import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullhorn,
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

import './Alert.scss';

export const MessageTypes = {
  SUCCESS: 'success',
  INFO: 'info',
  ANNOUNCEMENT: 'announcement',
  WARNING: 'warning',
  ERROR: 'error',
};

const AUTO_DISMISS_TIMEOUT = 5000;

const getAlertClassName = (type) => {
  if (!Object.values(MessageTypes).includes(type)) {
    throw new TypeError(`Unexpected type ${type} used for an alert.`);
  }

  return `Alert Alert-${type}`;
};

const getAlertIcon = (type) => {
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

function Alert(props) {
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
    <div className={getAlertClassName(props.type)}>
      <div className="Alert__icon">
        <FontAwesomeIcon icon={getAlertIcon(props.type)} />
      </div>
      <div className="Alert__content">
        {
          props.title && (
            <p className="Alert__title">
              {props.title}
            </p>
          )
        }
        {props.message}
      </div>
      {
        props.onDismiss && (
          <div className="Alert__close">
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

Alert.propTypes = {
  autoDismiss: PropTypes.bool,
  id: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
};

Alert.defaultProps = {
  autoDismiss: false,
  title: undefined,
  onDismiss: undefined,
};

export default React.memo(Alert);
