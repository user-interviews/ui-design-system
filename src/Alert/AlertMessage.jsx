import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './AlertMessage.scss';

export const MessageTypes = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

const AUTO_DISMISS_TIMEOUT = 5000;

const alertMessageClassName = (type) => {
  if (!Object.values(MessageTypes).includes(type)) {
    throw new TypeError(`Unexpected type ${type} used for a alert message.`);
  }

  return `AlertMessage AlertMessage-${type}`;
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
    <div className={alertMessageClassName(props.type)}>
      {
        props.onDismiss && (
          <button
            className="close"
            type="button"
            onClick={() => props.onDismiss(props.id)}
          >
            &times;
          </button>
        )
      }
      {
        props.title && (
          <p className="AlertMessage__title">{props.title}</p>
        )
      }
      {props.message}
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
