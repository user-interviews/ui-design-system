import React from 'react';
import PropTypes from 'prop-types';

import Flash from './Flash';
import useFlash from './useFlash';

export const withFlashPropTypes = {
  setFlashMessage: PropTypes.func,
};

const WithFlash = ({ WrappedComponent, ...props }) => {
  const { messages, setMessage, dismissMessage } = useFlash();

  return (
    <>
      <Flash
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
  WrappedComponent: PropTypes.func.isRequired,
};

export default function withFlash(WrappedComponent) {
  return (props) => <WithFlash WrappedComponent={WrappedComponent} {...props} />;
}
