import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';

import { Alert } from 'src/Alert';
import FadeTransition from 'src/FadeTransition';

import './Toast.scss';

export default function Toast(props) {
  const groupClassNames = classNames(
    'Toast',
    { 'Toast--no-header': !props.header },
  );

  useEffect(() => {
    // For a11y on Safari browsers:
    // if any Toast errors are present, then use Javascript to set focus
    // to ensure the screen reader reads it first
    const alertElements = document.getElementsByClassName('Alert__message');
    if (alertElements.length) {
      alertElements[0].focus();
    }
  }, []);

  return (
    <TransitionGroup
      aria-live="polite"
      className={groupClassNames}
    >
      {
        props.messages.map((message) => (
          <FadeTransition key={message.id}>
            <Alert
              action={message.action}
              autoDismiss={props.autoDismiss}
              id={message.id}
              message={message.message}
              title={message.title}
              type={message.type}
              onDismiss={props.onToastClosed}
            />
          </FadeTransition>
        ))
      }
    </TransitionGroup>
  );
}

Toast.propTypes = {
  autoDismiss: PropTypes.bool,
  header: PropTypes.bool,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      title: PropTypes.string,
      type: PropTypes.string,
    }),
  ).isRequired,
  onToastClosed: PropTypes.func,
};

Toast.defaultProps = {
  autoDismiss: false,
  header: true,
  onToastClosed: undefined,
};
