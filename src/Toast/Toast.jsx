import React from 'react';
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
      action: PropTypes.shape({
        content: PropTypes.string,
        url: PropTypes.string,
      }),
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
