import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';

import FadeTransition from 'src/FadeTransition';
import AlertMessage from './AlertMessage';

import './Flash.scss';

export default function Flash(props) {
  const groupClassNames = classNames(
    'container',
    'Flash',
    { 'Flash--no-header': !props.header },
  );

  return (
    <TransitionGroup className={groupClassNames}>
      {
        props.messages.map((message) => (
          <FadeTransition key={message.id}>
            <AlertMessage
              autoDismiss={props.autoDismiss}
              id={message.id}
              message={message.message}
              type={message.type}
              onDismiss={props.onFlashClosed}
            />
          </FadeTransition>
        ))
      }
    </TransitionGroup>
  );
}

Flash.propTypes = {
  autoDismiss: PropTypes.bool,
  header: PropTypes.bool,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      type: PropTypes.string,
    }),
  ).isRequired,
  onFlashClosed: PropTypes.func,
};

Flash.defaultProps = {
  autoDismiss: false,
  header: true,
  onFlashClosed: undefined,
};
