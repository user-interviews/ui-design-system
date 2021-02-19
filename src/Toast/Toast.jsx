import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';

import FadeTransition from 'src/FadeTransition';
import AlertMessage from '../Alert/AlertMessage';

import './Toast.scss';

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
            <AlertMessage
              autoDismiss={props.autoDismiss}
              id={message.id}
              message={message.message}
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
