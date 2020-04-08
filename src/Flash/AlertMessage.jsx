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

  return `alert alert-${type}`;
};

export default function AlertMessage(props) {
  const handleDismissMessage = () => props.onDismiss(props.id);

  return (
    <div className={alertMessageClassName(props.type)}>
      {
        props.showDismiss && (
          <button
            className="close"
            type="button"
            onClick={handleDismissMessage}
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
  showDismiss: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
};

AlertMessage.defaultProps = {
  showDismiss: true,
  title: undefined,
  onDismiss: undefined,
};
