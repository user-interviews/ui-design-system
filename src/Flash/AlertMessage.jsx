import React from 'react';
import PropTypes from 'prop-types';

import './AlertMessage.scss';

export const MessageTypes = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

const alertMessageClassName = (type) => {
  if (!Object.values(MessageTypes).includes(type)) {
    throw new TypeError(`Unexpected type ${type} used for a alert message.`);
  }

  return `alert alert-${type} AlertMessage AlertMessage-${type}`;
};

export default function AlertMessage(props) {
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
          <h2>{props.title}</h2>
        )
      }
      {props.message}
    </div>
  );
}

AlertMessage.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
};

AlertMessage.defaultProps = {
  title: undefined,
  onDismiss: undefined,
};
