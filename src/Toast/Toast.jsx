import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';

import { Alert } from 'src/Alert';
import FadeTransition from 'src/FadeTransition';
import { isObject } from '../utils';

import './Toast.scss';

function buildAlertMessageProps(message) {
  if (isObject(message) && !React.isValidElement(message)) {
    return {
      title: message.title,
      message: message.body,
    };
  }

  return { message };
}

export default function Toast(props) {
  const groupClassNames = classNames(
    'Toast',
    { 'Toast--no-header': !props.header },
  );

  return (
    <TransitionGroup className={groupClassNames}>
      {
        props.messages.map((message) => (
          <FadeTransition key={message.id}>
            <Alert
              action={message.action}
              autoDismiss={props.autoDismiss}
              id={message.id}
              type={message.type}
              onDismiss={props.onToastClosed}
              {...buildAlertMessageProps(message.message)}
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
      message: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.shape({
          body: PropTypes.string,
          title: PropTypes.string,
        }),
      ]),
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
