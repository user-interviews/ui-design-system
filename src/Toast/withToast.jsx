import React from 'react';
import PropTypes from 'prop-types';

import Toast from './Toast';
import useToast from './useToast';

export const withToastPropTypes = {
  setToastMessage: PropTypes.func,
};

const WithToast = ({ WrappedComponent, autoDismiss, ...props }) => {
  const { messages, setMessage, dismissMessage } = useToast();

  return (
    <>
      <Toast
        autoDismiss={autoDismiss}
        messages={messages}
        onToastClosed={dismissMessage}
      />
      <WrappedComponent
        setToastMessage={setMessage}
        {...props}
      />
    </>
  );
};

WithToast.propTypes = {
  autoDismiss: PropTypes.bool,
  WrappedComponent: PropTypes.func.isRequired,
};

WithToast.defaultProps = {
  autoDismiss: true,
};

export default function withToast(WrappedComponent, hocProps) {
  const wrappedComponent = (props) => (
    <WithToast WrappedComponent={WrappedComponent} {...hocProps} {...props} />
  );

  wrappedComponent.displayName = `${WrappedComponent.displayName || WrappedComponent.name}WithToast`;
  return wrappedComponent;
}
