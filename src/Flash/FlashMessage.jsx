import React from 'react';
import PropTypes from 'prop-types';

export const MessageTypes = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

const flashMessageClassName = (type) => {
  if (!Object.values(MessageTypes).includes(type)) {
    throw new TypeError(`Unexpected type ${type} used for a flash message.`);
  }

  return `alert alert-${type}`;
};

export default function FlashMessage(props) {
  const handleDismissMessage = () => props.onDismiss(props.id);

  return (
    <div className={flashMessageClassName(props.type)}>
      <button
        className="close"
        type="button"
        onClick={handleDismissMessage}
      >
        &times;
      </button>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: props.message }} />
    </div>
  );
}

FlashMessage.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  type: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
