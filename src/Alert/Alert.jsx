import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

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

export const MessageTypes = {
  SUCCESS: 'success',
  INFO: 'info',
  ANNOUNCEMENT: 'announcement',
  WARNING: 'warning',
  ERROR: 'error',
};

const getAlertIcon = (type) => {
  switch (type) {
    case MessageTypes.SUCCESS:
      return (
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle} transform="grow-8" />
          <FontAwesomeIcon icon={faCheck} transform="shrink-4" />
        </span>
);
    case MessageTypes.INFO:
      return (
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={faCircle} transform="grow-8" />
          <FontAwesomeIcon icon={faInfo} transform="shrink-4" />
        </span>
      );
    case MessageTypes.ANNOUNCEMENT:
      return (<FontAwesomeIcon icon={faBullhorn} transform="grow-2" />);
    case MessageTypes.WARNING:
      return (<FontAwesomeIcon icon={faExclamationTriangle} transform="grow-2" />);
    case MessageTypes.ERROR:
      return (<FontAwesomeIcon icon={faExclamationTriangle} transform="grow-2" />);
    default:
      return null;
  }
};

const AUTO_DISMISS_TIMEOUT = 5000;

const getAlertClassName = (type) => {
  if (!Object.values(MessageTypes).includes(type)) {
    throw new TypeError(`Unexpected type ${type} used for an alert.`);
  }

  return `Alert Alert-${type}`;
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
        {getAlertIcon(props.type)}
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
        props.action && (
        <div className="Alert__action">
          { React.isValidElement(props.action) ?
            props.action : (
              <a
                className={classNames(`Alert-${(props.type)}`, 'primary-action')}
                href={props.action.url}
                rel="noopener noreferrer"
              >
                {props.action.content}
              </a>
          )}
        </div>
      )
}
      {
        props.onDismiss && (
          <div className="Alert__close">
            <button
              aria-label="close"
              className="close"
              type="button"
              onClick={() => props.onDismiss(props.id)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )
      }
    </div>
  );
}

Alert.propTypes = {
  action: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
  autoDismiss: PropTypes.bool,
  id: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
};

Alert.defaultProps = {
  action: undefined,
  autoDismiss: false,
  title: undefined,
  onDismiss: undefined,
};

export default React.memo(Alert);
