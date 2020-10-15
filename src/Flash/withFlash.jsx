import React from 'react';
import PropTypes from 'prop-types';

import Flash from './Flash';
import useFlash from './useFlash';

export const withFlashPropTypes = {
  setFlashMessage: PropTypes.func,
};

const WithFlash = ({ WrappedComponent, autoDismiss, ...props }) => {
  const { messages, setMessage, dismissMessage } = useFlash();

  return (
    <>
      <Flash
        autoDismiss={autoDismiss}
        messages={messages}
        onFlashClosed={dismissMessage}
      />
      <WrappedComponent
        setFlashMessage={setMessage}
        {...props}
      />
    </>
  );
};

WithFlash.propTypes = {
  autoDismiss: PropTypes.bool,
  WrappedComponent: PropTypes.func.isRequired,
};

WithFlash.defaultProps = {
  autoDismiss: false,
};

export default function withFlash(WrappedComponent, hocProps) {
  const wrappedComponent = (props) => (
    <WithFlash WrappedComponent={WrappedComponent} {...hocProps} {...props} />
  );

  wrappedComponent.displayName = `${WrappedComponent.displayName || WrappedComponent.name}WithFlash`;
  return wrappedComponent;
}
